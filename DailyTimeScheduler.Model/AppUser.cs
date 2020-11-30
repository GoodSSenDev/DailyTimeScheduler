using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DailyTimeScheduler.Model
{
    public class AppUser
    {
        /// <summary>
        /// PK value of the App User 
        /// </summary>
        [Key]
        public int No { get; set; }

        /// <summary>
        /// Unique
        /// String value that represent the user ID
        /// 15 max 
        /// </summary>
        [Required]
        public string Id {get;set;}
        
        /// <summary>
        /// Unique
        /// String value that represent the NickName of the User 
        /// </summary>
        [Required]
        public string NickName { get; set; }

        /// <summary>
        /// hashed Password
        /// minimum 4 letters 
        /// </summary>
        [Required]
        public string Password { get; set; }

        /// <summary>
        /// Level of Access 
        /// </summary>'
        [Required]
        public int AccessLevel { get; set; }
    }
}
