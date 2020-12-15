using DailyTimeScheduler.BLL;
using DailyTimeScheduler.DAL;
using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using Moq;
using System;
using Xunit;

namespace DailyTimeScheduler.Tests
{
    /// <summary>
    /// This is test class for testing Async or sync function of Business logic about user using mocking for DB access.  
    /// </summary>
    [Collection("Sequential")]
    public class AppUserBllTest 
    {
        /// <summary>
        /// Login Async Method  expected return an AppUser object that have different password. (hashed password)
        /// This testing method test it returns an AppUser object with different password
        /// </summary>
        [Fact]
        public async void LoginAsync_ShouldReturnAppUserObject()
        {
            //preparing the Data Access Layer class that going in the Busineess Logic class
            //Mocking
            //1. Arrange
            var mockDalClass = new Mock<IAppUserDal>();
            var realPassword = "qwer1234";
            mockDalClass.Setup(x => x.GetAppUserByIdAsync(It.IsAny<string>()))
                .ReturnsAsync( new AppUser()
                {
                    No = 1,
                    Id = "test123",
                    NickName = "nickDan"
                    ,
                    Password = realPassword,
                    AccessLevel = 1
                });

            var userDal = new AppUserBll(mockDalClass.Object);

            //2. Act
            var returnAppUser = await userDal.LoginAsync("test123");

            //3.Assert
            Assert.NotNull(returnAppUser);

            Assert.False(realPassword == returnAppUser.Password);
        }
        /// <summary>
        /// Register Async Method expected check the duplication exist on unique field(Id, NickName) and 
        /// return true if success 
        /// </summary>
        [Fact]
        public async void RegisterAsync_ShouldReturnAppUserObject()
        {
            //preparing the Data Access Layer class that going in the Busineess Logic class
            //Mocking
            //1. Arrange
            var mockDalClass = new Mock<IAppUserDal>();
            //Checking Unique 
            mockDalClass.Setup(x => x.GetAppUserByIdAsync(It.IsAny<string>()))
                .ReturnsAsync((AppUser)(null));
            mockDalClass.Setup(x => x.GetAppUserByNickNameAsync(It.IsAny<string>()))
                .ReturnsAsync((AppUser)(null));
            //Creating New User
            mockDalClass.Setup(x => x.CreateNewAppUserAsync(It.IsAny<AppUser>()))
                .ReturnsAsync(true);


            var userDal = new AppUserBll(mockDalClass.Object);

            //2. Act
            var returnAppUser = await userDal.RegisterAsync( new AppUser()
                {
                    No = 1,
                    Id = "test123",
                    NickName = "nickDan",
                    Password = "qwer1234",
                    AccessLevel = 1
                });

            //3.Assert

            Assert.True(returnAppUser.Password);
        }
    }
}
