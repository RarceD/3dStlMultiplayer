using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using SignalrProject.Controllers.Dto;

namespace SignalrProject.Model
{
    public class Quiz
    {
        public Question[] Questions { get; set; }
        public List<Player> Players { get; set; }
        public SignalrHub SignalrHub { get; }

        // Time at questions: 
        private static int _maxTimeAtResults = 5;
        private static int _maxTimeAtQuestions = 5;
        private int _counterTime = _maxTimeAtQuestions;

        // Timers to control it:
        private Timer _timerRepeatTask;
        private AutoResetEvent _autoEvent = new AutoResetEvent(false);
        public enum GameStatusCodes
        {
            WaitingPlayers = 0,
            OnGame,
            Results,
            End
        }
        public GameStatusCodes GameStatus = GameStatusCodes.WaitingPlayers;

        public Quiz(SignalrHub signalrHub)
        {
            LoadQuestionsFromFile();
            Players = new List<Player>();
            _timerRepeatTask = new Timer(callbackTimer, _autoEvent, 2000, 1000);
            SignalrHub = signalrHub;
        }
        private void LoadQuestionsFromFile()
        {
            Questions = LoadJsonQuestions("Questions/questions_real.json");
            //Questions = LoadJsonQuestions("Questions/questions.json");
            if (Questions.Length > 0)
                Questions.ElementAt(0).Active = true;
        }

        private void callbackTimer(object? state)
        {
            Console.WriteLine("timer");
            switch (GameStatus)
            {
                case GameStatusCodes.WaitingPlayers:
                    HandleWaitingPlayers();
                    break;
                case GameStatusCodes.OnGame:
                    HandleOnGame();
                    break;
                case GameStatusCodes.Results:
                    HandleResults();
                    break;
                case GameStatusCodes.End:
                    HandleEnd();
                    break;
                default:
                    break;
            }
            _autoEvent.Set();
        }
        private void HandleWaitingPlayers()
        {

        }
        private void HandleResults()
        {

            if (_counterTime-- <= 0)
            {
                // GameStatus = GameStatusCodes.OnGame;
                //_counterTime = _maxTimeAtQuestions;
                //GameStatus = GameStatusCodes.OnGame;
                //SendResults();
                SendNewQuestion(0, 0);
            }
        }
        private void HandleEnd()
        {

        }
        private void HandleOnGame()
        {

            int active = Questions.ToList().FindIndex(a => a.Active == true);
            SendNewQuestion(active, _counterTime);
            if (_counterTime-- <= 0)
            {
                Console.WriteLine("restart timer");
                _counterTime = _maxTimeAtQuestions;
                // Update question:
                int index = Questions.ToList().FindIndex(a => a.Active == true);
                if (index <= Questions.Length - 2)
                {
                    //GameStatus = GameStatusCodes.Results;
                    //SendResults(index);
                    Questions.ElementAt(index).Active = false;
                    Questions.ElementAt(index + 1).Active = true;
                    SendNewQuestion(index, _counterTime);
                    _counterTime = _maxTimeAtResults;
                    // SendNewQuestion(index, _counterTime);

                }
                else
                {
                    // Vamos al estado de visualizar resultados:
                    GameStatus = GameStatusCodes.Results;
                    SendNewQuestion(index, _counterTime);
                    _counterTime = _maxTimeAtResults;
                    // LoadQuestionsFromFile();
                    // GameStatus = GameStatusCodes.End;
                    //foreach (var item in Questions)
                    //item.Active = false;
                    // Restart the game
                    //Questions[0].Active = true;
                }
            }
        }
        public int AddPlayer(string name, string position)
        {
            int id = Players.Count();
            Player newPlayer = new(id, name, position);
            Players.Add(newPlayer);
            return id;
        }
        public bool RemovePlayer(int id)
        {
            return false;
        }
        private void SendNewQuestion(int index, int time)
        {
            GameDto gameStatus = new GameDto();
            gameStatus.State = (int)GameStatus;
            gameStatus.Id = Questions[index].Id;
            gameStatus.Time = time;
            gameStatus.Text = Questions[index].Text;
            gameStatus.Responses = new List<string>();
            gameStatus.Responses = Questions[index].Responses;
            _ = SignalrHub.Clients.All.SendAsync(SignalrHub.GAME_STATUS_ENDPOINT, gameStatus);
        }
        private void SendResults()
        {
            /*
            ResultsDto results = new ResultsDto();
            results.CorrectResponse = " nop ";// Questions[index].Text;
            results.PlayersResults = new List<ResultsPlayerDto>();

            foreach (var r in Players)
            {
                var a = new ResultsPlayerDto();
                a.PlayerName = r.Name;
                a.Success = r.SuccessResponses > 0 ? true : false;
                results.PlayersResults.Add(a);
            }

            for (var i = 0; i < 11; i++)
            {
                var a = new ResultsPlayerDto();
                a.PlayerName = "test";
                a.Success = false;
                results.PlayersResults.Add(a);
            }

            _ = SignalrHub.Clients.All.SendAsync(SignalrHub.GAME_STATUS_ENDPOINT, results);
            */
        }

        public bool AddQuizResponse(QuestionResponse resp)
        {
            foreach (Player play in Players.Where(p => p.Id == resp.Id))
            {
                if (!play.Responses.Where(i => i.QuestionId == resp.QuestionId).Any())
                    play.Responses.Add(resp);
                /*
                foreach (var q in Questions.Where(qu => qu.Id == resp.QuestionId && qu.Answer == resp.Response))
                {
                    play.SuccessResponses++;
                    return true;
                }
                */
            }
            return false;
        }

        private static Question[] LoadJsonQuestions(string path)
        {
            try
            {
                string jsonString = File.ReadAllText(path);
                Question[] q = JsonSerializer.Deserialize<Question[]>(jsonString)!;
                return q;
            }
            catch (Exception e)
            {
                Console.WriteLine("There is no file, gilipollas");
                Question[] q = new Question[0];
                return q;
            }

        }
        public void RestartGame()
        {
            GameStatus = GameStatusCodes.OnGame;
            foreach (var q in Questions)
            {
                q.Active = false;
            }
            Questions[0].Active = true;
        }
        public List<ResultsDto> GetResults()
        {
            List<ResultsDto> results = new List<ResultsDto>();
            foreach (var q in Questions)
            {
                try
                {
                    var r = new ResultsDto();
                    r.Question = q.Text;
                    int index = q.Answer;
                    r.Response = index <= 3 ? q.Responses[index] : "Error";
                    r.PlayersResults = Players;
                    r.NumberSuccessResponses = 0;
                    foreach (var p in Players)
                    {
                        foreach(var re in p.Responses)
                        {
                            if (re.QuestionId == q.Id)
                            {
                                if (re.Response == q.Answer)
                                {
                                    r.NumberSuccessResponses++;
                                }
                            }
                        }
                    }
                    results.Add(r);
                }
                catch (Exception e)
                {
                    return results;
                }
            }
            return results;
        }
    }
}

