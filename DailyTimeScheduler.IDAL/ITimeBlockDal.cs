using DailyTimeScheduler.Model;
using System;
using System.Collections.Generic;

namespace DailyTimeScheduler.IDAL
{
    public interface ITimeBlockDal
    {
        List<TimeBlock> GetTimeBlocks();
    }
}
