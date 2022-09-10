﻿using System.Text.Json;
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
            Questions = LoadJsonQuestions("Questions/questions_real.json");
            if (Questions.Length > 0)
                Questions.ElementAt(0).Active = true;
            Players = new List<Player>();
            _timerRepeatTask = new Timer(callbackTimer, _autoEvent, 2000, 1000);
            SignalrHub = signalrHub;
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
                GameStatus = GameStatusCodes.OnGame;
                _counterTime = _maxTimeAtQuestions;
            }
        }
        private void HandleEnd()
        {

        }
        private void HandleOnGame()
        {
            if (_counterTime-- <= 0)
            {
                Console.WriteLine("restart timer");
                _counterTime = _maxTimeAtQuestions;
                // Update question:
                int index = Questions.ToList().FindIndex(a => a.Active == true);
                if (index <= Questions.Length - 2)
                {
                    Questions.ElementAt(index).Active = false;
                    Questions.ElementAt(index + 1).Active = true;
                    GameStatus = GameStatusCodes.Results;
                    _counterTime = _maxTimeAtResults;
                    SendNewQuestion(index);

                }
                else
                {
                    GameStatus = GameStatusCodes.End;
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
        private void SendNewQuestion(int index)
        {
            GameDto gameStatus = new GameDto();
            gameStatus.State = 1; //(int)GameStatus+1;
            gameStatus.Id = Questions[index].Id;
            gameStatus.Text = Questions[index].Text;
            gameStatus.Responses = new List<string>();
            gameStatus.Responses = Questions[index].Responses;
            _ = SignalrHub.Clients.All.SendAsync(SignalrHub.GAME_STATUS_ENDPOINT, gameStatus);
        }

        public bool AddQuizResponse(int playerId, int questionId, int response)
        {
            foreach (Player play in Players.Where(p => p.Id == playerId))
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
            catch (Exception e)
            {
                Console.WriteLine("There is no file, gilipollas");
                Question[] q = new Question[0];
                return q;
            }

        }
    }
}

