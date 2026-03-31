using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MxmdDev.Api.Data;
using MxmdDev.Api.Models;

namespace MxmdDev.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await db.Projects
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
        return Ok(projects);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await db.Projects.FindAsync(id);
        return project is null ? NotFound() : Ok(project);
    }
}
