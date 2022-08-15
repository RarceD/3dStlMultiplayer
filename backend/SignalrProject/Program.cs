using SignalrProject.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// Quiz data:
builder.Services.AddSingleton<Quiz>();

builder.Services.AddCors(p => p.AddPolicy("*", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
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

app.UseHttpsRedirection();
// app.UseAuthorization();
app.MapControllers();
app.UseRouting();
app.UseCors("*");
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SignalrHub>("/hub"); 
});
app.Run();
