
import { Provider } from 'react-redux'
// import './App.css'
import { store } from './app/store'
import Counter from './components/Counter'
import MoodChanger from './components/MoodChanger'

function App() {

  return (
    <Provider store={store}>
      <Counter />
      <hr />
      <MoodChanger />
    </Provider>
  )
}

export default App
