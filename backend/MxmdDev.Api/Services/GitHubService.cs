using System.Text.Json.Serialization;
using Microsoft.Extensions.Caching.Memory;
using MxmdDev.Api.Models;

namespace MxmdDev.Api.Services;

public class GitHubService(IHttpClientFactory httpClientFactory, IMemoryCache cache, IConfiguration config)
{
    private const string CacheKey = "github_repos";

    public async Task<IReadOnlyList<GitHubRepo>> GetReposAsync()
    {
        if (cache.TryGetValue(CacheKey, out IReadOnlyList<GitHubRepo>? cached) && cached is not null)
            return cached;

        var client = httpClientFactory.CreateClient("GitHub");

        var token = config["GitHub:Token"];
        if (!string.IsNullOrWhiteSpace(token))
            client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

        var raw = await client.GetFromJsonAsync<GitHubRawRepo[]>(
            "users/MohammedOmar3/repos?type=public&per_page=100&sort=updated");

        var repos = (raw ?? [])
            .Where(r => !r.Fork && !r.Archived)
            .Select(r => new GitHubRepo(r.Name, r.Description, r.Language, r.HtmlUrl, r.UpdatedAt))
            .ToList();

        cache.Set(CacheKey, (IReadOnlyList<GitHubRepo>)repos, TimeSpan.FromMinutes(5));

        return repos;
    }

    private sealed class GitHubRawRepo
    {
        [JsonPropertyName("name")] public string Name { get; set; } = string.Empty;
        [JsonPropertyName("description")] public string? Description { get; set; }
        [JsonPropertyName("language")] public string? Language { get; set; }
        [JsonPropertyName("html_url")] public string HtmlUrl { get; set; } = string.Empty;
        [JsonPropertyName("updated_at")] public DateTime UpdatedAt { get; set; }
        [JsonPropertyName("fork")] public bool Fork { get; set; }
        [JsonPropertyName("archived")] public bool Archived { get; set; }
    }
}
