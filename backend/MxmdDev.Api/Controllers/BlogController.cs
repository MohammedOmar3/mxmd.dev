using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MxmdDev.Api.Data;
using MxmdDev.Api.Models;

namespace MxmdDev.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 50) pageSize = 10;

        var total = await db.BlogPosts.CountAsync(b => !b.IsDraft);
        var posts = await db.BlogPosts
            .Where(b => !b.IsDraft)
            .OrderByDescending(b => b.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(b => new
            {
                b.Id,
                b.Slug,
                b.Title,
                b.Excerpt,
                b.Tags,
                b.PublishedAt
            })
            .ToListAsync();

        return Ok(new { total, page, pageSize, posts });
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var post = await db.BlogPosts.FirstOrDefaultAsync(b => b.Slug == slug && !b.IsDraft);
        return post is null ? NotFound() : Ok(post);
    }
}
