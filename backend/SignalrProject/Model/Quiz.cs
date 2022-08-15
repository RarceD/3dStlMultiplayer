using System.Text.Json.Serialization;
using System.Text.Json;

namespace SignalrProject.Model
{
    public class Quiz
    {
        private Question[] _questions;
        private List<Player> _players { get; set; }
        public Quiz()
        {
            _questions = LoadJsonQuestions("Questions/questions.json");
            _players = new List<Player>();
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
