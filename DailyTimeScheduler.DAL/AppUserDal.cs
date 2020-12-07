using DailyTimeScheduler.DAL.DataContext;
using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyTimeScheduler.DAL
{
    public class AppUserDal : IAppUserDal
    {
        /// <summary>
        /// Get all the Users in the database 
        /// </summary>
        /// <returns>List of AppUser in Database</returns>
        public List<AppUser> GetAppUsers()
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userList = db.Users.ToList<AppUser>();
                return userList;
            }
        }

        /// <summary>
        /// Get all the Users in the database Async
        /// </summary>
        /// <returns>List of AppUser in Database</returns>
        public async Task<List<AppUser>> GetAppUsersAsync()
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userList = await db.Users.ToListAsync<AppUser>();
                return userList;
            }
        }

        /// <summary>
        /// Get the user by UserNo
        /// </summary>
        /// <param name="no"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public AppUser GetAppUserByNo(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var user = db.Users.Where(appUser => appUser.No == userNo).FirstOrDefault<AppUser>();
                return user;
            }
        }

        /// <summary>
        /// Get the user by UserNo Async 
        /// </summary>
        /// <param name="no"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public async Task<AppUser> GetAppUserByNoAsync(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var user = await db.Users.Where(appUser => appUser.No == userNo).FirstOrDefaultAsync<AppUser>();
                return user;
            }
        }

        /// <summary>
        /// Get the User By UserID
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns>If User No does not exist return null else return matching user</returns>
        public AppUser GetAppUserById(string userId)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var user = db.Users.Where(appUser => appUser.Id == userId).FirstOrDefault<AppUser>();
                return user;
            }
        }

        /// <summary>
        /// Get the User By UserId Async
        /// </summary>
        /// <param name="UserId"></param>
        /// <return>If User No does not exist return Task null else return matching user</returns>
        public async Task<AppUser> GetAppUserByIdAsync(string userId)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var user = await db.Users.Where(appUser => appUser.Id == userId).FirstOrDefaultAsync<AppUser>();
                return user;
            }
        }

        /// <summary>
        /// Get the User By the NickName
        /// </summary>
        /// <param name="NickName"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public AppUser GetAppUserByNickName(string userNickName)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var user = db.Users.Where(appUser => appUser.NickName == userNickName).FirstOrDefault<AppUser>();
                return user;
            }
        }

        /// <summary>
        /// Get the User By the NickName Async
        /// </summary>
        /// <param name="NickName"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public async Task<AppUser> GetAppUserByNickNameAsync(string userNickName)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var user = await db.Users.Where(appUser => appUser.NickName == userNickName).FirstOrDefaultAsync<AppUser>();
                return user;
            }
        }
    }
}
