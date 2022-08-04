using Microsoft.AspNetCore.SignalR;
public class SignalrHub : Hub
{
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
