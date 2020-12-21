using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyTimeSchedulerApp.Middleware
{
    /// <summary>
    /// Original code reference from:
    /// https://medium.com/@marcos.deaguiar/spa-with-cookie-authentication-in-asp-net-core-c7ba6d9f8ebe
    /// by Marcos De Anguiar
    /// </summary>
    public static class AntiforgeryCookieMiddleware
    {
        /// <summary>
        /// Adds an antiforgery cookie to the response.
        /// </summary>
        /// <param name="app">Application builder instance.</param>
        /// <param name="antiforgery">Antiforgery service.</param>
        /// <param name="cookieName">Name of the cookie where the token will be added.</param>
        public static void UseAntiforgeryCookieMiddleware(this IApplicationBuilder app,
                                                          IAntiforgery antiforgery,
                                                          string cookieName = "XSRF-TOKEN")
        {
            app.Use(async (context, next) =>
            {
                var tokens = antiforgery.GetAndStoreTokens(context);
                context.Response.Cookies.Append(cookieName,
                                                tokens.RequestToken,
                                                new CookieOptions() { HttpOnly = false });

                await next();
            });
        }
    }
}
