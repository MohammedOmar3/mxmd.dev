# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY MxmdDev.Api/MxmdDev.Api.csproj MxmdDev.Api/
RUN dotnet restore MxmdDev.Api/MxmdDev.Api.csproj

COPY MxmdDev.Api/ MxmdDev.Api/
WORKDIR /src/MxmdDev.Api
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:${PORT:-8080}
EXPOSE 8080

ENTRYPOINT ["dotnet", "MxmdDev.Api.dll"]
