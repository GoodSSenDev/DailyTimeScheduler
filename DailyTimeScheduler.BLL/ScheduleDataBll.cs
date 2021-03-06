﻿using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using Newtonsoft.Json;
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

        /// <summary>
        /// method That returns all the data with SchedulesDto  as Json format
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns></returns>
        public async Task<string> GetScheduleDataAsJsonAsync(int userNo)
        {
            var scheduleList = await this._scheduleDal.GetSchedulesByUserNoAsync(userNo);
            if (scheduleList.Count == 0)
                return "";

            var timeBlockList = await this._timeBlockDal.GetTimeBlocksByUserNoAsync(userNo);

            timeBlockList.Sort((x, y) => x.ScheduleNo.CompareTo(y.ScheduleNo));


            SchedulesDto schedulesDto = new SchedulesDto() { Schedules = scheduleList, Timeblocks = timeBlockList };


            return JsonConvert.SerializeObject(schedulesDto);
        }

        /// <summary>
        /// method That returns all the data with SchedulesDto as  SchedulesDto object
        /// </summary>
        /// <param name="userNo"></param>
        /// <returns>if fail returns null else schedulesDto</returns>
        public async Task<SchedulesDto> GetScheduleDataAsync(int userNo)
        {
            var scheduleList = await this._scheduleDal.GetSchedulesByUserNoAsync(userNo);
            if (scheduleList.Count == 0)
                return null;

            var timeBlockList = await this._timeBlockDal.GetTimeBlocksByUserNoAsync(userNo);

            timeBlockList.Sort((x, y) => x.ScheduleNo.CompareTo(y.ScheduleNo));


            SchedulesDto schedulesDto = new SchedulesDto() { Schedules = scheduleList, Timeblocks = timeBlockList };


            return schedulesDto;
        }

        /// <summary>
        /// Method that can create new schedule with timeBlock Async Parallel
        /// </summary>
        /// <param name="scheduleDto"></param>
        /// <returns>retrun true if success or no error else return false </returns>
        public async Task<bool> CreateNewScheduleAsyncParallel(ScheduleDto scheduleDto)
        {
            var scheduleNo = await this._scheduleDal.CreateNewScheduleReturnNoAsync(scheduleDto.Schedule);
            if(scheduleNo == -1)
                return false;

            await Task.Run(() =>
            {
                Parallel.ForEach(scheduleDto.Timeblocks, async (timeBlock) =>
                {
                    timeBlock.ScheduleNo = scheduleNo;
                    await this._timeBlockDal.CreateNewTimeBlockAsync(timeBlock);
                });
            });

            return true;
        }

        /// <summary>
        /// Method that can create new schedule with timeBlock Async 
        /// </summary>
        /// <param name="scheduleDto"></param>
        /// <returns>retrun true if success or no error else return false </returns>
        public async Task<bool> CreateNewScheduleAsync(ScheduleDto scheduleDto)
        {
            var scheduleNo = await this._scheduleDal.CreateNewScheduleReturnNoAsync(scheduleDto.Schedule);
            if (scheduleNo == -1)
                return false;

            for (int i = 0; i < scheduleDto.Timeblocks.Count; i++)
            {
                scheduleDto.Timeblocks[i].ScheduleNo = scheduleNo;
                if (!await this._timeBlockDal.CreateNewTimeBlockAsync(scheduleDto.Timeblocks[i]))
                    return false;
            }

            return true;
        }
    }

    //Make (already decided) data passing object on Common model

}
