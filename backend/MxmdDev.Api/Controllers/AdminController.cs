using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MxmdDev.Api.Data;
using MxmdDev.Api.Models;

namespace MxmdDev.Api.Controllers;

/// <summary>
/// Admin endpoints protected by X-Api-Key header middleware.
/// All write operations for projects and blog posts live here.
/// </summary>
[ApiController]
[Route("api/admin")]
public class AdminController(AppDbContext db) : ControllerBase
{
    // ── Projects ───────────────────────────────────────────────────────────

    [HttpPost("projects")]
    public async Task<IActionResult> CreateProject([FromBody] Project project)
    {
        project.Id = 0;
        project.CreatedAt = DateTime.UtcNow;
        db.Projects.Add(project);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(ProjectsController.GetById),
            "Projects", new { id = project.Id }, project);
    }

    [HttpPut("projects/{id:int}")]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] Project updated)
    {
        var existing = await db.Projects.FindAsync(id);
        if (existing is null) return NotFound();

        existing.Title = updated.Title;
        existing.Description = updated.Description;
        existing.Tags = updated.Tags;
        existing.Status = updated.Status;
        existing.GitHubUrl = updated.GitHubUrl;
        existing.LiveDemoUrl = updated.LiveDemoUrl;

        await db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("projects/{id:int}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();
        db.Projects.Remove(project);
        await db.SaveChangesAsync();
        return NoContent();
    }

    // ── Blog Posts ─────────────────────────────────────────────────────────

    [HttpPost("blog")]
    public async Task<IActionResult> CreateBlogPost([FromBody] BlogPost post)
    {
        post.Id = 0;
        post.PublishedAt = DateTime.UtcNow;

        if (await db.BlogPosts.AnyAsync(b => b.Slug == post.Slug))
            return Conflict(new { message = "A post with this slug already exists." });

        db.BlogPosts.Add(post);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(BlogController.GetBySlug),
            "Blog", new { slug = post.Slug }, post);
    }

    [HttpPut("blog/{id:int}")]
    public async Task<IActionResult> UpdateBlogPost(int id, [FromBody] BlogPost updated)
    {
        var existing = await db.BlogPosts.FindAsync(id);
        if (existing is null) return NotFound();

        if (existing.Slug != updated.Slug &&
            await db.BlogPosts.AnyAsync(b => b.Slug == updated.Slug))
            return Conflict(new { message = "A post with this slug already exists." });

        existing.Slug = updated.Slug;
        existing.Title = updated.Title;
        existing.Excerpt = updated.Excerpt;
        existing.Content = updated.Content;
        existing.Tags = updated.Tags;

        await db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("blog/{id:int}")]
    public async Task<IActionResult> DeleteBlogPost(int id)
    {
        var post = await db.BlogPosts.FindAsync(id);
        if (post is null) return NotFound();
        db.BlogPosts.Remove(post);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
