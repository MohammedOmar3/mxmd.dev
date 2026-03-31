# mxmd.dev

Personal website and portfolio for [mxmd.dev](https://mxmd.dev). Built with a .NET 10 Web API backend and a React TypeScript Vite frontend.

## Project Structure

```
mxmd-dev/
├── backend/          # .NET 10 Web API — hosted on Railway
│   └── MxmdDev.Api/
└── frontend/         # React TS Vite SPA — hosted on Vercel
```

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS |
| Backend   | .NET 10, ASP.NET Core Web API       |
| Database  | PostgreSQL via EF Core (Npgsql)     |
| Hosting   | Vercel (frontend), Railway (backend + DB) |

## Getting Started

### Backend

1. [Install .NET 10 SDK](https://dotnet.microsoft.com/download)
2. Copy `backend/MxmdDev.Api/appsettings.Development.json.example` and fill in your PostgreSQL connection string and API key.
3. Run migrations:
   ```bash
   cd backend/MxmdDev.Api
   dotnet ef database update
   ```
4. Start the API:
   ```bash
   dotnet run
   ```
   API will be available at `http://localhost:5000`. Swagger UI at `http://localhost:5000/swagger`.

### Frontend

1. [Install Node.js 20+](https://nodejs.org/)
2. Copy `.env.example` to `.env.local` and set `VITE_API_URL`:
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
3. Install dependencies and start dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

### Backend (`appsettings.json` / Railway env vars)

| Variable                                  | Description                          |
|-------------------------------------------|--------------------------------------|
| `ConnectionStrings__DefaultConnection`    | PostgreSQL connection string         |
| `ApiKey`                                  | Secret key for admin endpoints       |
| `AllowedOrigins`                          | Comma-separated CORS origins         |

### Frontend

| Variable        | Description                  |
|-----------------|------------------------------|
| `VITE_API_URL`  | Base URL of the .NET API     |

## API Endpoints

| Method | Path                     | Auth         | Description              |
|--------|--------------------------|--------------|--------------------------|
| GET    | `/health`                | —            | Live status + latency    |
| GET    | `/api/projects`          | —            | List all projects        |
| GET    | `/api/blog`              | —            | List all blog posts      |
| POST   | `/api/admin/projects`    | `X-Api-Key`  | Create project           |
| PUT    | `/api/admin/projects/{id}` | `X-Api-Key` | Update project           |
| DELETE | `/api/admin/projects/{id}` | `X-Api-Key` | Delete project           |
| POST   | `/api/admin/blog`        | `X-Api-Key`  | Create blog post         |
| PUT    | `/api/admin/blog/{id}`   | `X-Api-Key`  | Update blog post         |
| DELETE | `/api/admin/blog/{id}`   | `X-Api-Key`  | Delete blog post         |

## Deployment

### Vercel (Frontend)
Push the `frontend/` folder — `vercel.json` handles SPA routing rewrites automatically.

### Railway (Backend)
Railway reads `backend/railway.toml` and builds the `Dockerfile` inside `backend/`. Set the required environment variables in the Railway dashboard.

## License

MIT
