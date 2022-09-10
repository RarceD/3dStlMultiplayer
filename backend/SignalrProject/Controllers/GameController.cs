using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalrProject.Controllers.Dto;
using SignalrProject.Model;
using System.Text.Json;

namespace SignalrProject.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private Quiz _quiz;
        private Timer _timerRepeatTask;
        AutoResetEvent _autoEvent = new AutoResetEvent(false);
        private readonly IHubContext<SignalrHub> _hubContext;

        public GameController(Quiz quiz, IHubContext<SignalrHub> hubContext)
        {
            _quiz = quiz;
            _timerRepeatTask = new Timer(callbackTimer, _autoEvent, 2000, 1000);
            _hubContext = hubContext;
        }
        [HttpPost]
        public async Task<int> GetAnswersPlayers(QuestionResponse resp)
        {
            bool success = _quiz.AddQuizResponse(resp.Id, resp.QuestionId, resp.Response);
            if (!success)
                return 1;
            else
                return 0;
        }

        [HttpGet]
        public async Task<string> StartTheGame()
        {
            // if (id == (int)Quiz.GameStatusCodes.OnGame)
            {
                _quiz.GameStatus = Quiz.GameStatusCodes.OnGame;
            }
            _ = _hubContext.Clients.All.SendAsync("ReceivedMsg", 123, 23);
            return "ok";
        }

        [HttpGet("status")]
        public async Task<int> GetStatusGame()
        {
            return (int)_quiz.GameStatus;
        }

        private void callbackTimer(object? state)
        {
            /*
            GameDto gameStatus = new GameDto();
            var rand = new Random();
            gameStatus.State = rand.Next();
            gameStatus.Id = rand.Next();
            gameStatus.Text = "text" + gameStatus.Id.ToString() + gameStatus.Id.ToString();
            gameStatus.Responses = new List<string>() { gameStatus.Text, "asd", "·$!", "asdfasdfasdf" };
            _ = _hubContext.Clients.All.SendAsync(SignalrHub.GAME_STATUS_ENDPOINT, gameStatus);
            */
        }
    }
}

