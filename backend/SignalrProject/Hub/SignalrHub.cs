using Microsoft.AspNetCore.SignalR;
using SignalrProject.Controllers.Dto;

public class SignalrHub : Hub
{
    private float _position;
    private static readonly string LOCATION_ENDPOINT = "locationBackendSend";
    private static readonly string GAME_STATUS_ENDPOINT = "gameStatusBackendSend";
        

    public SignalrHub()
    {
        _position = 0.0f;
    }
    public async Task SendPosition(float x, float y, float z)
    {
        var msg = x.ToString() + ";" + y.ToString() + ";" + z.ToString();
        await Clients.All.SendAsync(LOCATION_ENDPOINT, msg);
    }

    public async Task NewMessage(string user, string message)
    {
        // Received location from user:
        Console.WriteLine("user" + user + message);
        var pos = message.Split(";");

        // Return back to all users the locations:
        await Clients.All.SendAsync(LOCATION_ENDPOINT, message);

        // delete when finish:
        GameDto gameStatus = new GameDto();
        gameStatus.State = 10;
        await Clients.All.SendAsync(GAME_STATUS_ENDPOINT, gameStatus);
        //_ = SendPosition(float.Parse(pos[0]), float.Parse(pos[1]), float.Parse(pos[2]));
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine("OnDisconnect");
        await base.OnDisconnectedAsync(exception);
    }
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine("OnConnect");
        await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
        await base.OnConnectedAsync();
    }
}
