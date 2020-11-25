using System;

namespace DailyTimeScheduler.Model
{
    public class TimeBlock
    {
        /// <summary>
        /// PK Unique TimeBlock Number in DB 
        /// </summary>
        public int No { get; set; }

        /// <summary>
        /// Intial schedule time.
        /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        public long IntialUTCTime { get; set; }

        /// <summary>
        /// Size of this time block; Range of this time block 
        /// DateTime.Ticks value For 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        public long BlockSize { get; set; }

        /// <summary>
        /// Repeat period Of this Time block, 0 if this schedule is not repeating 
        /// DateTime.Ticks value For 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        public long RepeatPeriod { get; set; }
        
        /// <summary>
        /// Schedule Number foregin 
        /// </summary>
        public int ScheduleNo { get; set; }
    }
}
