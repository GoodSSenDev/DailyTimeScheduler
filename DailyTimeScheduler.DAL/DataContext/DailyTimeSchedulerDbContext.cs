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

        private readonly string _connectionString;

        public DailyTimeSchedulerDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
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
