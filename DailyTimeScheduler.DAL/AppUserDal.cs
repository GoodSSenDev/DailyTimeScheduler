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
        #region Create
        /// <summary>
        /// Create NewAppUser return true if success else false  
        /// </summary>
        /// <param name="newAppUser"></param>
        public bool CreateNewAppUser(AppUser newUser)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                db.Users.Add(newUser);
                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Create NewAppUser return true if success else false
        /// Async
        /// </summary>
        /// <param name="newAppUser"></param>
        public async Task<bool> CreateNewAppUserAsync(AppUser newUser)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                await db.Users.AddAsync(newUser);
                return (db.SaveChanges() > 0);
            }
        }
        #endregion

        #region Read
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

        #endregion  

        #region Update

        /// <summary>
        /// Update exisiting app user's nickname using userNo to locate 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public bool UpdateAppUserNickNameByNo(int userNo, string newUserNickName)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = db.Users.Where(user => user.No == userNo).FirstOrDefault();
                if (userRecord == null) 
                    return false;
                userRecord.NickName = newUserNickName;
                
                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update exisiting app user's nickname using userNo to locate async 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateAppUserNickNameByNoAsync(int userNo, string newUserNickName)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = await db.Users.Where(user => user.No == userNo).FirstOrDefaultAsync();
                if (userRecord == null)
                    return false;
                userRecord.NickName = newUserNickName;

                return (await db.SaveChangesAsync() > 0);
            }
        }

        /// <summary>
        /// Update exisiting app user's nickname using user Id to locate 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public bool UpdateAppUserNickNameById(string userId, string newUserNickName)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = db.Users.Where(user => user.Id == userId).FirstOrDefault();
                if (userRecord == null)
                    return false;
                userRecord.NickName = newUserNickName;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update exisiting app user's nickname using user Id to locate async 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateAppUserNickNameByIdAsync(string userId, string newUserNickName)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = await db.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();
                if (userRecord == null)
                    return false;
                userRecord.NickName = newUserNickName;

                return (await db.SaveChangesAsync() > 0);
            }
        }



        /// <summary>
        /// Update exisiting app user's password using userNo to locate 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public bool UpdateAppUsePasswordByNo(int userNo, string newUserPassword)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord =  db.Users.Where(user => user.No == userNo).FirstOrDefault();
                if (userRecord == null)
                    return false;
                userRecord.Password = newUserPassword;

                return (db.SaveChanges() > 0);
            }
        }


        /// <summary>
        /// Update exisiting app user's password using userNo to locate async 
        /// </summary>
        /// <param name="userNo"></param>
        /// <param name="newUserNickName"></param>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateAppUserPasswordByNoAsync(int userNo, string newUserPassword)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = await db.Users.Where(user => user.No == userNo).FirstOrDefaultAsync();
                if (userRecord == null)
                    return false;
                userRecord.Password = newUserPassword;

                return (await db.SaveChangesAsync() > 0);
            }
        }



        /// <summary>
        /// Update exisiting app user's password using user Id to locate 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserPassword"></param>
        /// <returns>True if Success else false </returns>
        public bool UpdateAppUserPasswordById(string userId, string newUserPassword)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = db.Users.Where(user => user.Id == userId).FirstOrDefault();
                if (userRecord == null)
                    return false;
                userRecord.Password = newUserPassword;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update exisiting app user's password using user Id to locate async 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="newUserPassword"></param>
        /// <returns>True if Success else false </returns>
        public async Task<bool> UpdateAppUserPasswordByIdAsync(string userId, string newUserPassword)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = await db.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();
                if (userRecord == null)
                    return false;
                userRecord.Password = newUserPassword;

                return (await db.SaveChangesAsync() > 0);
            }
        }

        #endregion

        #region Delete
        /// <summary>
        /// Delete an exisiting app user by Id 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if Success else false </returns>
        public bool DeleteAppUserById(string userId)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = db.Users.Where(user => user.Id == userId).FirstOrDefault();
                if (userRecord == null)
                    return false;
                db.Users.Remove(userRecord);

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Delete an exisiting app user by Id Async
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if Success else false </returns>
        public async Task<bool> DeleteAppUserByIdAsync(string userId)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = await db.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();
                if (userRecord == null)
                    return false;
                db.Users.Remove(userRecord);

                return (await db.SaveChangesAsync() > 0);
            }
        }


        /// <summary>
        /// Delete an exisiting app user by userNo (unique key)  
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns>True if Success else false </returns>
        public bool DeleteAppUserByNo(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = db.Users.Where(user => user.No == userNo).FirstOrDefault();
                if (userRecord == null)
                    return false;
                db.Users.Remove(userRecord);

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Delete an exisiting app user by userNo (unique key) Async  
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns>True if Success else false </returns>
        public async Task<bool> DeleteAppUserByNoAsync(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext())
            {
                var userRecord = await db.Users.Where(user => user.No == userNo).FirstOrDefaultAsync();
                if (userRecord == null)
                    return false;
                db.Users.Remove(userRecord);

                return (await db.SaveChangesAsync() > 0);
            }
        }

        #endregion


    }
}
