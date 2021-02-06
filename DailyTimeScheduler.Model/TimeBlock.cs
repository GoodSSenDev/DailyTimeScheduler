using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DailyTimeScheduler.Model
{
    public class TimeBlock
    {
        /// <summary>
        /// PK Unique TimeBlock Number in DB 
        /// </summary>
        [Key]
        public int No { get; set; }

        /// <summary>
        /// Intial schedule time.
        /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        [Required]
        public long IntialUTCTime { get; set; }

        /// <summary>
        /// End DateTime of repeating if 0 time block not repeating.
        /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        [Required]
        public long EndUTCTime { get; set; }

        /// <summary>
        /// Size of this time block; Range of this time block 
        /// DateTime.Ticks value For 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        [Required]
        public long BlockSize { get; set; }

        /// <summary>
        /// Repeat period Of this Time block, 0 if this schedule is not repeating 
        /// DateTime.Ticks value For 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        [Required]
        public long RepeatPeriod { get; set; }

        /// <summary>
        /// Is timeblock is on allday colum
        /// </summary>
        [Required]
        public bool IsAllDay { get; set; }

        /// <summary>
        /// Schedule Number foregin 
        /// </summary>
        [Required]
        public int ScheduleNo { get; set; }

        [ForeignKey("ScheduleNo")]
        public virtual Schedule Schedule { get; set; }

    }
}
