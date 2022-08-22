using Microsoft.AspNetCore.SignalR;
public class SignalrHub : Hub
{
    private float _position;

    public SignalrHub()
    {
        _position = 0.0f;
    }
    public async Task SendPosition(int left, int top)
    {
        _position++;
        await Clients.All.SendAsync("ReceivePosition",left, _position);
    }

    public async Task NewMessage(string user, string message)
    {
        Console.WriteLine("user" + user + message);
        await Clients.All.SendAsync("messageReceived", "test2", message);
        await Clients.All.SendAsync("test1", user, message);
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
