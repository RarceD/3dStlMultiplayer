namespace SignalrProject.Controllers.Dto
{
    public class BullingResponseDto
    {
        public enum Reward {
            NO_REWARD = 0,
            GUMMY,
            SHOT,
            TWO_SHOTS
        }
        public string SuccessWord { get; set; }
        public Reward ResponseType { get; set; }
    }
}
