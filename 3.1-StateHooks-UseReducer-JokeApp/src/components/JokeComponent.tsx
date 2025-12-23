interface Joke {
    id: number;
    joke: string;
    rate: number;
}



export const JokeComponent = ({ joke, increaseRates, decreaseRates , /* deleteJoke */}: { joke: Joke, increaseRates: (id: number) => void, decreaseRates: (id: number) => void, /* deleteJoke: (id: number) => void */ }) => {
    return (
        <div className="joke">
            <div className="joke-text">{joke.joke}</div>
            <div className="rate">Rating : {joke.rate}</div>
            <div className="joke-buttons">
                <button className="btn btn-sm btn-success"
                    onClick={() => increaseRates(joke.id)}
                >
                    👍
                </button>
                <button className="btn btn-sm btn-danger"
                    onClick={() => decreaseRates(joke.id)}
                >
                    👎
                </button>
                
                {/* Assignment  */}
                {/* button to delete joke can  */}

            </div>
        </div>
    )
}