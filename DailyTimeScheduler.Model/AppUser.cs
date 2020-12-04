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
        /// 20 max 
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string Id {get;set;}
        
        /// <summary>
        /// Unique
        /// String value that represent the NickName of the User 
        /// 30 max
        /// </summary>
        [Required]
        [MaxLength(30)]
        public string NickName { get; set; }

        /// <summary>
        /// hashed Password
        /// minimum 4 Letters 
        /// Max 50 Letter
        /// </summary>
        [Required]
        [MinLength(4)]
        [MaxLength(50)]
        public string Password { get; set; }

        /// <summary>
        /// Level of Access 
        /// </summary>'
        [Required]
        public int AccessLevel { get; set; }
    }
}
