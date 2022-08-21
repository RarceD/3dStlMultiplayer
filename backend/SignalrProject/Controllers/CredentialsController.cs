using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Text.Json.Serialization;
using Polly;
using SignalrProject.Model;

namespace SignalrProject.Controllers;

[ApiController]
[Route("[controller]")]
public class CredentialsController : ControllerBase
{
    private readonly IHubContext<SignalrHub> _hubContext;
    private Quiz _quiz;
    private readonly ILogger<WeatherForecastController> _logger;

    public CredentialsController(ILogger<WeatherForecastController> logger,
        IHubContext<SignalrHub> hub,
        Quiz quiz)
    {
        _logger = logger;
        _hubContext = hub;
        _quiz = quiz;
    }

    [HttpPost]
    public async Task<SuccessResponseDto> AddNewClient(Credentials credentials)
    {
        int id = _quiz.AddPlayer(credentials.Name, credentials.Position);
        SuccessResponseDto success = new(id);
        return success;
    }

    [HttpGet]
    public Task<List<Player>> GetPlayers(int? clear)
    {
        if (clear == null)
        {
            return Task.FromResult(_quiz.Players);
        }
        // Restart the list:
        _quiz.Players = new List<Player>();
        _quiz.GameStatus = Quiz.GameStatusCodes.WaitingPlayers;
        return Task.FromResult(_quiz.Players);
    }
}
