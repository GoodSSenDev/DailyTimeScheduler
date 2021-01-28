using System;
using System.Collections.Generic;
using System.Linq;
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

        [Authorize]
        [HttpPost("LoadSchedules")]
        public async Task<ActionResult<SchedulesDto>> LoadSchedulesAsync()
        {
            foreach (var claim in HttpContext.User.Claims)
            {
                if (claim.Type == "no")
                {

                    if(! Int32.TryParse(claim.Value, out int noValue))
                        return NotFound("User no can not be transfered to int32");

                    return Ok(await this._scheduleDataBll.GetScheduleDataAsync(noValue));
                    break;
                }                  
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet("CreateSchedule")]
        public async Task<IActionResult> CreateScheduleAsync(ScheduleDto scheduleDto)
        {
            if (await this._scheduleDataBll.CreateNewScheduleAsyncParallel(scheduleDto))
                return Ok();
            else
                return Conflict();
        }

    }
}
