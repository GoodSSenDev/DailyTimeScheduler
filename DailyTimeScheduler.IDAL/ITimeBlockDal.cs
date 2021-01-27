using DailyTimeScheduler.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DailyTimeScheduler.IDAL
{
    public interface ITimeBlockDal
    {

        #region Create

        bool CreateNewTimeBlock(TimeBlock timeBlock);

        Task<bool> CreateNewTimeBlockAsync(TimeBlock timeBlock);

        bool CreateNewTimeBlockRange(params TimeBlock[] timeBlocks);

        Task<bool> CreateNewTimeBlockRangeAsync(params TimeBlock[] timeBlocks);

        #endregion

        #region Read

        List<TimeBlock> GetTimeBlocks();

        Task<List<TimeBlock>> GetTimeBlocksAsync();

        TimeBlock GetTimeBlockByNo(int no);

        Task<TimeBlock> GetTimeBlockByNoAsync(int no);

        List<TimeBlock> GetTimeBlocksByScheduleNo(int scheduleNo);

        Task<List<TimeBlock>> GetTimeBlocksByScheduleNoAsync(int scheduleNo);

        List<TimeBlock> GetTimeBlocksByUserNo(int userNo);

        Task<List<TimeBlock>> GetTimeBlocksByUserNoAsync(int userNo);
        #endregion

        #region Update


        bool UpdateTimeBlockIntialUTCTimeByNo(int timeBlockNo, long intialUTCTime);

        Task<bool> UpdateTimeBlockIntialUTCTimeByNoAsync(int timeBlockNo, long intialUTCTime);

        bool UpdateTimeBlockSizeByNo(int timeBlockNo, long blockSize);

        Task<bool> UpdateTimeBlockSizeByNoAsync(int timeBlockNo, long blockSize);

        bool UpdateTimeBlockRepeatPeriodByNo(int timeBlockNo, long repeatPeriod);

        Task<bool> UpdateTimeBlockRepeatPeriodByNoAsync(int timeBlockNo, long repeatPeriod);

        #endregion

        #region Delete

        bool DeleteTimeBlockByScheduleNo(int scheduleNo);

        Task<bool> DeleteTimeBlockByScheduleNoAsync(int scheduleNo);

        bool DeleteTimeBlockByNo(int no);

        Task<bool> DeleteTimeBlockByNoAsync(int no);

        #endregion


    }



}
