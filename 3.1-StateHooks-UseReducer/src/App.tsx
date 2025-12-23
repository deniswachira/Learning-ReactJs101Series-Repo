
import { useReducer } from 'react'
// import counterReducer from './reducer/counterReducer'
// import moodReducer from './reducer/moodReducer'
import './App.css'



// 🎯 Step 3: Create the Reducer Function
function counterReducer(state: number, action: { type: string }): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

//mood changer renducer function
function moodReducer(state: string, action: { type: string }): string {
  switch (action.type) {
    case 'HAPPY':
      return '😊';
    case 'EXCITED':
      return '🤩';
    case 'CALM':
      return '😌';
    case 'SAD':
      return '😢';
    case 'ANGRY':
      return '😠';
    default:
      return state;
  }
}

// 🎯 Step 4: Initial State
const initialState = 0

function App() {
  // 🎯 Step 5: Use the useReducer Hook
  const [state, dispatch] = useReducer(counterReducer, initialState)

  //useReducer for mood
  const [mood, setMood] = useReducer(moodReducer, '😊')

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
        minHeight: '100vh'
      }}>
      <h3 > 🔢 useReducer Count Hook Demo </h3>

      {/* Counter Display */}
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Counter Value: {state}</h2>
      {/* Controls */}
      <div style={{
        textAlign: 'center',
        marginBottom: '25px'
      }}>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          ➖ Decrease
        </button>

        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
          ➕ Increase
        </button>

        <button onClick={() => dispatch({ type: 'RESET' })}>
          🔄 Reset
        </button>
      </div>

      <h3 > 🔢 useReducer Mood Hook Demo </h3>
      {/* //mood display and controls */}
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Current Mood: {mood}</h2>
      <div style={{
        textAlign: 'center',
        marginBottom: '25px'
      }}>
        <button onClick={() => setMood({ type: 'HAPPY' })}>
          😊 Happy
        </button>

        <button onClick={() => setMood({ type: 'EXCITED' })}>
          🤩 Excited
        </button>

        <button onClick={() => setMood({ type: 'CALM' })}>
          😌 Calm
        </button>

        <button onClick={() => setMood({ type: 'SAD' })}>
          😢 Sad
        </button>

        <button onClick={() => setMood({ type: 'ANGRY' })}>
          😠 Angry
        </button>
      </div>


      {/* Educational Info */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        margin: '20px 0',
        borderRadius: '15px',
        color: 'white'
      }}>
        <h3 style={{ marginBottom: '15px' }}>🎓 Learning Points:</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>useReducer</strong> - Better for complex state logic</li>
          <li><strong>Actions</strong> - Describe what happened</li>
          <li><strong>Reducer</strong> - Pure function that returns new state</li>
          <li><strong>Dispatch</strong> - Triggers state updates</li>
          <li><strong>Type Safety</strong> - TypeScript ensures correct actions</li>
        </ul>
      </div>

      {/* vs useState Comparison */}
      <div style={{
        background: 'white',
        padding: '20px',
        margin: '20px 0',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>⚖️ useReducer vs useState</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#74b9ff' }}>Use useReducer when:</h4>
            <ul style={{ color: '#666' }}>
              <li>Complex state logic</li>
              <li>Multiple related state values</li>
              <li>State depends on previous state</li>
              <li>Need predictable state updates</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#00b894' }}>Use useState when:</h4>
            <ul style={{ color: '#666' }}>
              <li>Simple state values</li>
              <li>Independent state updates</li>
              <li>Quick prototyping</li>
              <li>Minimal state logic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
