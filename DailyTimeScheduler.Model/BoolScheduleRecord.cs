using System;
using System.Collections.Generic;
using System.Text;

namespace DailyTimeScheduler.Model
{
    public class BoolScheduleRecord : IScheduleRecord
    {
        /// <summary>
        /// PK Unique number of Record.
        /// </summary>
        public int No { get; set; }

        /// <summary>
        /// Set time for Schedule
        /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        public long SetTimeUTC { get; set; }

        /// <summary>
        /// Foreign nubmer which indicate the number of schedule (Unique).
        /// </summary>
        public int ScheduleNo { get; set; }

        /// <summary>
        /// bool value of task done or not.
        /// </summary>
        public bool IsTaskDone { get; set; }
    }
}
