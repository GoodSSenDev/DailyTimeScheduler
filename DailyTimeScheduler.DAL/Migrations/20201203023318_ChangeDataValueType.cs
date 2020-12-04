using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyTimeScheduler.DAL.Migrations
{
    public partial class ChangeDataValueType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_Schedule_ScheduleNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_TimeBlock_TimeBlockNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedule_Users_UserNo",
                table: "Schedule");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeBlock_Schedule_ScheduleNo",
                table: "TimeBlock");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeBlock_Users_UserNo",
                table: "TimeBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeBlock",
                table: "TimeBlock");

            migrationBuilder.DropIndex(
                name: "IX_TimeBlock_UserNo",
                table: "TimeBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Schedule",
                table: "Schedule");

            migrationBuilder.DropColumn(
                name: "UserNo",
                table: "TimeBlock");

            migrationBuilder.RenameTable(
                name: "TimeBlock",
                newName: "TimeBlocks");

            migrationBuilder.RenameTable(
                name: "Schedule",
                newName: "Schedules");

            migrationBuilder.RenameIndex(
                name: "IX_TimeBlock_ScheduleNo",
                table: "TimeBlocks",
                newName: "IX_TimeBlocks_ScheduleNo");

            migrationBuilder.RenameIndex(
                name: "IX_Schedule_UserNo",
                table: "Schedules",
                newName: "IX_Schedules_UserNo");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "NickName",
                table: "Users",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Schedules",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Schedules",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeBlocks",
                table: "TimeBlocks",
                column: "No");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules",
                column: "No");

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_Schedules_ScheduleNo",
                table: "BoolRecords",
                column: "ScheduleNo",
                principalTable: "Schedules",
                principalColumn: "No",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_TimeBlocks_TimeBlockNo",
                table: "BoolRecords",
                column: "TimeBlockNo",
                principalTable: "TimeBlocks",
                principalColumn: "No",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Users_UserNo",
                table: "Schedules",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeBlocks_Schedules_ScheduleNo",
                table: "TimeBlocks",
                column: "ScheduleNo",
                principalTable: "Schedules",
                principalColumn: "No",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_Schedules_ScheduleNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_TimeBlocks_TimeBlockNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Users_UserNo",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeBlocks_Schedules_ScheduleNo",
                table: "TimeBlocks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeBlocks",
                table: "TimeBlocks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules");

            migrationBuilder.RenameTable(
                name: "TimeBlocks",
                newName: "TimeBlock");

            migrationBuilder.RenameTable(
                name: "Schedules",
                newName: "Schedule");

            migrationBuilder.RenameIndex(
                name: "IX_TimeBlocks_ScheduleNo",
                table: "TimeBlock",
                newName: "IX_TimeBlock_ScheduleNo");

            migrationBuilder.RenameIndex(
                name: "IX_Schedules_UserNo",
                table: "Schedule",
                newName: "IX_Schedule_UserNo");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "NickName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<int>(
                name: "UserNo",
                table: "TimeBlock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Schedule",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Schedule",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeBlock",
                table: "TimeBlock",
                column: "No");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schedule",
                table: "Schedule",
                column: "No");

            migrationBuilder.CreateIndex(
                name: "IX_TimeBlock_UserNo",
                table: "TimeBlock",
                column: "UserNo");

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_Schedule_ScheduleNo",
                table: "BoolRecords",
                column: "ScheduleNo",
                principalTable: "Schedule",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_TimeBlock_TimeBlockNo",
                table: "BoolRecords",
                column: "TimeBlockNo",
                principalTable: "TimeBlock",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedule_Users_UserNo",
                table: "Schedule",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeBlock_Schedule_ScheduleNo",
                table: "TimeBlock",
                column: "ScheduleNo",
                principalTable: "Schedule",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeBlock_Users_UserNo",
                table: "TimeBlock",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
