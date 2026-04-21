namespace MxmdDev.Api.Middleware;

/// <summary>
/// Enforces API key authentication on all requests to /api/admin/**.
/// The key must be supplied in the X-Api-Key request header.
/// </summary>
public class ApiKeyMiddleware(RequestDelegate next, IConfiguration config)
{
    private const string ApiKeyHeader = "X-Api-Key";
    private const string AdminPathPrefix = "/api/admin";

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments(AdminPathPrefix, StringComparison.OrdinalIgnoreCase))
        {
            // CORS preflight requests do not carry the API key — let UseCors() handle them.
            if (HttpMethods.IsOptions(context.Request.Method))
            {
                await next(context);
                return;
            }

            if (!context.Request.Headers.TryGetValue(ApiKeyHeader, out var providedKey) ||
                string.IsNullOrWhiteSpace(providedKey))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { message = "API key required." });
                return;
            }

            var expectedKey = config["ApiKey"];
            if (string.IsNullOrWhiteSpace(expectedKey) || !string.Equals(providedKey, expectedKey, StringComparison.Ordinal))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { message = "Invalid API key." });
                return;
            }
        }

        await next(context);
    }
}
