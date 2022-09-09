namespace SignalrProject.Controllers.Dto
{
    public class ResultsDto
    {
        public List<ResultsPlayerDto> PlayersResults { get; set; }
        public string CorrectResponse { get; set; }
    }
    public class ResultsPlayerDto
    {
        public string PlayerName { get; set; }
        public bool Success { get; set; }
    }
}
