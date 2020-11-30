using DailyTimeScheduler.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=DailyTimeSchedulerDb;User Id=sa;Password=nl6329nl;");
        }
    }
}
