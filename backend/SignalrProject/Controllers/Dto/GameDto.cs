using SignalrProject.Model;

namespace SignalrProject.Controllers.Dto
{
    public class GameDto
    {
        public List<Question> Questions { get; set; }
        public int State { get; set; }

        public GameDto()
        {
            State = (int)Quiz.GameStatusCodes.WaitingPlayers;
            Questions = new List<Question>();
        }

        public GameDto ParseQuiz(Quiz quiz)
        {
            State = (int)quiz.GameStatus;
            Questions = quiz.Questions.ToList();
            return this;
        }
    }
}
