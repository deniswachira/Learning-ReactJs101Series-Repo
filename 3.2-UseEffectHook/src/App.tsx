import { useState, useEffect } from 'react'
import './App.css'

interface Joke {
  type: string
  setup: string
  punchline: string
  id: number
}

function App() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)

  // 🎯 useEffect to fetch joke data
  const fetchJoke = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      const data = await response.json()
      setJoke(data)
    } catch (error) {
      console.error('Error fetching joke:', error)
    } finally {
      setLoading(false)
    }
  }
  
  
  useEffect(() => {
    fetchJoke() // Fetch initial joke on mount
  }, [])

  return (
    <div >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3> 😂 useEffect Joke App </h3>
        <p > Fresh jokes with every fetch! </p>
      </div>

      {/* Joke Card */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        {loading ? (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⏳</div>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>Loading a fresh joke...</p>
          </div>
        ) : joke ? (
          <div>
            <div>🎭</div>
            <p style={{ color: '#333',  marginBottom: '15px',  lineHeight: '1.5'      }}>
              {joke.setup}
            </p>
            <p style={{ fontSize: '1.1rem', color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold' }}>
              {joke.punchline} 😄
            </p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>❌</div>
            <p style={{ color: '#666' }}>Oops! Failed to load joke</p>
          </div>
        )}
      </div>

      {/* Get New Joke Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={fetchJoke}
          disabled={loading}
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor:  'pointer',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            fontWeight: 'bold'
          }}
         
        >
          {loading ? '⏳ Loading...' : '🎲 Get New Joke!'}
        </button>
      </div>

      {/* Learning Note */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '15px',
        borderRadius: '10px',
        marginTop: '20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <p style={{ margin: '0', fontSize: '0.9rem' }}>
          💡 <strong>useEffect Demo:</strong> Watch the network tab to see API calls!
        </p>
      </div>
    </div>
  )
}

export default App
