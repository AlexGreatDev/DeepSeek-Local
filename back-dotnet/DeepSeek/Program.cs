var builder = WebApplication.CreateBuilder(args);
var allowedOrigins = builder.Configuration["ALLOWED_ORIGINS"] ?? "http://localhost:3000";
var ollamaUrl = builder.Configuration["OLLAMA_API_BASE_URL"] ?? "http://localhost:11434";
Console.WriteLine($"Allowed Origins: {allowedOrigins}");
builder.Services.AddHttpClient(
    "DeepSeekClient",
    client =>
    {
        client.BaseAddress = new Uri($"{ollamaUrl}/api/");
    }
);
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Allowhost",
        policy => policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()
    );
});
builder.Services.AddControllers();
var app = builder.Build();
app.UseCors("Allowhost");
app.MapGet("/", () => "Hello World!");
app.UseStaticFiles();
app.MapControllers();
app.Run();
