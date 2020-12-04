using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyTimeScheduler.DAL.Migrations
{
    public partial class FirstAzureMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_Schedules_ScheduleNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_TimeBlocks_TimeBlockNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_BoolRecords_Users_UserNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Users_UserNo",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeBlocks_Schedules_ScheduleNo",
                table: "TimeBlocks");

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_Schedules_ScheduleNo",
                table: "BoolRecords",
                column: "ScheduleNo",
                principalTable: "Schedules",
                principalColumn: "No",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_TimeBlocks_TimeBlockNo",
                table: "BoolRecords",
                column: "TimeBlockNo",
                principalTable: "TimeBlocks",
                principalColumn: "No",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_Users_UserNo",
                table: "BoolRecords",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Users_UserNo",
                table: "Schedules",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeBlocks_Schedules_ScheduleNo",
                table: "TimeBlocks",
                column: "ScheduleNo",
                principalTable: "Schedules",
                principalColumn: "No",
                onDelete: ReferentialAction.Restrict);
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
                name: "FK_BoolRecords_Users_UserNo",
                table: "BoolRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Users_UserNo",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeBlocks_Schedules_ScheduleNo",
                table: "TimeBlocks");

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_Schedules_ScheduleNo",
                table: "BoolRecords",
                column: "ScheduleNo",
                principalTable: "Schedules",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_TimeBlocks_TimeBlockNo",
                table: "BoolRecords",
                column: "TimeBlockNo",
                principalTable: "TimeBlocks",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BoolRecords_Users_UserNo",
                table: "BoolRecords",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Users_UserNo",
                table: "Schedules",
                column: "UserNo",
                principalTable: "Users",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeBlocks_Schedules_ScheduleNo",
                table: "TimeBlocks",
                column: "ScheduleNo",
                principalTable: "Schedules",
                principalColumn: "No",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
