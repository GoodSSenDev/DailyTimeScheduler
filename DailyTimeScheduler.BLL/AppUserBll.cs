﻿using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using System;
using System.Threading.Tasks;

namespace DailyTimeScheduler.BLL
{
    /// <summary>
    /// This class is Businees Logic Layer about AppUser.
    /// </summary>
    public class AppUserBll
    {
        private readonly IAppUserDal _userDal;

        public AppUserBll(IAppUserDal userDal)
        {
            this._userDal = userDal;
        }

        /// <summary>
        /// login system of this function 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <returns>if success return AppUser that matches, otherwise return null</returns>
        public async Task<AppUser> LoginAsync(string id, string password)
        {
            var matchedUser = await _userDal.GetAppUserByIdAsync(id);
            if (matchedUser == null)
                return null;

            if(BCrypt.Net.BCrypt.Verify(password,matchedUser.Password))
                return matchedUser;
            else
                return null;
        }

        /// <summary>
        /// Register User if Id and NickName are Unique 
        /// </summary>
        /// <param name="appUser"></param>
        /// <returns></returns>
        public async Task<AppUser> RegisterAsync(AppUser appUser)
        {
            var idMatchingUserT = _userDal.GetAppUserByIdAsync(appUser.Id);          
            var nickNameMatchingUserT = _userDal.GetAppUserByIdAsync(appUser.NickName);

            await Task.WhenAll(idMatchingUserT, nickNameMatchingUserT);

            if (idMatchingUserT.Result != null || nickNameMatchingUserT.Result != null)
                return null;

            appUser.Password = BCrypt.Net.BCrypt.HashPassword(appUser.Password, 17);

            if ((await _userDal.CreateNewAppUserAsync(appUser)))
                return appUser;
            else
                return null;

        }


    }
}
