namespace SignalrProject.Model
{
    public class Question
    {
        public Question(int id, string text)
        {
            Id = id;
            Text = text;
            Responses = new List<string>();
        }
        public int Id { set; get; }
        public string Text { set; get; }
        public List<string> Responses { set; get; }
        public int Answer { set; get; }

    }
}
