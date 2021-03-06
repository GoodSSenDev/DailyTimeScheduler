using DailyTimeScheduler.BLL;
using DailyTimeScheduler.DAL;
using DailyTimeScheduler.DAL.DataContext;
using DailyTimeScheduler.IDAL;
using DailyTimeScheduler.Model;
using DailyTimeSchedulerApp.Middleware;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using System.Text;

namespace DailyTimeSchedulerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            StaticConfig = configuration;
        }

        public static IConfiguration StaticConfig { get; private set; }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var dbKey = Configuration.GetSection("ConnectionString").GetSection("DbCon").Value;

            services.AddTransient<TimeBlock>();
            services.AddTransient<AppUserBll>(provider => new AppUserBll(
                        new AppUserDal(dbKey)));
            services.AddTransient<ScheduleDataBll>(provider => new ScheduleDataBll(
                        new TimeBlockDal(dbKey), new ScheduleDal(dbKey)));

            services.AddControllersWithViews();


            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
                options.Cookie = new CookieBuilder()
                {
                    Name = "XSRF"
                };
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var db = new DailyTimeSchedulerDbContext(Configuration.GetSection("ConnectionString").GetSection("DbCon").Value);

            db.Database.Migrate();// do migration 

            if (env.IsDevelopment())
            {
                IdentityModelEventSource.ShowPII = true;
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCookiePolicy();

            app.UseJwtCookieMiddleware(app.ApplicationServices.GetService<IAntiforgery>(), Encoding.UTF8.GetBytes(Startup.StaticConfig.GetSection("SecurityKey1").Value));

            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseAntiforgeryCookieMiddleware(app.ApplicationServices.GetService<IAntiforgery>());

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
