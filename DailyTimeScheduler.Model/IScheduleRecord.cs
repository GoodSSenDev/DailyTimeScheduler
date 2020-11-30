using System;
using System.Collections.Generic;
using System.Text;

namespace DailyTimeScheduler.Model
{
    public interface IScheduleRecord
    {   
        /// <summary>
        /// PK Unique number of Record.
        /// </summary>
        int No { get; set; }

        /// <summary>
        /// Set time for Schedule
        /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        long SetTimeUTC { get; set; }
        
        /// <summary>
        /// Foreign nubmer which indicate the number of schedule (Unique).
        /// </summary>
        int ScheduleNo { get; set; }

        /// <summary>
        /// Foreign key from user Number to specifies the owner of the schedule
        /// </summary>
        int UserNo { get; set; }
    }
}
