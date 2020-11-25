using System;


public interface ITimeBlock
{
    /// <summary>
    /// Intial schedule time.
    /// DateTime.Ticks value for 100 nano second from 12:00:00 midnight, January 1, 0001 
    /// </summary>
    public long IntialUTCTime { get; set; }

    /// <summary>
    /// Size of this time block; Range of this time block 
    /// DateTime.Ticks value For 100 nano second from 12:00:00 midnight, January 1, 0001 
    /// </summary>
    public long BlockSize { get; set; }

    /// <summary>
    /// Repeat period Of this Time block, 0 if this schedule is not repeating 
    /// DateTime.Ticks value For 100 nano second from 12:00:00 midnight, January 1, 0001 
    /// </summary>
    public long RepeatPeriod { get; set; }

    /// <summary>
    /// default contructor
    /// </summary>
    /// <param name="intialUTCTime">Intial schedule time in DateTime.Ticks value (100 nano second)</param>
    /// <param name="blockSize">ize of this time block; Range of this time block in DateTime.Ticks value (100 nano second)</param>
    /// <param name="repeatPeriod"> Repeat period Of this Time block, 0 if this schedule is not repeating in DateTime.Ticks value (100 nano second) </param>
    public TimeBlock(long intialUTCTime, long blockSize, long repeatPeriod)
    { 
        this.IntialUTCTime = intialUTCTime;
        this.BlockSize = blockSize;
        this.RepeatPeriod = repeatPeriod;
    }


}
