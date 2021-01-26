using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DailyTimeScheduler.Model
{
    public class Schedule
    {
        /// <summary>
        /// PK Unique Number of this Schedule
        /// </summary>
        [Key]
        public int No { get; set; }

        /// <summary>
        /// Title of Scheduel
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        
        /// <summary>
        /// Description of this Schedule
        /// </summary>
        [Required]
        [MaxLength(200)]
        public string Description { get; set; }

        /// <summary>
        /// bool value of active of this Schedule or completed purpose 
        /// </summary>
        [Required]
        public bool IsScheduleEnd { get; set; }

        /// <summary>
        /// Foreign key from user Number to specifies the owner of the Schedule
        /// </summary>
        [Required]
        public int UserNo { get; set; }

        [ForeignKey("UserNo")]
        public virtual AppUser AppUser { get; set; }
        /// <summary>
        /// Schedule Task Type Currently their is only a Bool type 
        /// </summary>
        [Required]
        public ScheduleType TaskType { get; set; }
    }

    /// <summary>
    /// Enum class of the Schedule Type
    /// </summary>
    public enum ScheduleType
    {
           BOOL,
    }
}
