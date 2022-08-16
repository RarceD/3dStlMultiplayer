﻿using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;

namespace SignalrProject.Model
{
    public class Quiz
    {
        public Question[] Questions{ get; set; }
        private List<Player> _players { get; set; }
        private Timer _timerRepeatTask;
        private AutoResetEvent _autoEvent = new AutoResetEvent(false);
        public enum GameStatusCodes
        {
            WaitingPlayers = 0,
            OnGame,
            End
        }
        public GameStatusCodes GameStatus = GameStatusCodes.WaitingPlayers;

        public Quiz()
        {
            Questions = LoadJsonQuestions("Questions/questions.json");
            _players = new List<Player>();
            Player newPlayer = new(1, "ruben", "69");
            _players.Add(newPlayer);
            _timerRepeatTask = new Timer(callbackTimer, _autoEvent, 2000, 1000);
        }
        private void callbackTimer(object? state)
        {
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
                foreach (var q in Questions.Where(qu => qu.Id == questionId && response == qu.Answer))
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