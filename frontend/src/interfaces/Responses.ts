export interface Responses {
    question: string,
    response: string
}

export interface PlayerResponses {
    playerName: string,
    success: boolean
}


export const initResponses = (): Responses => {
    const r: Responses = {question: "", response: ""}
    return r;
}
