using DailyTimeScheduler.IDAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DailyTimeScheduler.BLL
{
    public class ScheduleDataBll
    {
        private readonly ITimeBlockDal _timeBlockDal;
        private readonly IScheduleDal _scheduleDal;

        public ScheduleDataBll(ITimeBlockDal timeBlockDal,IScheduleDal scheduleDal)
        {
            this._timeBlockDal = timeBlockDal;
            this._scheduleDal = scheduleDal;
        }

    }
    //Make (already decided) data passing object on Common model

}
