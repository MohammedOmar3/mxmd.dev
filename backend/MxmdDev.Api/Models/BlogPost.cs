namespace MxmdDev.Api.Models;

public class BlogPost
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
}
