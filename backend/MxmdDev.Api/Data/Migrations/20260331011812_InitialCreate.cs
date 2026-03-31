using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MxmdDev.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Slug = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Excerpt = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Tags = table.Column<string[]>(type: "text[]", nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Tags = table.Column<string[]>(type: "text[]", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    GitHubUrl = table.Column<string>(type: "text", nullable: true),
                    LiveDemoUrl = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Excerpt", "PublishedAt", "Slug", "Tags", "Title" },
                values: new object[,]
                {
                    { 1, "Full post content goes here.", "Why removing features is often the most sophisticated engineering decision you can make.", new DateTime(2024, 10, 14, 0, 0, 0, 0, DateTimeKind.Utc), "functional-minimalism-system-design", new[] { "MINIMALISM", "ESSAYS" }, "The Case for Functional Minimalism in System Design" },
                    { 2, "Full post content goes here.", "Exploring allocation strategies and GC pressure in constrained runtime environments on the edge.", new DateTime(2024, 9, 28, 0, 0, 0, 0, DateTimeKind.Utc), "memory-management-edge-computing", new[] { "PERFORMANCE", "SYSTEMS" }, "Memory Management in Modern Edge Computing" },
                    { 3, "Full post content goes here.", "How readability, whitespace, and naming conventions converge into a form of engineering craft.", new DateTime(2024, 9, 2, 0, 0, 0, 0, DateTimeKind.Utc), "aesthetic-of-clean-code", new[] { "CRAFT", "DX" }, "The Aesthetic of Clean Code: A Visual Perspective" },
                    { 4, "Full post content goes here.", "An exploration into how deterministic logic governs high-concurrency environments, and why state drift is the entropy of the modern web stack.", new DateTime(2024, 10, 12, 0, 0, 0, 0, DateTimeKind.Utc), "physics-of-finite-state-machines", new[] { "ARCHITECTURE", "SCALABILITY" }, "The Physics of Finite State Machines in Distributed Systems" },
                    { 5, "Full post content goes here.", "Using Result types and functional patterns to treat errors as first-class citizens rather than exceptional flow interruptions in your TypeScript codebase.", new DateTime(2024, 9, 28, 0, 0, 0, 0, DateTimeKind.Utc), "type-safe-error-handling", new[] { "TYPESCRIPT", "DX" }, "Type-Safe Error Handling: Moving Beyond Try-Catch" },
                    { 6, "Full post content goes here.", "Analyzing how closure-heavy components and dangling event listeners can degrade long-lived single-page applications over time.", new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Utc), "memory-leaks-virtual-dom", new[] { "PERFORMANCE", "REACT" }, "Memory Leaks and the Virtual DOM: A Post-Mortem" },
                    { 7, "Full post content goes here.", "Why choosing stable, mature technologies over the latest trend is often the most innovative decision a senior engineer can make for a project's lifecycle.", new DateTime(2024, 7, 2, 0, 0, 0, 0, DateTimeKind.Utc), "case-for-boring-software", new[] { "MINIMALISM", "ESSAYS" }, "The Case for Boring Software" }
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "CreatedAt", "Description", "GitHubUrl", "LiveDemoUrl", "Status", "Tags", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 1, 0, 0, 0, 0, DateTimeKind.Utc), "A decentralized processing engine for distributed microservices with automated fault-recovery systems.", "https://github.com/mxmd-dev/neural-core-v2", null, "Stable", new[] { "REST", "GRPC", "KUBERNETES" }, "NEURAL_CORE_V2" },
                    { 2, new DateTime(2024, 7, 15, 0, 0, 0, 0, DateTimeKind.Utc), "A low-latency component library designed for high-frequency trading dashboards and real-time data visualization.", "https://github.com/mxmd-dev/stratos-ui", "https://stratos-ui.mxmd.dev", "Stable", new[] { "TYPESCRIPT", "WEBASSEMBLY", "TAILWIND" }, "STRATOS_UI" },
                    { 3, new DateTime(2024, 5, 10, 0, 0, 0, 0, DateTimeKind.Utc), "High-performance indexing service for large-scale document storage systems with semantic search capabilities.", "https://github.com/mxmd-dev/omni-search-idx", null, "Beta", new[] { "GO", "ELASTIC", "VECTOR DB" }, "OMNI_SEARCH_IDX" },
                    { 4, new DateTime(2024, 10, 1, 0, 0, 0, 0, DateTimeKind.Utc), "A high-performance mathematical engine designed for real-time vector quantization. Optimized for edge computing environments with minimal memory footprint.", "https://github.com/mxmd-dev/vector-core-alpha", "https://vector-core.mxmd.dev", "Stable", new[] { "RUST", "WEBASSEMBLY", "GLSL" }, "VECTOR CORE ALPHA" },
                    { 5, new DateTime(2024, 8, 20, 0, 0, 0, 0, DateTimeKind.Utc), "Experimental implementation of self-organizing feature maps for visualizing high-dimensional network traffic in real-time structural grids.", "https://github.com/mxmd-dev/neural-lattice", "https://neural-lattice.mxmd.dev", "Beta", new[] { "PYTHON", "PYTORCH", "DOCKER" }, "NEURAL LATTICE" },
                    { 6, new DateTime(2024, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc), "The design system driving this very site. Focused on brutalist precision, tonal layering, and mathematical layout consistency across devices.", "https://github.com/mxmd-dev/monolith-ui", "https://mxmd.dev", "Stable", new[] { "TYPESCRIPT", "TAILWIND", "NEXT.JS" }, "MONOLITH UI" },
                    { 7, new DateTime(2023, 11, 5, 0, 0, 0, 0, DateTimeKind.Utc), "Low-level system monitoring tool leveraging eBPF for zero-overhead observability into kernel-level task scheduling and I/O latency.", "https://github.com/mxmd-dev/kernel-watch", null, "Archived", new[] { "C++", "LINUX", "EBPF" }, "KERNEL WATCH" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogPosts_Slug",
                table: "BlogPosts",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPosts");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
