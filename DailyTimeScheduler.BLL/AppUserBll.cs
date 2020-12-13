using DailyTimeScheduler.IDAL;
using System;

namespace DailyTimeScheduler.BLL
{
    public class AppUserBll
    {
        private readonly IAppUserDal _userDal;

        public AppUserBll(IAppUserDal userDal)
        {
            this._userDal = userDal;
        }


    }
}
