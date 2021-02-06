using DailyTimeScheduler.DAL.DataContext;
using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyTimeScheduler.DAL
{
    public class TimeBlockDal : ITimeBlockDal
    {
        private readonly string _connectionString;

        public TimeBlockDal(string connectionString)
        {
            _connectionString = connectionString;
        }


        #region Create
        /// <summary>
        /// Create TimeBlock 
        /// </summary>
        /// <param name="timeBlock"></param>
        /// <returns> return true if success else false </returns>
        public bool CreateNewTimeBlock(TimeBlock timeBlock)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                db.TimeBlocks.Add(timeBlock);
                return (db.SaveChanges() > 0);
            }
        }


        /// <summary>
        /// Create TimeBlock Async
        /// </summary>
        /// <param name="timeBlock"></param>
        /// <returns> return true if success else false </returns>
        public async Task<bool> CreateNewTimeBlockAsync(TimeBlock timeBlock)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                await db.TimeBlocks.AddAsync(timeBlock);
                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Create TimeBlocks
        /// </summary>
        /// <param name="timeBlock"></param>
        /// <returns> return true if success else false </returns>
        public bool CreateNewTimeBlockRange(params TimeBlock[] timeBlocks)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                db.TimeBlocks.AddRange(timeBlocks);
                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Create TimeBlocks Async
        /// </summary>
        /// <param name="timeBlock"></param>
        /// <returns> return true if success else false </returns>
        public async Task<bool> CreateNewTimeBlockRangeAsync(params TimeBlock[] timeBlocks)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                await db.TimeBlocks.AddRangeAsync(timeBlocks);
                return (db.SaveChanges() > 0);
            }
        }
        #endregion

        #region Read
        /// <summary>
        /// Get all the TimeBlocks in the database 
        /// </summary>
        /// <returns></returns>
        public List<TimeBlock> GetTimeBlocks()
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockList = db.TimeBlocks.ToList<TimeBlock>();
                return timeBlockList;
            }
        }

        /// <summary>
        /// Get all the TimeBlocks in the database async
        /// </summary>
        /// <returns></returns>
        public async Task<List<TimeBlock>> GetTimeBlocksAsync()
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockList = await db.TimeBlocks.ToListAsync<TimeBlock>();
                return timeBlockList;
            }
        }

        /// <summary>
        /// Get the Timeblocks with No 
        /// </summary>
        /// <param name="no"></param>
        /// <returns>If TimeBlock No does not exist return null else return matching TimeBlock </returns>
        public TimeBlock GetTimeBlockByNo(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var Timeblock = db.TimeBlocks.Where(timeBlock => timeBlock.No == no).FirstOrDefault<TimeBlock>();
                return Timeblock;
            }
        }

        /// <summary>
        /// Get the Timeblocks with No Async
        /// </summary>
        /// <param name="no"></param>
        /// <returns>If TimeBlock No does not exist return null else return matching TimeBlock </returns>
        public async Task<TimeBlock> GetTimeBlockByNoAsync(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var Timeblock = await db.TimeBlocks.Where(timeBlock => timeBlock.No == no).FirstOrDefaultAsync<TimeBlock>();
                return Timeblock;
            }
        }

        /// <summary>
        /// Get all the TimeBlocks that has specific scheduler No in the database 
        /// </summary>
        /// <returns></returns>
        public List<TimeBlock> GetTimeBlocksByScheduleNo(int scheduleNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeblockList = db.TimeBlocks.Where(timeblock => timeblock.ScheduleNo == scheduleNo).ToList<TimeBlock>();
                return timeblockList;
            }
        }

        /// <summary>
        /// Get all the TimeBlocks that has specific scheduler No in the database async
        /// </summary>
        /// <returns></returns>
        public async Task<List<TimeBlock>> GetTimeBlocksByScheduleNoAsync(int scheduleNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeblockList = await db.TimeBlocks.Where(timeblock => timeblock.ScheduleNo == scheduleNo).ToListAsync<TimeBlock>();
                return timeblockList;
            }
        }

        /// <summary>
        /// Get all the TimeBlocks that has specific user No in the database 
        /// </summary>
        /// <returns></returns>
        public List<TimeBlock> GetTimeBlocksByUserNo(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeblockList = db.TimeBlocks.Where(timeblock => timeblock.Schedule.UserNo == userNo).ToList<TimeBlock>();
                return timeblockList;
            }
        }


        /// <summary>
        /// Get all the TimeBlocks that has specific user No in the database Async
        /// </summary>
        /// <returns></returns>
        public async Task<List<TimeBlock>> GetTimeBlocksByUserNoAsync(int userNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeblockList = await db.TimeBlocks.Where(timeblock => timeblock.Schedule.UserNo == userNo).ToListAsync<TimeBlock>();
                return timeblockList;
            }
        }

        #endregion

        #region Update

        /// <summary>
        /// Update IntialUTCTime using timeBlockNo
        /// </summary>
        /// <returns> return true if success else false </returns>
        public bool UpdateTimeBlockIntialUTCTimeByNo(int timeBlockNo, long intialUTCTime)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefault();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.IntialUTCTime = intialUTCTime;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update IntialUTCTime using timeBlockNo
        /// </summary>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateTimeBlockIntialUTCTimeByNoAsync(int timeBlockNo, long intialUTCTime)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = await db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefaultAsync();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.IntialUTCTime = intialUTCTime;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update EndUTCTime using timeBlockNo
        /// </summary>
        /// <returns> return true if success else false </returns>
        public bool UpdateTimeBlockEndUTCTimeByNo(int timeBlockNo, long endUTCTime)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefault();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.EndUTCTime = endUTCTime;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update EndUTCTime using timeBlockNo Async
        /// </summary>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateTimeBlockEndUTCTimeByNoAsync(int timeBlockNo, long endUTCTime)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = await db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefaultAsync();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.EndUTCTime = endUTCTime;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update EndUTCTime using timeBlockNo
        /// </summary>
        /// <returns> return true if success else false </returns>
        public bool UpdateIsAllDayByNo(int timeBlockNo, bool isAllDay)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefault();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.IsAllDay = isAllDay;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update EndUTCTime using timeBlockNo Async
        /// </summary>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateIsAllDayByNoAsync(int timeBlockNo, bool isAllDay)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = await db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefaultAsync();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.IsAllDay = isAllDay;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update TimeBlock's Size by timeblock number  
        /// </summary>
        /// <returns> return true if success else false </returns>
        public bool UpdateTimeBlockSizeByNo(int timeBlockNo, long blockSize)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefault();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.BlockSize = blockSize;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update TimeBlock's Size by timeblock number Async
        /// </summary>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateTimeBlockSizeByNoAsync(int timeBlockNo, long blockSize)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = await db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefaultAsync();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.BlockSize = blockSize;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update TimeBlock's RepeatPeriod by timeblock number  
        /// </summary>
        /// <returns> return true if success else false </returns>
        public bool UpdateTimeBlockRepeatPeriodByNo(int timeBlockNo, long repeatPeriod)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefault();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.RepeatPeriod = repeatPeriod;

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Update Timeblock's RepeatPeriod by timeblock number Async
        /// </summary>
        /// <returns> return true if success else false </returns>
        public async Task<bool> UpdateTimeBlockRepeatPeriodByNoAsync(int timeBlockNo, long repeatPeriod)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlockRecord = await db.TimeBlocks.Where(timeBlock => timeBlock.No == timeBlockNo).FirstOrDefaultAsync();
                if (timeBlockRecord == null)
                    return false;
                timeBlockRecord.RepeatPeriod = repeatPeriod;

                return (db.SaveChanges() > 0);
            }
        }

        #endregion

        #region Delete
        /// <summary>
        /// Delete TimeBlocks which have specific Schedule No
        /// </summary>
        /// <returns>True if Success else false </returns>
        public bool DeleteTimeBlockByScheduleNo(int scheduleNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeblocks = db.TimeBlocks.Where(timeBlock => timeBlock.ScheduleNo == scheduleNo).ToList<TimeBlock>();

                foreach(TimeBlock timeblock in timeblocks)
                {
                    if (timeblock == null)
                        return false;
                    db.TimeBlocks.Remove(timeblock);
                }

                return (db.SaveChanges() > 0);
            }
        }


        /// <summary>
        /// Delete an TimeBlock with certain Schedule No async
        /// </summary>
        /// <returns>True if Success else false </returns>
        public async Task<bool> DeleteTimeBlockByScheduleNoAsync(int scheduleNo)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeblocks = await db.TimeBlocks.Where(timeBlock => timeBlock.ScheduleNo == scheduleNo).ToListAsync<TimeBlock>();

                foreach (TimeBlock timeblock in timeblocks)
                {
                    if (timeblock == null)
                        return false;
                    db.TimeBlocks.Remove(timeblock);
                }

                return (db.SaveChanges() > 0);
            }
        }

        /// <summary>
        /// Delete TimeBlock using TimeBlock no
        /// </summary>
        /// <param name="no"></param>
        /// <returns>True if Deletion is Sccuess else false </returns>
        public bool DeleteTimeBlockByNo(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlock = db.TimeBlocks.Where(timeBlock => timeBlock.No == no).FirstOrDefault();
                if (timeBlock == null)
                    return false;
                db.TimeBlocks.Remove(timeBlock);

                return (db.SaveChanges() > 0);
            }
        }


        /// <summary>
        /// Delete TimeBlock using TimeBlock no Async
        /// </summary>
        /// <param name="no"></param>
        /// <returns>True if Deletion is Sccuess else false </returns>
        public async Task<bool> DeleteTimeBlockByNoAsync(int no)
        {
            using (var db = new DailyTimeSchedulerDbContext(_connectionString))
            {
                var timeBlock = await db.TimeBlocks.Where(timeBlock => timeBlock.No == no).FirstOrDefaultAsync();
                if (timeBlock == null)
                    return false;
                db.TimeBlocks.Remove(timeBlock);

                return (db.SaveChanges() > 0);
            }
        }
        #endregion
    }
}
