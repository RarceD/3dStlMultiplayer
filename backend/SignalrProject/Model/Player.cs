﻿namespace SignalrProject.Model
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Position { get; set; }
        public List<QuestionResponse> Responses { get; set; }

        public Player(int id, string name, string position)
        {
            Id = id;
            Name = name;
            Position = position;
            Responses = new List<QuestionResponse>();
        }
    }
}
