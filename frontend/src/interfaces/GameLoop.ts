export interface GameLoop {
    id: number,
    responses: string[],
    text: string,
    time?: number,
    state: GameState
}

export enum GameState {
    WaitingPlayers = 0,
    OnGame,
    Results,
    End
}

export const initState = (): GameLoop => {
    let status: GameLoop = {id: 0, responses: [], text: "", time: 0, state: GameState.WaitingPlayers}
    return status;
}