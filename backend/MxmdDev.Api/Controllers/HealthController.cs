using Microsoft.AspNetCore.Mvc;

namespace MxmdDev.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    private static readonly DateTime StartTime = DateTime.UtcNow;

    [HttpGet]
    public IActionResult Get()
    {
        var uptimeMs = (long)(DateTime.UtcNow - StartTime).TotalMilliseconds;
        return Ok(new
        {
            status = "ONLINE",
            version = "V2.4.0-STABLE",
            uptimeMs,
            timestamp = DateTime.UtcNow
        });
    }
}
