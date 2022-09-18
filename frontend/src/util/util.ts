export const URL_REQUEST: string = "https://localhost:44359/";
//export const URL_REQUEST: string = "http://151.80.56.216:5400/";
// export const URL_REQUEST: string = "https://www.meapunto.online/api/";


export const setLocalStorage = (): number => {
    let questionIndex: number = 0;
    let local: null | string = localStorage.getItem('question');
    // Check if exist:
    if (local === null) {
        // If not I set first question:
        console.log("No existe lo creo");
    }
    else {
        // I increase the last one
        questionIndex = Number(local) + 1;
        if (questionIndex > 19) 
            questionIndex = 0;
    }
    localStorage.setItem('question', questionIndex.toString());
    return questionIndex;
}