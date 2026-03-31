namespace MxmdDev.Api.Models;

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
    public ProjectStatus Status { get; set; } = ProjectStatus.Stable;
    public string? GitHubUrl { get; set; }
    public string? LiveDemoUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum ProjectStatus
{
    Stable,
    Beta,
    Archived
}
