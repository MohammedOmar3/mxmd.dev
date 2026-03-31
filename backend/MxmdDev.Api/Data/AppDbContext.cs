using Microsoft.EntityFrameworkCore;
using MxmdDev.Api.Models;

namespace MxmdDev.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Title).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Description).IsRequired();
            entity.Property(p => p.Tags).HasColumnType("text[]");
            entity.Property(p => p.Status).HasConversion<string>();
        });

        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.HasIndex(b => b.Slug).IsUnique();
            entity.Property(b => b.Slug).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Title).IsRequired().HasMaxLength(300);
            entity.Property(b => b.Excerpt).IsRequired();
            entity.Property(b => b.Content).IsRequired();
            entity.Property(b => b.Tags).HasColumnType("text[]");
        });

        // Seed data — matches mockup content
        modelBuilder.Entity<Project>().HasData(
            new Project
            {
                Id = 1,
                Title = "NEURAL_CORE_V2",
                Description = "A decentralized processing engine for distributed microservices with automated fault-recovery systems.",
                Tags = ["REST", "GRPC", "KUBERNETES"],
                Status = ProjectStatus.Stable,
                GitHubUrl = "https://github.com/mxmd-dev/neural-core-v2",
                CreatedAt = new DateTime(2024, 9, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Project
            {
                Id = 2,
                Title = "STRATOS_UI",
                Description = "A low-latency component library designed for high-frequency trading dashboards and real-time data visualization.",
                Tags = ["TYPESCRIPT", "WEBASSEMBLY", "TAILWIND"],
                Status = ProjectStatus.Stable,
                GitHubUrl = "https://github.com/mxmd-dev/stratos-ui",
                LiveDemoUrl = "https://stratos-ui.mxmd.dev",
                CreatedAt = new DateTime(2024, 7, 15, 0, 0, 0, DateTimeKind.Utc)
            },
            new Project
            {
                Id = 3,
                Title = "OMNI_SEARCH_IDX",
                Description = "High-performance indexing service for large-scale document storage systems with semantic search capabilities.",
                Tags = ["GO", "ELASTIC", "VECTOR DB"],
                Status = ProjectStatus.Beta,
                GitHubUrl = "https://github.com/mxmd-dev/omni-search-idx",
                CreatedAt = new DateTime(2024, 5, 10, 0, 0, 0, DateTimeKind.Utc)
            },
            new Project
            {
                Id = 4,
                Title = "VECTOR CORE ALPHA",
                Description = "A high-performance mathematical engine designed for real-time vector quantization. Optimized for edge computing environments with minimal memory footprint.",
                Tags = ["RUST", "WEBASSEMBLY", "GLSL"],
                Status = ProjectStatus.Stable,
                GitHubUrl = "https://github.com/mxmd-dev/vector-core-alpha",
                LiveDemoUrl = "https://vector-core.mxmd.dev",
                CreatedAt = new DateTime(2024, 10, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Project
            {
                Id = 5,
                Title = "NEURAL LATTICE",
                Description = "Experimental implementation of self-organizing feature maps for visualizing high-dimensional network traffic in real-time structural grids.",
                Tags = ["PYTHON", "PYTORCH", "DOCKER"],
                Status = ProjectStatus.Beta,
                GitHubUrl = "https://github.com/mxmd-dev/neural-lattice",
                LiveDemoUrl = "https://neural-lattice.mxmd.dev",
                CreatedAt = new DateTime(2024, 8, 20, 0, 0, 0, DateTimeKind.Utc)
            },
            new Project
            {
                Id = 6,
                Title = "MONOLITH UI",
                Description = "The design system driving this very site. Focused on brutalist precision, tonal layering, and mathematical layout consistency across devices.",
                Tags = ["TYPESCRIPT", "TAILWIND", "NEXT.JS"],
                Status = ProjectStatus.Stable,
                GitHubUrl = "https://github.com/mxmd-dev/monolith-ui",
                LiveDemoUrl = "https://mxmd.dev",
                CreatedAt = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Project
            {
                Id = 7,
                Title = "KERNEL WATCH",
                Description = "Low-level system monitoring tool leveraging eBPF for zero-overhead observability into kernel-level task scheduling and I/O latency.",
                Tags = ["C++", "LINUX", "EBPF"],
                Status = ProjectStatus.Archived,
                GitHubUrl = "https://github.com/mxmd-dev/kernel-watch",
                CreatedAt = new DateTime(2023, 11, 5, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<BlogPost>().HasData(
            new BlogPost
            {
                Id = 1,
                Slug = "functional-minimalism-system-design",
                Title = "The Case for Functional Minimalism in System Design",
                Excerpt = "Why removing features is often the most sophisticated engineering decision you can make.",
                Content = "Full post content goes here.",
                Tags = ["MINIMALISM", "ESSAYS"],
                PublishedAt = new DateTime(2024, 10, 14, 0, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 2,
                Slug = "memory-management-edge-computing",
                Title = "Memory Management in Modern Edge Computing",
                Excerpt = "Exploring allocation strategies and GC pressure in constrained runtime environments on the edge.",
                Content = "Full post content goes here.",
                Tags = ["PERFORMANCE", "SYSTEMS"],
                PublishedAt = new DateTime(2024, 9, 28, 0, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 3,
                Slug = "aesthetic-of-clean-code",
                Title = "The Aesthetic of Clean Code: A Visual Perspective",
                Excerpt = "How readability, whitespace, and naming conventions converge into a form of engineering craft.",
                Content = "Full post content goes here.",
                Tags = ["CRAFT", "DX"],
                PublishedAt = new DateTime(2024, 9, 2, 0, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 4,
                Slug = "physics-of-finite-state-machines",
                Title = "The Physics of Finite State Machines in Distributed Systems",
                Excerpt = "An exploration into how deterministic logic governs high-concurrency environments, and why state drift is the entropy of the modern web stack.",
                Content = "Full post content goes here.",
                Tags = ["ARCHITECTURE", "SCALABILITY"],
                PublishedAt = new DateTime(2024, 10, 12, 0, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 5,
                Slug = "type-safe-error-handling",
                Title = "Type-Safe Error Handling: Moving Beyond Try-Catch",
                Excerpt = "Using Result types and functional patterns to treat errors as first-class citizens rather than exceptional flow interruptions in your TypeScript codebase.",
                Content = "Full post content goes here.",
                Tags = ["TYPESCRIPT", "DX"],
                PublishedAt = new DateTime(2024, 9, 28, 0, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 6,
                Slug = "memory-leaks-virtual-dom",
                Title = "Memory Leaks and the Virtual DOM: A Post-Mortem",
                Excerpt = "Analyzing how closure-heavy components and dangling event listeners can degrade long-lived single-page applications over time.",
                Content = "Full post content goes here.",
                Tags = ["PERFORMANCE", "REACT"],
                PublishedAt = new DateTime(2024, 8, 15, 0, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 7,
                Slug = "case-for-boring-software",
                Title = "The Case for Boring Software",
                Excerpt = "Why choosing stable, mature technologies over the latest trend is often the most innovative decision a senior engineer can make for a project's lifecycle.",
                Content = "Full post content goes here.",
                Tags = ["MINIMALISM", "ESSAYS"],
                PublishedAt = new DateTime(2024, 7, 2, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
