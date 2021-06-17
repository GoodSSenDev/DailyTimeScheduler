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
using FluentAssertions;

namespace DailyTimeScheduler.Tests
{
    /// <summary>
    /// This is test class for testing Async or sync function of Business logic about passing data between front end back.
    /// Using mocking for DB access.
    /// </summary>
    [Collection("Sequential")]
    public class ScheduleDataBllTest
    {
        private static Random random = new Random();

        [Fact]
        public async Task GetScheduleDataAsJsonAsync_ShouldReturnCorrectJson()
        {

            //1. Arrange
            var randomNumberOfScheduleNoInt = random.Next(5, 20);
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, randomNumberOfScheduleNoInt);

            var testScheduleList = await GetRandomScheduleListAsync(randomNumberOfScheduleNoInt);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.GetTimeBlocksByUserNoAsync(It.IsAny<int>()))
                .ReturnsAsync(testTimeBlockList);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.GetSchedulesByUserNoAsync(It.IsAny<int>()))
                .ReturnsAsync(testScheduleList);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            SchedulesDto testScheduleDtoList = new SchedulesDto() { Schedules = testScheduleList, Timeblocks = testTimeBlockList };
            var jsonDataExpect = JsonConvert.SerializeObject(testScheduleDtoList);
            //2.Act
            var jsonDataActual = await scheduleDataBll.GetScheduleDataAsJsonAsync(1);
            //3.Assert
            Assert.Equal(jsonDataExpect, jsonDataActual);
        }


        [Fact]
        public async Task GetScheduleDataAsync_ShouldReturnCorrectData()
        {
            //1. Arrange
            var randomNumberOfScheduleNoInt = random.Next(5, 20);
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, randomNumberOfScheduleNoInt);

            var testScheduleList = await GetRandomScheduleListAsync(randomNumberOfScheduleNoInt);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.GetTimeBlocksByUserNoAsync(It.IsAny<int>()))
                .ReturnsAsync(testTimeBlockList);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.GetSchedulesByUserNoAsync(It.IsAny<int>()))
                .ReturnsAsync(testScheduleList);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var DataExpect = new SchedulesDto() { Schedules = testScheduleList, Timeblocks = testTimeBlockList };
            //2.Act
            var DataActual = await scheduleDataBll.GetScheduleDataAsync(1);

            //3.Assert
            DataActual.Schedules.Should().BeEquivalentTo(DataExpect.Schedules);
            DataActual.Timeblocks.Should().BeEquivalentTo(DataExpect.Timeblocks);
        }

        [Fact]
        public async Task CreateNewScheduleAsync_ShouldReturnTrueWhenSuccess()
        {
            //1. Arrange
            var scheduleNum = 1;
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, scheduleNum);
            var testSchedule = await GetRandomScheduleAsync(scheduleNum,1);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.CreateNewTimeBlockAsync(It.IsAny<TimeBlock>()))
                .ReturnsAsync(true);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.CreateNewScheduleReturnNoAsync(It.IsAny<Schedule>()))
                .ReturnsAsync(1);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var testData = new ScheduleDto() { Schedule = testSchedule, Timeblocks = testTimeBlockList };
            //2.Act
            var result = await scheduleDataBll.CreateNewScheduleAsync(testData);

            //3.Assert
            Assert.True(result);
        }

        [Fact]
        public async Task CreateNewScheduleAsync_ShouldReturnFalseWhenFail()
        {
            //1. Arrange
            var scheduleNum = 1;
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, scheduleNum);
            var testSchedule = await GetRandomScheduleAsync(scheduleNum, 1);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.CreateNewTimeBlockAsync(It.IsAny<TimeBlock>()))
                .ReturnsAsync(false);
            testTimeBlockList.Sort((x, y) => x.ScheduleNo.CompareTo(y.ScheduleNo));

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.CreateNewScheduleReturnNoAsync(It.IsAny<Schedule>()))
                .ReturnsAsync(1);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var testData = new ScheduleDto() { Schedule = testSchedule, Timeblocks = testTimeBlockList };
            //2.Act
            var result = await scheduleDataBll.CreateNewScheduleAsync(testData);

            //3.Assert
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteScheduleAsync_ShouldReturnTrueWhenSccuess()
        {
            //1. Arrange
            var scheduleNum = 1;
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, scheduleNum);
            var testSchedule = await GetRandomScheduleAsync(scheduleNum, 1);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.DeleteTimeBlockByScheduleNoAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.GetUserNoOfScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(1);
            mockScheduleDalClass.Setup(x => x.DeleteScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var testData = new ScheduleDto() { Schedule = testSchedule, Timeblocks = testTimeBlockList };
            //2.Act
            var result = await scheduleDataBll.DeleteScheduleAsync(1, scheduleNum);

            //3.Assert
            Assert.True(result);
        }

        [Fact]
        public async Task DeleteScheduleAsync_ShouldReturnFalseWhenFailToDeleteTimeBlock()
        {
            //1. Arrange
            var scheduleNum = 1;
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, scheduleNum);
            var testSchedule = await GetRandomScheduleAsync(scheduleNum, 1);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.DeleteTimeBlockByScheduleNoAsync(It.IsAny<int>()))
                .ReturnsAsync(false);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.GetUserNoOfScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(1);
            mockScheduleDalClass.Setup(x => x.DeleteScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var testData = new ScheduleDto() { Schedule = testSchedule, Timeblocks = testTimeBlockList };
            //2.Act
            var result = await scheduleDataBll.DeleteScheduleAsync(1, scheduleNum);

            //3.Assert
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteScheduleAsync_ShouldReturnFalseWhenFailToDeleteSchedule()
        {
            //1. Arrange
            var scheduleNum = 1;
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, scheduleNum);
            var testSchedule = await GetRandomScheduleAsync(scheduleNum, 1);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.DeleteTimeBlockByScheduleNoAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.GetUserNoOfScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(1);
            mockScheduleDalClass.Setup(x => x.DeleteScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(false);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var testData = new ScheduleDto() { Schedule = testSchedule, Timeblocks = testTimeBlockList };
            //2.Act
            var result = await scheduleDataBll.DeleteScheduleAsync(1, scheduleNum);

            //3.Assert
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteScheduleAsync_ShouldReturnFalseWhenWrongScheduleNo()
        {
            //1. Arrange
            var scheduleNum = 1;
            var testTimeBlockList = await GetRandomTimeBlockListAsync(25, scheduleNum);
            var testSchedule = await GetRandomScheduleAsync(scheduleNum, 1);

            var mockTimeBlockDalClass = new Mock<ITimeBlockDal>();
            mockTimeBlockDalClass.Setup(x => x.DeleteTimeBlockByScheduleNoAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var mockScheduleDalClass = new Mock<IScheduleDal>();
            mockScheduleDalClass.Setup(x => x.GetUserNoOfScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(2);
            mockScheduleDalClass.Setup(x => x.DeleteScheduleByNoAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var scheduleDataBll = new ScheduleDataBll(mockTimeBlockDalClass.Object, mockScheduleDalClass.Object);

            var testData = new ScheduleDto() { Schedule = testSchedule, Timeblocks = testTimeBlockList };
            //2.Act
            var result = await scheduleDataBll.DeleteScheduleAsync(1, scheduleNum);

            //3.Assert
            Assert.False(result);
        }

        /// <summary>
        /// Returns a TimeBlock List that have random TimeBlocks as element.
        /// </summary>
        /// <param name="length">length of a return TimeBlock list</param>
        /// <param name="scheduleNum">Number of Schdules in the list</param>
        /// <returns></returns>
        private async Task<List<TimeBlock>> GetRandomTimeBlockListAsync(int length,int scheduleNum)
        {
            var resultList = new List<TimeBlock>();
            for(int i = 1; i <= length; i++)
            {
                resultList.Add(GetRandomTimeBlock(i,scheduleNum)); 
            }
            return resultList;
        }

        /// <summary>
        /// Returns a TimeBlock that have random values on each attributes.
        /// </summary>
        /// <param name="no">TimeBlock Number</param>
        /// <param name="scheduleNum">Max in randome generate range of Schedule.</param>
        /// <returns></returns>
        private TimeBlock GetRandomTimeBlock(int no, int scheduleNum)
        {
            return new TimeBlock()
            {
                No = no,
                IntialUTCTime = random.Next(0, 270000) + 5954484981770000,
                BlockSize = random.Next(0, 270000),
                RepeatPeriod = random.Next(0, 2270000),
                ScheduleNo = random.Next(1, scheduleNum)
            };
        }

        /// <summary>
        /// Returns a Schedule List that have random Schedules as element.
        /// </summary>
        /// <param name="length">length of a return schedule list</param>
        /// <returns></returns>
        private async Task<List<Schedule>> GetRandomScheduleListAsync(int length)
        {
            var resultList = new List<Schedule>();
            for (int i = 1; i <= length; i++)
            {
                resultList.Add(await GetRandomScheduleAsync(i,1));
            }
            return resultList;
        }

        /// <summary>
        /// Returns a Schedule object that have random values on each attributes.
        /// </summary>
        /// <param name="no"></param>
        /// <returns></returns>
        private async Task<Schedule> GetRandomScheduleAsync(int no,int userNo)
        {
            return new Schedule()
            {
                No = no,
                Title = await RandomStringGeneratorAsync(random.Next(1, 30)),
                Description = await RandomStringGeneratorAsync(random.Next(1, 50)),
                IsScheduleEnd = false,
                UserNo = userNo,
                Type = ScheduleType.NORMAL,
            };
        }
        /// <summary>
        /// Returns random string
        /// </summary>
        /// <param name="length">length of that string</param>
        /// <returns></returns>
        private async Task<String> RandomStringGeneratorAsync(int length)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            return new String(stringChars);
        }


    }
}
