using DailyTimeScheduler.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DailyTimeScheduler.IDAL
{
    public interface IScheduleDal
    {
        #region Create
        bool CreateNewSchedule(Schedule schedule);

        Task<bool> CreateNewScheduleAsync(Schedule schedule);

        int CreateNewScheduleReturnNo(Schedule schedule);

        Task<int> CreateNewScheduleReturnNoAsync(Schedule schedule);

        #endregion

        #region Read
        List<Schedule> GetSchedules();

        Task<List<Schedule>> GetSchedulesAsync();

        Schedule GetScheduleByNo(int no);

        Task<Schedule> GetScheduleByNoAsync(int no);

        List<Schedule> GetSchedulesByUserNo(int userNo);

        Task<List<Schedule>> GetSchedulesByUserNoAsync(int userNo);

        int GetUserNoOfScheduleByNo(int no);

        Task<int> GetUserNoOfScheduleByNoAsync(int no);
        #endregion
            
        #region Update
        bool UpdateScheduleByNo(int no, Schedule updatedSchedule);

        Task<bool> UpdateScheduleByNoAsync(int no, Schedule updatedSchedule);

        bool UpdateScheduleTitleByNo(int no, string title);

        Task<bool> UpdateScheduleTitleByNoAsync(int no, string title);

        bool UpdateScheduleDescriptionByNo(int no, string description);

        Task<bool> UpdateScheduleDescriptionByNoAsync(int no, string description);

        bool UpdateScheduleIsEndByNo(int no, bool isScheduleEnd);

        Task<bool> UpdateScheduleIsEndByNoAsync(int no, bool isScheduleEnd);

        #endregion

        #region Delete
        bool DeleteSchedulesByUserNo(int userNo);

        Task<bool> DeleteSchedulesByUserNoAsync(int userNo);

        bool DeleteScheduleByNo(int no);

        Task<bool> DeleteScheduleByNoAsync(int no);
        #endregion
    }
}
