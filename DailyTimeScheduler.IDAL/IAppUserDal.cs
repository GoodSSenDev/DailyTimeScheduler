using DailyTimeScheduler.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DailyTimeScheduler.IDAL
{
    public interface IAppUserDal
    {
        #region Create
        /// <summary>
        /// Create NewAppUser return true if success else false  
        /// </summary>
        /// <param name="newAppUser"></param>
        public bool CreateNewAppUser(AppUser newUser);

        /// <summary>
        /// Create NewAppUser return true if success else false
        /// Async
        /// </summary>
        /// <param name="newAppUser"></param>
        public Task<bool> CreateNewAppUserAsync(AppUser newUser);
        #endregion

        #region Read
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
        #endregion

        #region Update

        /// <summary>
        /// Update exisiting app user's nickname using userNo to locate 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public bool UpdateAppUserNickNameByNo(int userNo, string newUserNickName);

        /// <summary>
        /// Update exisiting app user's nickname using userNo to locate async 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public Task<bool> UpdateAppUserNickNameByNoAsync(int userNo, string newUserNickName);

        /// <summary>
        /// Update exisiting app user's nickname using user Id to locate 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public bool UpdateAppUserNickNameById(string userId, string newUserNickName);

        /// <summary>
        /// Update exisiting app user's nickname using user Id to locate async 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public Task<bool> UpdateAppUserNickNameByIdAsync(string userId, string newUserNickName);

        /// <summary>
        /// Update exisiting app user's password using userNo to locate 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public bool UpdateAppUsePasswordByNo(int userNo, string newUserNickName);

        /// <summary>
        /// Update exisiting app user's password using userNo to locate async 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public Task<bool> UpdateAppUserPasswordByNoAsync(int userNo, string newUserNickName);


        /// <summary>
        /// Update exisiting app user's password using user Id to locate 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserPassword"></param>
        /// <returns>True if Success else false </returns>
        public bool UpdateAppUserPasswordById(string userId, string newUserPassword);

        /// <summary>
        /// Update exisiting app user's password using user Id to locate async 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserPassword"></param>
        /// <returns>True if Success else false </returns>
        public Task<bool> UpdateAppUserPasswordByIdAsync(string userId, string newUserPassword);

        #endregion

        #region Delete
        /// <summary>
        /// Delete an exisiting app user by Id 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if Success else false </returns>
        public bool DeleteAppUserById(string userId);
        
        /// <summary>
        /// Delete an exisiting app user by Id Async
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if Success else false </returns>
        public Task<bool> DeleteAppUserByIdAsync(string userId);

        /// <summary>
        /// Delete an exisiting app user by userNo (unique key)  
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns>True if Success else false </returns>
        public bool DeleteAppUserByNo(int userNo);

        /// <summary>
        /// Delete an exisiting app user by userNo (unique key) Async  
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns>True if Success else false </returns>
        public Task<bool> DeleteAppUserByNoAsync(int userNo);

        #endregion



    }
}
