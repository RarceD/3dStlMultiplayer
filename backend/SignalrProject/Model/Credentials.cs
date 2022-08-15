namespace SignalrProject.Model;

public class Credentials
{
    public string? Name { get; set; }
    public string? Position { get; set; }
}
public class SuccessResponseDto
{
    public SuccessResponseDto(int id)
    {
        Id = id;
    }

    public int Id { get; set; }
}
