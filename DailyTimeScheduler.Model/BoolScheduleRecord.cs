using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DailyTimeScheduler.Model
{
    public class BoolScheduleRecord : IScheduleRecord
    {
        /// <summary>
        /// PK Unique number of Record.
        /// </summary>
        [Key]
        public int No { get; set; }

        /// <summary>
        /// Set time for Schedule
        /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
        /// </summary>
        [Required]
        public long SetTimeUTC { get; set; }

        /// <summary>
        /// bool value of task done or not.
        /// </summary>
        [Required]
        public bool IsTaskDone { get; set; }

        /// <summary>
        /// Foreign nubmer which indicate the number of schedule (Unique).
        /// </summary>
        [Required]
        public int ScheduleNo { get; set; }

        [ForeignKey("ScheduleNo")]
        public virtual Schedule Schedule { get; set; }

        /// <summary>
        /// Foreign nubmer which indicate the Timeblock
        /// </summary>
        [Required]
        public int TimeBlockNo { get; set; }

        [ForeignKey("TimeBlockNo")]
        public virtual TimeBlock TimeBlock { get; set; }

        /// <summary>
        /// Foreign key of user 
        /// </summary>
        [Required]
        public int UserNo { get; set; }

        [ForeignKey("UserNo")]
        public virtual AppUser AppUser { get; set; }

    }
}
