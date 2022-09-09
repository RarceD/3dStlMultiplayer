export interface Responses {
    playersResults: PlayerResponses[],
    correctResponse: string
}

export interface PlayerResponses {
    name: string,
    success: boolean
}


export const initResponses = (): Responses => {
    const r: Responses = {correctResponse: "", playersResults: []}
    return r;
}
