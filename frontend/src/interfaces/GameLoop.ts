export interface GameLoop {
    Questions: Questions,
    State: GameState
}

export enum GameState {
    WaitingPlayers = 0,
    OnGame,
    End
}

export interface Questions {
    Id: number,
    Answer: number,
    Responses: string[],
    Text: string
}