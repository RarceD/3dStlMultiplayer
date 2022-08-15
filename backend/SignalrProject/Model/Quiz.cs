using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;

namespace SignalrProject.Model
{
    public class Quiz
    {
        private Question[] _questions;
        private List<Player> _players { get; set; }
        private Timer _timerRepeatTask;
        AutoResetEvent _autoEvent = new AutoResetEvent(false);
        private readonly IHubContext<SignalrHub> _hubContext;

        public Quiz (IHubContext<SignalrHub> hub)
        {
            _questions = LoadJsonQuestions("Questions/questions.json");
            _players = new List<Player>();
            Player newPlayer = new(1, "ruben", "69");
            _players.Add(newPlayer);
            _timerRepeatTask = new Timer(callbackTimer, _autoEvent, 2000, 1000);
            _hubContext = hub;
        }
        private void callbackTimer(object? state)
        {
            Console.WriteLine("planning stuff task " + DateTime.Now.ToString());
            _hubContext.Clients.All.SendAsync("messageReceived", "test2", DateTime.Now.ToString());
            _autoEvent.Set();
        }
        public int AddPlayer(string name, string position)
        {
            int id = _players.Count();
            Player newPlayer = new(id, name, position);
            _players.Add(newPlayer);
            return id;
        }
        public bool RemovePlayer(int id)
        {
            return false;
        }

        public bool AddQuizResponse(int playerId, int questionId, int response)
        {
            foreach (Player play in _players.Where(p => p.Id == playerId))
            {
                foreach (var q in _questions.Where(qu => qu.Id == questionId && response == qu.Answer))
                {
                    play.SuccessResponses++;
                    return true;
                }
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
            catch(Exception e)
            {
                Console.WriteLine("There is no file, gilipollas");
                Question[] q = new Question[0];
                return q;
            }

        }
    }
}
