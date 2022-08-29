namespace SignalrProject.Controllers.Dto
{
    public class WeddingMsgDto
    {
        public WeddingMsgDto(int id, string msg)
        {
            Id = id;
            Msg = msg;
        }

        public int Id { get; set; }
        public string Msg { get; set; }
    }
    public class WeddingMsgReceived
    {
        public WeddingMsgReceived(string msg)
        {
            Msg = msg;
        }
        public string Msg { get; set; }
    }
}
