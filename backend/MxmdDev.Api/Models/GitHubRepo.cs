namespace MxmdDev.Api.Models;

public record GitHubRepo(
    string Name,
    string? Description,
    string? Language,
    string HtmlUrl,
    DateTime UpdatedAt
);
