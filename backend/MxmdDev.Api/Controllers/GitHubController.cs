using Microsoft.AspNetCore.Mvc;
using MxmdDev.Api.Services;

namespace MxmdDev.Api.Controllers;

[ApiController]
[Route("api/github")]
public class GitHubController(GitHubService gitHub) : ControllerBase
{
    [HttpGet("repos")]
    public async Task<IActionResult> GetRepos()
    {
        var repos = await gitHub.GetReposAsync();
        return Ok(repos);
    }
}
