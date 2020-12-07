using DailyTimeScheduler.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DailyTimeScheduler.IDAL
{
    public interface IAppUserDal
    {
        /// <summary>
        /// Get all the Users in the database 
        /// </summary>
        /// <returns>List of AppUser in Database</returns>
        public List<AppUser> GetAppUsers();

        /// <summary>
        /// Get all the Users in the database Async
        /// </summary>
        /// <returns>List of AppUser in Database</returns>
        public Task<List<AppUser>> GetAppUsersAsync();

        /// <summary>
        /// Get the user by UserNo
        /// </summary>
        /// <param name="no"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public AppUser GetAppUserByNo(int userNo);

        /// <summary>
        /// Get the user by UserNo Async 
        /// </summary>
        /// <param name="no"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public Task<AppUser> GetAppUserByNoAsync(int userNo);

        /// <summary>
        /// Get the User By UserID
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns>If User No does not exist return null else return matching user</returns>
        public AppUser GetAppUserById(string userId);

        /// <summary>
        /// Get the User By UserId Async
        /// </summary>
        /// <param name="UserId"></param>
        /// <return>If User No does not exist return Task null else return matching user</returns>
        public Task<AppUser> GetAppUserByIdAsync(string userId);

        /// <summary>
        /// Get the User By the NickName
        /// </summary>
        /// <param name="NickName"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public AppUser GetAppUserByNickName(string userNickName);

        /// <summary>
        /// Get the User By the NickName Async
        /// </summary>
        /// <param name="NickName"></param>
        /// <returns>If User No does not exist return null else return matching user </returns>
        public Task<AppUser> GetAppUserByNickNameAsync(string userNickName);
    }
}
