using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyTimeScheduler.DAL.Migrations
{
    public partial class DevDbUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAllday",
                table: "TimeBlocks",
                newName: "IsAllDay");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAllDay",
                table: "TimeBlocks",
                newName: "IsAllday");
        }
    }
}
