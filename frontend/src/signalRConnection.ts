import * as signalR from "@microsoft/signalr";
const URL = process.env.HUB_ADDRESS ?? "https://localhost:7243/hub"; //or whatever your backend port is
export default class Connector {
    private connection: signalR.HubConnection;
    // public events: (onMessageReceived: (username: string, message: string) => void) => void;
    public events: (onMessageReceived: (username: string, message: string) => void,
        onSomeOtherServerEventReceived: (payload: any) => void
    ) => void;

    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        // this.events = (onMessageReceived) => {
        //     this.connection.on("messageReceived", (username, message) => {
        //         onMessageReceived(username, message);
        //     });
        // };
        this.events = (onMessageReceived, onSomeOtherServerEventReceived) => {
            this.connection.on("messageReceived", (username, message) => {
                onMessageReceived(username, message);
            });
            this.connection.on("somethingDefinedOnServer", (payload) => {
                onSomeOtherServerEventReceived(payload);
            });
        };
    }
    public newMessage = (messages: string) => {
        this.connection.send("newMessage", "foo", messages).then(x => console.log("sent"))
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}