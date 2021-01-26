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
    public class ScheduleDal : IScheduleDal
    {
        private readonly string _connectionString;

        public ScheduleDal(string connectionString)
        {
            _connectionString = connectionString;
        }

        #region Create
        /// <summary>
        /// Create newSchedule return true if success else false  
        /// </summary>
        /// <param name="schedule"></param>
        public bool CreateNewSchedule(Schedule schedule)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                db.Schedules.Add(schedule);
                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Create newSchedule return true if success else false  Async
        /// </summary>
        /// <param name="schedule"></param>
        public async Task<bool> CreateNewScheduleAsync(Schedule schedule)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                await db.Schedules.AddAsync(schedule);
                return (db.SaveChanges() > 0);
            }
        }
        #endregion

        #region Read
        /// <summary>
        /// Get all the Schedules in the database 
        /// </summary>
        /// <returns></returns>
        public List<Schedule> GetSchedules()
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var scheduleList = db.Schedules.ToList<Schedule>();
                return scheduleList;
            }
        }

        /// <summary>
        /// Get all the Schedules in the database Async
        /// </summary>
        /// <returns></returns>
        public async Task<List<Schedule>> GetSchedulesAsync()
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var scheduleList = await db.Schedules.ToListAsync<Schedule>();
                return scheduleList;
            }
        }

        /// <summary>
        /// Get all the Schedule by No in the database
        /// </summary>
        /// <param name="no"></param>
        /// <returns></returns>
        public Schedule GetScheduleByNo(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var Schedule = db.Schedules.Where(schedule => schedule.No == no).FirstOrDefault<Schedule>();
                return Schedule;
            }
        }

        /// <summary>
        /// Get all the Schedule by No in the database Async
        /// </summary>
        /// <param name="no"></param>
        /// <returns></returns>
        public async Task<Schedule> GetScheduleByNoAsync(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var Schedule = await db.Schedules.Where(schedule => schedule.No == no).FirstOrDefaultAsync<Schedule>();
                return Schedule;
            }
        }

        /// <summary>
        /// Get all the Schedules by UserNo in the database
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns></returns>
        public List<Schedule> GetSchedulesByUserNo(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var scheduleList = db.Schedules.Where(schedule => schedule.UserNo == userNo).ToList<Schedule>();
                return scheduleList;
            }
        }

        /// <summary>
        /// Get all the Schedules by UserNo in the database Async
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns></returns>
        public async Task<List<Schedule>> GetSchedulesByUserNoAsync(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var scheduleList = await db.Schedules.Where(schedule => schedule.UserNo == userNo).ToListAsync<Schedule>();
                return scheduleList;
            }
        }
        #endregion

        #region Update

        /// <summary>
        /// Update Schedule's Title using no 
        /// </summary>
        /// <param name="no"></param>
        /// <param name="title"></param>
        /// <returns>return true if success else false</returns>
        public bool UpdateScheduleTitleByNo(int no, string title)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = db.Schedules.Where(schedule => schedule.No == no).FirstOrDefault();
                if (schedule == null)
                    return false;
                schedule.Title = title;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update Schedule's Title (Max 50) using no Async
        /// </summary>
        /// <param name="no"></param>
        /// <param name="title"></param>
        /// <returns>return true if success else false</returns>
        public async Task<bool> UpdateScheduleTitleByNoAsync(int no, string title)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = await db.Schedules.Where(schedule => schedule.No == no).FirstOrDefaultAsync();
                if (schedule == null)
                    return false;
                schedule.Title = title;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update Schedule's Description (Max 200) using no 
        /// </summary>
        /// <param name="no"></param>
        /// <param name="title"></param>
        /// <returns>return true if success else false</returns>
        public bool UpdateScheduleDescriptionByNo(int no, string description)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = db.Schedules.Where(schedule => schedule.No == no).FirstOrDefault();
                if (schedule == null)
                    return false;
                schedule.Description = description;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update Schedule's Description (Max 200) using no Async
        /// </summary>
        /// <param name="no"></param>
        /// <param name="title"></param>
        /// <returns>return true if success else false</returns>
        public async Task<bool> UpdateScheduleDescriptionByNoAsync(int no, string description)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = await db.Schedules.Where(schedule => schedule.No == no).FirstOrDefaultAsync();
                if (schedule == null)
                    return false;
                schedule.Description = description;

                return (db.SaveChanges() > 0);
            }
        }


        /// <summary>
        /// Update Schedule's Description (Max 200) using no 
        /// </summary>
        /// <param name="no"></param>
        /// <param name="title"></param>
        /// <returns>return true if success else false</returns>
        public bool UpdateScheduleIsEndByNo(int no, bool isScheduleEnd)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = db.Schedules.Where(schedule => schedule.No == no).FirstOrDefault();
                if (schedule == null)
                    return false;
                schedule.IsScheduleEnd = isScheduleEnd;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update Schedule's Description (Max 200) using no 
        /// </summary>
        /// <param name="no"></param>
        /// <param name="title"></param>
        /// <returns>return true if success else false</returns>
        public async Task<bool> UpdateScheduleIsEndByNoAsync(int no, bool isScheduleEnd)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = await db.Schedules.Where(schedule => schedule.No == no).FirstOrDefaultAsync();
                if (schedule == null)
                    return false;
                schedule.IsScheduleEnd = isScheduleEnd;

                return (db.SaveChanges() > 0);
            }
        }

        #endregion

        #region Delete

        /// <summary>
        /// Delete Schedules which have specific UserNo
        /// </summary>
        /// <returns>True if Success else false </returns>
        public bool DeleteSchedulesByUserNo(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedules = db.Schedules.Where(schedule => schedule.UserNo == userNo).ToList<Schedule>();

                foreach (Schedule schedule in schedules)
                {
                    if (schedule == null)
                        return false;
                    db.Schedules.Remove(schedule);
                }

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Delete Schedules which have specific UserNo ASync
        /// </summary>
        /// <returns>True if Success else false </returns>
        public async Task<bool> DeleteSchedulesByUserNoAsync(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedules = await db.Schedules.Where(schedule => schedule.UserNo == userNo).ToListAsync<Schedule>();

                foreach (Schedule schedule in schedules)
                {
                    if (schedule == null)
                        return false;
                    db.Schedules.Remove(schedule);
                }

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Delete Schedule using TimeBlock no
        /// </summary>
        /// <param name="no"></param>
        /// <returns>True if Deletion is Sccuess else false </returns>
        public bool DeleteScheduleByNo(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = db.Schedules.Where(schedule => schedule.No == no).FirstOrDefault();
                if (schedule == null)
                    return false;
                db.Schedules.Remove(schedule);

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Delete Schedule using TimeBlock no
        /// </summary>
        /// <param name="no"></param>
        /// <returns>True if Deletion is Sccuess else false </returns>
        public async Task<bool> DeleteScheduleByNoAsync(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var schedule = await db.Schedules.Where(schedule => schedule.No == no).FirstOrDefaultAsync();
                if (schedule == null)
                    return false;
                db.Schedules.Remove(schedule);

                return (db.SaveChanges() > 0);
            }
        }


        #endregion
    }
}
