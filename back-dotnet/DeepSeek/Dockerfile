
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ./DeepSeek.csproj ./
RUN dotnet restore "DeepSeek.csproj"

COPY . .

RUN dotnet publish "DeepSeek.csproj" -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 1458
ENTRYPOINT ["dotnet", "DeepSeek.dll"]