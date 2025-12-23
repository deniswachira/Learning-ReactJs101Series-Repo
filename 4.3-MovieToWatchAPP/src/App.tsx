import { Provider } from 'react-redux';
import { store } from './app/store';
import MovieToWatch from './components/MovieToWatch';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MovieToWatch />
      </div>
    </Provider>
  );
}

export default App;
