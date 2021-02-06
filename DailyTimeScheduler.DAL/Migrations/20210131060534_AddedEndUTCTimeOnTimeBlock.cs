using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyTimeScheduler.DAL.Migrations
{
    public partial class AddedEndUTCTimeOnTimeBlock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "EndUTCTime",
                table: "TimeBlocks",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndUTCTime",
                table: "TimeBlocks");
        }
    }
}
