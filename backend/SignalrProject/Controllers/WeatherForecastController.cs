using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Text.Json.Serialization;
using Polly;
using SignalrProject.Model;

namespace SignalrProject.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly IHubContext<SignalrHub> _hubContext;
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IHubContext<SignalrHub> hub )
    {
        _logger = logger;
        _hubContext = hub;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        _logger.LogDebug("test");
        // I just want to retry something
        var msg = JsonSerializer.Serialize(new WeatherForecast
        {
            Date = DateTime.Now,
            Summary = Summaries[0],
            TemperatureC = 123
        });
        // _hubContext.Clients.All.SendAsync("messageReceived", "test2", msg);
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
