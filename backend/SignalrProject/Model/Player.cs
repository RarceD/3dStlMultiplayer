namespace SignalrProject.Model
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Position { get; set; }
        public int SuccessResponses { get; set; }

        public Player(int id, string name, string position)
        {
            Id = id;
            Name = name;
            Position = position;
            SuccessResponses = 0;
        }
    }
}
