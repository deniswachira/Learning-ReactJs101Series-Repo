
import { useReducer } from 'react';
import './App.css'
import jokesReducer from './reducer/jokeReducer';
import { JokeComponent } from './components/JokeComponent';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

const InitialJokes = [
  {
    id: 1,
    joke: 'What do you call a very small valentine? A valen-tiny!!!',
    rate: 0
  },
  {
    id: 2,
    joke: 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!!!',
    rate: 5
  },
  {
    id: 3,
    joke: "Why don't sharks like to eat clowns? Because they taste funny!!!",
    rate: 10
  }
];

function App() {
  const [jokes, dispatch] = useReducer(jokesReducer, InitialJokes)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const newJokeText = input.value.trim();
    if (newJokeText) {
      const newJoke: Joke = {
        id: Date.now(),
        joke: newJokeText,
        rate: 0
      };
      dispatch({ type: 'ADD_JOKE', newJoke });
      input.value = '';
    }
  }

  const increaseRates = (id: number) => {
    dispatch({ type: 'INCREASE_JOKES_LIKES', id })
  }

  const decreaseRates = (id: number) => {
    dispatch({ type: 'DECREASE_JOKES_LIKES', id })
  }

  //assignment delete joke function here

  return (
    <>
      <div className='container'>
        <h2>Jokes For You 😂</h2>

        <form onSubmit={handleSubmit} className='form'>
          <input type="text" placeholder="Enter your joke" style={{ padding: "12px", marginRight: "10px" }} />
          <button type="submit" className="btn">Add Joke</button>
        </form>
      </div>

      <div className="jokes">
        {
          jokes && jokes.sort((a, b) => b.id - a.id).map((joke: Joke) => (
            <JokeComponent key={joke.id} joke={joke} increaseRates={increaseRates} decreaseRates={decreaseRates} /*deleteJoke={deleteJoke}*/ />
          ))
        }
      </div>
    </>
  )
}

export default App
