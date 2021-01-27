using DailyTimeScheduler.BLL;
using DailyTimeScheduler.DAL;
using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace DailyTimeScheduler.Tests
{
    /// <summary>
    /// This is test class for testing Async or sync function of Business logic about passing data between front end back.
    /// Using mocking for DB access.
    /// </summary>
    [Collection("Sequential")]
    public class ScheduleDataBllTest
    {
        [Fact]
        public async Task GetScheduleDataAsJsonAsync_ShouldReturnCorrectJson()
        {

            //1. Arrange
            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();

            var testTimeBlocksOne = new List<TimeBlock> { new TimeBlock()
                {
                    No = 1,
                    IntialUTCTime = 5954484981710000,
                    BlockSize = 10000,
                    RepeatPeriod = 10000,
                    ScheduleNo = 1

                },new TimeBlock()
                {
                    No = 2,
                    IntialUTCTime = 5954484981720000,
                    BlockSize = 20000,
                    RepeatPeriod = 20000,
                    ScheduleNo = 1

                },new TimeBlock()
                {
                    No = 3,
                    IntialUTCTime = 5954484981730000,
                    BlockSize = 30000,
                    RepeatPeriod = 30000,
                    ScheduleNo = 1

                },new TimeBlock()
                {
                    No = 4,
                    IntialUTCTime = 5954484981740000,
                    BlockSize = 40000,
                    RepeatPeriod = 40000,
                    ScheduleNo = 1

                }};

            var testTimeBlocksTwo = new List<TimeBlock> { new TimeBlock()
                {
                    No = 5,
                    IntialUTCTime = 5954484981750000,
                    BlockSize = 50000,
                    RepeatPeriod = 50000,
                    ScheduleNo = 2

                },new TimeBlock()
                {
                    No = 6,
                    IntialUTCTime = 5954484981760000,
                    BlockSize = 60000,
                    RepeatPeriod = 60000,
                    ScheduleNo = 2

                },new TimeBlock()
                {
                    No = 7,
                    IntialUTCTime = 5954484981770000,
                    BlockSize = 70000,
                    RepeatPeriod = 70000,
                    ScheduleNo = 2

                }};

            mockTimeBlockDalClass.Setup(x => x.GetTimeBlocksByScheduleNoAsync(It.Is<int>(x => x == 1)))
                .ReturnsAsync(new List<TimeBlock> { new TimeBlock()
                {
                    No = 1,
                    IntialUTCTime = 5954484981710000,
                    BlockSize = 10000,
                    RepeatPeriod = 10000,
                    ScheduleNo = 1

                },new TimeBlock()
                {
                    No = 2,
                    IntialUTCTime = 5954484981720000,
                    BlockSize = 20000,
                    RepeatPeriod = 20000,
                    ScheduleNo = 1

                },new TimeBlock()
                {
                    No = 3,
                    IntialUTCTime = 5954484981730000,
                    BlockSize = 30000,
                    RepeatPeriod = 30000,
                    ScheduleNo = 1

                },new TimeBlock()
                {
                    No = 4,
                    IntialUTCTime = 5954484981740000,
                    BlockSize = 40000,
                    RepeatPeriod = 40000,
                    ScheduleNo = 1

                }});

            mockTimeBlockDalClass.Setup(x => x.GetTimeBlocksByScheduleNoAsync(It.Is<int>(x => x == 2)))
                .ReturnsAsync(new List<TimeBlock> { new TimeBlock()
                {
                    No = 5,
                    IntialUTCTime = 5954484981750000,
                    BlockSize = 50000,
                    RepeatPeriod = 50000,
                    ScheduleNo = 2

                },new TimeBlock()
                {
                    No = 6,
                    IntialUTCTime = 5954484981760000,
                    BlockSize = 60000,
                    RepeatPeriod = 60000,
                    ScheduleNo = 2

                },new TimeBlock()
                {
                    No = 7,
                    IntialUTCTime = 5954484981770000,
                    BlockSize = 70000,
                    RepeatPeriod = 70000,
                    ScheduleNo = 2

                }});
            var mockScheduleDalClass = new Mock<IScheduleDal>();

            mockScheduleDalClass.Setup(x => x.GetSchedulesByUserNoAsync(It.IsAny<int>()))
                .ReturnsAsync(new List<Schedule> { new Schedule()
                {
                    No=1,
                    Title="This is Test Schedule Class 1",
                    Description="This is Test 1",
                    IsScheduleEnd= false,
                    UserNo = 1,
                    TaskType = ScheduleType.NORMAL,
                },new Schedule()
                {
                    No=2,
                    Title="This is Test Schedule Class 2",
                    Description="This is Test 2",
                    IsScheduleEnd= true,
                    UserNo = 1,
                    TaskType = ScheduleType.NORMAL,
                }});


            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);


            List<ScheduleDto> testScheduleDtoList = new List<ScheduleDto>{ new ScheduleDto()
                {
                    Schedule = new Schedule()
                    {
                        No=1,
                        Title="This is Test Schedule Class 1",
                        Description="This is Test 1",
                        IsScheduleEnd= false,
                        UserNo = 1,
                        TaskType = ScheduleType.NORMAL,
                    },
                    Timeblocks = testTimeBlocksOne
                },
                new ScheduleDto()
                {
                    Schedule = new Schedule()
                    {
                        No=2,
                        Title="This is Test Schedule Class 2",
                        Description="This is Test 2",
                        IsScheduleEnd= true,
                        UserNo = 1,
                        TaskType = ScheduleType.NORMAL,
                    },
                    Timeblocks = testTimeBlocksTwo
                }
            };


            //2.Act
            var jsonDataActual = await scheduleDataBll.GetScheduleDataAsJsonAsync();

            var jsonDataExpect = JsonConvert.SerializeObject(testScheduleDtoList);

            //3.Assert
            Assert.Equal(jsonDataExpect, jsonDataActual);
        }
    }
}
