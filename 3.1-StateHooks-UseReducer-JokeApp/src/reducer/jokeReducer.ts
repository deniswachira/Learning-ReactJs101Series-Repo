interface Joke {
    id: number;
    joke: string;
    rate: number;
}


type JokeAction =
    | { type: 'ADD_JOKE'; newJoke: Joke }
    | { type: 'INCREASE_JOKES_LIKES'; id: number }
    | { type: 'DECREASE_JOKES_LIKES'; id: number }
    // | { type: 'DELETE_JOKE'; id: number }  // Assignment
    

const jokesReducer = (jokes: Joke[], action: JokeAction): Joke[] => {
    switch (action.type) {
        case 'ADD_JOKE':
            return [...jokes, action.newJoke]

        case 'INCREASE_JOKES_LIKES':
            return jokes.map((joke) => {
                if (joke.id == action.id) {
                    return { ...joke, rate: joke.rate + 1 }
                } else {
                    return joke;
                }
            })
        case 'DECREASE_JOKES_LIKES':
            return jokes.map((joke) => {
                if (joke.id == action.id) {
                    return { ...joke, rate: joke.rate - 1 }
                } else {
                    return joke;
                }
            })
        // case 'DELETE_JOKE':   // Assignment
        default:
            return jokes;

    }

}
export default jokesReducer;