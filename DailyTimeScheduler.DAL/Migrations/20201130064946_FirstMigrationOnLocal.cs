using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyTimeScheduler.DAL.Migrations
{
    public partial class FirstMigrationOnLocal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    No = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NickName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccessLevel = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.No);
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    No = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsScheduleEnd = table.Column<bool>(type: "bit", nullable: false),
                    UserNo = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.No);
                    table.ForeignKey(
                        name: "FK_Schedule_Users_UserNo",
                        column: x => x.UserNo,
                        principalTable: "Users",
                        principalColumn: "No",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeBlock",
                columns: table => new
                {
                    No = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IntialUTCTime = table.Column<long>(type: "bigint", nullable: false),
                    BlockSize = table.Column<long>(type: "bigint", nullable: false),
                    RepeatPeriod = table.Column<long>(type: "bigint", nullable: false),
                    ScheduleNo = table.Column<int>(type: "int", nullable: false),
                    UserNo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeBlock", x => x.No);
                    table.ForeignKey(
                        name: "FK_TimeBlock_Schedule_ScheduleNo",
                        column: x => x.ScheduleNo,
                        principalTable: "Schedule",
                        principalColumn: "No",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeBlock_Users_UserNo",
                        column: x => x.UserNo,
                        principalTable: "Users",
                        principalColumn: "No",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "BoolRecords",
                columns: table => new
                {
                    No = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SetTimeUTC = table.Column<long>(type: "bigint", nullable: false),
                    IsTaskDone = table.Column<bool>(type: "bit", nullable: false),
                    ScheduleNo = table.Column<int>(type: "int", nullable: false),
                    TimeBlockNo = table.Column<int>(type: "int", nullable: false),
                    UserNo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoolRecords", x => x.No);
                    table.ForeignKey(
                        name: "FK_BoolRecords_Schedule_ScheduleNo",
                        column: x => x.ScheduleNo,
                        principalTable: "Schedule",
                        principalColumn: "No",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BoolRecords_TimeBlock_TimeBlockNo",
                        column: x => x.TimeBlockNo,
                        principalTable: "TimeBlock",
                        principalColumn: "No",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BoolRecords_Users_UserNo",
                        column: x => x.UserNo,
                        principalTable: "Users",
                        principalColumn: "No",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoolRecords_ScheduleNo",
                table: "BoolRecords",
                column: "ScheduleNo");

            migrationBuilder.CreateIndex(
                name: "IX_BoolRecords_TimeBlockNo",
                table: "BoolRecords",
                column: "TimeBlockNo");

            migrationBuilder.CreateIndex(
                name: "IX_BoolRecords_UserNo",
                table: "BoolRecords",
                column: "UserNo");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_UserNo",
                table: "Schedule",
                column: "UserNo");

            migrationBuilder.CreateIndex(
                name: "IX_TimeBlock_ScheduleNo",
                table: "TimeBlock",
                column: "ScheduleNo");

            migrationBuilder.CreateIndex(
                name: "IX_TimeBlock_UserNo",
                table: "TimeBlock",
                column: "UserNo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoolRecords");

            migrationBuilder.DropTable(
                name: "TimeBlock");

            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
