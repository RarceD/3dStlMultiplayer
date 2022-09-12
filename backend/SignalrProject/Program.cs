using SignalrProject.DB;
using SignalrProject.Model;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(p => p.AddPolicy("*", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddSingleton<Bulling>();
DbClients d = new DbClients();
builder.Services.AddSingleton<DbClients>(d);
DbBulling b = new DbBulling();
builder.Services.AddSingleton<DbBulling>(b);

SignalrHub signalrHub = new SignalrHub();
builder.Services.AddSingleton<SignalrHub>(signalrHub);
// Quiz data:
var q = new Quiz(signalrHub);
builder.Services.AddSingleton<Quiz>(q);

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed(_ => true)
                .AllowCredentials()
            );
}

// app.UseHttpsRedirection();
// app.UseAuthorization();
app.MapControllers();
app.UseRouting();
app.UseCors(builder => builder
               .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed(_ => true)
                .AllowCredentials()
            );
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SignalrHub>("/hub");
});
app.Run();
