using System;
using System.Collections.Generic;
using System.Text;

namespace DailyTimeScheduler.Model
{
    public class Schedule
    {
        /// <summary>
        /// PK Unique Number of this Schedule
        /// </summary>
        public int No { get; set; }

        /// <summary>
        /// Title of Scheduel
        /// </summary>
        public string Title { get; set; }
        
        /// <summary>
        /// Description of this Schedule
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// bool value of active of this Schedule or completed purpose 
        /// </summary>
        public bool IsScheduleEnd { get; set; }

        /// <summary>
        /// Schedule Task Type Currently their is only a Bool type 
        /// </summary>
        public ScheduleType Type { get; set; }
    }

    /// <summary>
    /// Enum class of the Schedule Type
    /// </summary>
    public enum ScheduleType
    {
           BOOl,
    }
}
