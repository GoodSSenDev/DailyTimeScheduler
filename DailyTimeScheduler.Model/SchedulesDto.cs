using System;
using System.Collections.Generic;
using System.Text;

namespace DailyTimeScheduler.Model
{
    /// <summary>
    /// This class is Data Transfer Object for a sending and a responding the object to fontend.
    /// </summary>
    public class SchedulesDto
    {
        public List<Schedule> Schedules { get; set; }

        public List<TimeBlock> Timeblocks { get; set; }
    }
}
