import { useState } from 'react'
import './App.css'

function App() {
  // 🎯 State for counter
  const [count, setCount] = useState<number>(0)

  // 🎨 State for mood
  const [mood, setMood] = useState<string>('😐')

  // 🌈 State for background color
  const [bgColor, setBgColor] = useState<string>('#f0f8ff')

  // 🎭 State for username
  const [username, setUsername] = useState<string>('')

  // 🎪 State for show/hide magic box
  const [showMagicBox, setShowMagicBox] = useState<boolean>(false)

  // 🎭 Mood changer function
  const changeMood = () => {
    const moods = ['😐', '😊', '😄', '🤩', '🥳', '😎', '🤗', '😴']
    const randomMood = moods[Math.floor(Math.random() * moods.length)]
    setMood(randomMood)
  }

  // 🌈 Color changer function
  // const changeBackgroundColor = () => {
  //   const colors = ['#f0f8ff', '#ffe4e1', '#f0fff0', '#fff8dc', '#e6e6fa', '#ffefd5']
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)]
  //   setBgColor(randomColor)
  // }

  return (
    <div style={{
      backgroundColor: bgColor,
      minHeight: '100vh',
      padding: '20px',
      transition: 'background-color 0.5s ease'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <h1>🎪 useState Hook Playground</h1>

        {/* 📚 Learning Section */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          color: '#333'

        }}>
          <h3>📚 What is useState?</h3>
          <ul>
            <li><strong>State</strong> - Data that can change over time</li>
            <li><strong>useState</strong> - React Hook to manage state</li>
            <li><strong>Returns</strong> - [currentValue, setterFunction]</li>
            <li><strong>Re-renders</strong> - Component updates when state changes</li>
          </ul>
        </div>

        {/* 🎯 Counter Example */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>🎯 Example 1: Simple Counter</h3>
          <p>Current count: <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>{count}</span></p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCount(count + 1)}
              style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
            >
              ➕ Add 1
            </button>
            <button
              onClick={() => setCount(count - 1)}
              style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
            >
              ➖ Subtract 1
            </button>
            <button
              onClick={() => setCount(0)}
              style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
            >
              🔄 Reset
            </button>
            <button
              onClick={() => setCount(count * 2)}
              style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
            >
              ✖️ Double it!
            </button>
          </div>
        </div>

        {/* 🎭 Mood Changer */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>🎭 Example 2: Mood Changer</h3>
          <p>Current mood: <span style={{ fontSize: '4rem' }}>{mood}</span></p>
          <button
            onClick={changeMood}
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              backgroundColor: '#4ecdc4',
              color: 'white',
              border: 'none',
              borderRadius: '25px'
            }}
          >
            🎲 Change My Mood!
          </button>
        </div>

        {/* 🌈 Background Color Changer */}
        {/* <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>🌈 Example 3: Background Color Magic</h3>
          <p>Watch the background change! Current color: <strong>{bgColor}</strong></p>
          <button
            onClick={changeBackgroundColor}
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '25px'
            }}
          >
            🎨 Change Background!
          </button>
        </div> */}

        {/* 🎭 Text Input Example */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          color: '#333',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>🎭 Example 4: Dynamic Text</h3>
          <input
            type="text"
            placeholder="Type your name here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '2px solid #ddd',
              marginRight: '10px',
              width: '200px'
            }}
          />
          <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>
            {username ? `Hello, ${username}! 👋` : 'Type your name to see the magic! ✨'}
          </p>
        </div>

        {/* 🎪 Show/Hide Magic Box */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>🎪 Example 5: Magic Show/Hide Box</h3>
          <button
            onClick={() => setShowMagicBox(!showMagicBox)}
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              backgroundColor: '#9b59b6',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              marginBottom: '15px'
            }}
          >
            {showMagicBox ? '🙈 Hide Magic Box' : '🎁 Show Magic Box'}
          </button>

          {showMagicBox && (
            <div style={{
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              padding: '20px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-in'
            }}>
              🎉 Surprise! This is conditional rendering with useState! 🎉
              <br />
              <span style={{ fontSize: '3rem' }}>🪄✨🎪✨🪄</span>
            </div>
          )}
        </div>       

      </div>
    </div>
  )
}

export default App
