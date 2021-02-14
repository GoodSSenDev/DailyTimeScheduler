using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DailyTimeScheduler.BLL;
using DailyTimeScheduler.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DailyTimeSchedulerApp.Controllers
{
    /// <summary>
    /// This is class that controls the geting and the posting data
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TimeDataController : Controller
    {
        private readonly ScheduleDataBll _scheduleDataBll;


        public TimeDataController(ScheduleDataBll scheduleDataBll)
        {
            this._scheduleDataBll = scheduleDataBll;
        }

        [HttpGet("LoadSchedules")]
        public async Task<ActionResult<SchedulesDto>> LoadSchedulesAsync()
        {
            var userNo = HttpContext.User.FindFirstValue("no");
            if (userNo == null)
                return Unauthorized();

            if (!Int32.TryParse(userNo, out int noValue))
                    return NotFound("User no can not be transfered to int32");

            var result = await this._scheduleDataBll.GetScheduleDataAsync(noValue);

            if (result == null)
                return NotFound();
            return Ok(result);                                  
             
        }

        [HttpPost("CreateSchedule")]
        public async Task<IActionResult> CreateScheduleAsync([FromBody] ScheduleDto scheduleDto)
        {
            var userNo = HttpContext.User.FindFirstValue("no");
            if (userNo == null)
                return Unauthorized();

            if (!Int32.TryParse(userNo, out int noValue))
                return NotFound("User no can not be transfered to int32");

            scheduleDto.Schedule.UserNo = noValue;
            if (await this._scheduleDataBll.CreateNewScheduleAsyncParallel(scheduleDto))
                return Ok();
            

            return Conflict();
        }


        [HttpPost("CreateSchedule")]
        public async Task<IActionResult> DeleteScheduleAsync([FromBody] ScheduleDto scheduleDto)
        {
            var userNo = HttpContext.User.FindFirstValue("no");
            if (userNo == null)
                return Unauthorized();
            if (await this._scheduleDataBll.DeleteScheduleAsync(scheduleDto))
                return Ok();


            return Conflict();
        }


    }
}
