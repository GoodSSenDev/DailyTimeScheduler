using DailyTimeScheduler.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DailyTimeScheduler.DAL.DataContext
{
    public class DailyTimeSchedulerDbContext : DbContext
    {
        public DbSet<AppUser> Users { get; set; }

        public DbSet<Schedule> Schedules { get; set; }

        public DbSet<TimeBlock> TimeBlocks { get; set; }
        
        public DbSet<BoolScheduleRecord> BoolRecords { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:database-sql-server.database.windows.net,1433;Initial Catalog=ProductionDB;Persist Security Info=False;User ID=tierZero;Password=#Nl8837nl;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (var foreignKey in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
