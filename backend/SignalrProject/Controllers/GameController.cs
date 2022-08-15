using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalrProject.Model;

namespace SignalrProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private Quiz _quiz;
        public GameController(Quiz quiz)
        {
            _quiz = quiz;
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
    }
}
