﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DailyTimeScheduler.BLL;
using DailyTimeScheduler.Model;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace DailyTimeSchedulerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly AppUserBll _userBll;
        private readonly IAntiforgery _antiforgery;

        public AuthController(AppUserBll userBll, IAntiforgery antiforgery)
        {
            _userBll = userBll;
            _antiforgery = antiforgery;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> LogicAsync([FromBody]AppUser userDto)
        {
            var resultUser = await _userBll.VerifyUserAsync(userDto.Id,userDto.Password);
            if (resultUser == null)
                return Unauthorized();

            var userClaims = _userBll.GenerateClaimsIdentity(resultUser);

            var jwtToken = this.GenerateJwtToken(userClaims);

            HttpContext.User = new ClaimsPrincipal(userClaims);
            this.RefreshCSRFToken();

            HttpContext.Response.Cookies.Append("jwt", jwtToken, new CookieOptions() { HttpOnly =  false });
            
            return Ok(resultUser.NickName);
        }

        [HttpGet("logout")]
        public IActionResult LogoutAsync()
        {
            HttpContext.User = new ClaimsPrincipal();
            this.RefreshCSRFToken();


            HttpContext.Response.Cookies.Delete("jwt");

            return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] AppUser userDto)
        {
            var returnUser = await _userBll.RegisterAsync(userDto);

            if (returnUser == null)
                return Conflict();

            return Ok();
        }

        [HttpGet("checkIDDuplication={id}")]
        public async Task<IActionResult> CheckIDAsync([FromRoute]string id)
        {
            Console.WriteLine(id);
           
            if (await _userBll.CheckIDDuplicationAsync(id))
                return Conflict();
      
            return Ok(); 
        }

        [HttpGet("checkNickNameDuplication={nickname}")]
        public async Task<IActionResult> CheckNickNameAsync([FromRoute] string nickname)
        {
            Console.WriteLine(nickname);

            if (await _userBll.CheckNickNameDuplicationAsync(nickname))
                return Conflict();

            return Ok();
        }


        [HttpGet("checkSignedIn")]
        public async Task<IActionResult> CheckSignInAsync()
        {
            if (HttpContext.User != null)
                foreach (var claim in HttpContext.User.Claims)
                    if (claim.Type == "nickName")
                        return Ok(claim.Value);

            return NotFound();
        }


        private string GenerateJwtToken(ClaimsIdentity userClaims)
        {
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(Startup.StaticConfig.GetSection("SecurityKey1").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = userClaims,
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private void RefreshCSRFToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                new CookieOptions() { HttpOnly = false });  
        }
    }
}
