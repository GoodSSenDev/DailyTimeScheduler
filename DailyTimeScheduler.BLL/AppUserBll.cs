using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DailyTimeScheduler.BLL
{
    /// <summary>
    /// This class is Businees Logic Layer about AppUser.
    /// </summary>
    public class AppUserBll
    {
        private readonly IAppUserDal _userDal;

        public AppUserBll(IAppUserDal userDal)
        {
            this._userDal = userDal;
        }

        /// <summary>
        /// Varify system of this function 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <returns>if success return AppUser that matches, otherwise return null</returns>
        public async Task<AppUser> VerifyUserAsync(string id, string password)
        {
            var matchedUser = await _userDal.GetAppUserByIdAsync(id);
            if (matchedUser == null)
                return null;

            if(BCrypt.Net.BCrypt.Verify(password,matchedUser.Password))
                return matchedUser;
            else
                return null;
        }

        /// <summary>
        /// Register User if Id and NickName are Unique 
        /// </summary>
        /// <param name="appUser"></param>
        /// <returns></returns>
        public async Task<AppUser> RegisterAsync(AppUser appUser)
        {
            var idMatchingUserT = _userDal.GetAppUserByIdAsync(appUser.Id);          
            var nickNameMatchingUserT = _userDal.GetAppUserByIdAsync(appUser.NickName);

            await Task.WhenAll(idMatchingUserT, nickNameMatchingUserT);

            if (idMatchingUserT.Result != null || nickNameMatchingUserT.Result != null)
                return null;

            appUser.Password = BCrypt.Net.BCrypt.HashPassword(appUser.Password, 17);

            if ((await _userDal.CreateNewAppUserAsync(appUser)))
                return appUser;
            else
                return null;
        }
        
        /// <summary>
        /// check ID Duplication 
        /// </summary>
        /// <param name="ID"></param>
        /// <returns>true if ID exist false if not </returns>
        public async Task<bool> CheckIDDuplicationAsync(string ID)
        {
            if (await _userDal.GetAppUserByIdAsync(ID) == null)
                return false;
            else
                return true;
        }


        /// <summary>
        /// This method is for generating Identity for JWT token 
        /// </summary>
        /// <param name="appUser"></param>
        /// <returns></returns>
        public ClaimsIdentity GenerateClaimsIdentity(AppUser appUser)
        {
            return new ClaimsIdentity(new[] { 
                new Claim("no", appUser.No.ToString()),
                new Claim("id", appUser.Id),
                new Claim("nickName", appUser.NickName),
                new Claim("password", appUser.Password),
                new Claim("accessLevel", appUser.AccessLevel.ToString()) 
            });
        }


    }
}
