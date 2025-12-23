
import { useState } from 'react'
import './App.css'
import jokesData from './data/jokesData.json'

function App() {
  // 🎯 useState for jokes list (start with imported data)
  const [jokes, setJokes] = useState<typeof jokesData>(jokesData)

  // 🎯 useState for current joke
  const [currentJoke, setCurrentJoke] = useState<number>(0)



  // 🎯 useState for new joke form
  const [newJoke, setNewJoke] = useState<string>('')
  const [newRating, setNewRating] = useState<number>(5)

  // Simple functions
  const nextJoke = () => {
    setCurrentJoke((prev) => (prev + 1) % jokes.length)
  }

  const previousJoke = () => {
    setCurrentJoke((prev) => (prev - 1 + jokes.length) % jokes.length)
  }



  // 🎯 Add new joke function
  const addJoke = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newJoke.trim()) {
      const newJokeObj = {
        id: jokes.length + 1,
        joke: newJoke,
        rating: newRating
      }
      setJokes([...jokes, newJokeObj])
      setNewJoke('')
      setNewRating(5)
      setCurrentJoke(jokes.length) // Show the new joke
    }
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '700px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          margin: '0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🎭 Joke App
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
          Current Joke: {currentJoke + 1} of {jokes.length}
        </p>
      </div>

      {/* Joke Display */}
      <div style={{
        background: 'white',
        padding: '30px',
        margin: '20px 0',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        textAlign: 'center'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'inline-block',
          marginBottom: '15px',
          color: '#6c757d',
          fontSize: '0.9rem'
        }}>
          Joke #{jokes[currentJoke].id}
        </div>
        <p style={{
          fontSize: '1.3rem',
          lineHeight: '1.6',
          color: '#333',
          margin: '20px 0',
          fontStyle: 'italic'
        }}>
          "{jokes[currentJoke].joke}"
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
          fontSize: '1.1rem',
          color: '#ff6b35'
        }}>
          {Array.from({ length: Math.min(5, jokes[currentJoke].rating) }, () => '⭐').join('')}
          <span style={{ marginLeft: '10px', color: '#666' }}>
            {jokes[currentJoke].rating}/10
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        textAlign: 'center',
        margin: '30px 0'
      }}>
        <button
          onClick={previousJoke}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer',
            margin: '0 10px',
            transition: 'all 0.3s ease'
          }}
          // onMouseOver={(e) => e.target.style.background = 'white'}
          // onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          ⬅️ Previous
        </button>
        <button
          onClick={nextJoke}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer',
            margin: '0 10px',
            transition: 'all 0.3s ease'
          }}
          // onMouseOver={(e) => e.target.style.background = 'white'}
          // onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          Next ➡️
        </button>
      </div>

      {/* Add New Joke Form */}
      <div style={{
        background: 'white',
        padding: '25px',
        margin: '20px 0',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '1.4rem'
        }}>
          ➕ Add Your Own Joke
        </h3>
        <form onSubmit={addJoke}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: 'bold'
            }}>
              Your Joke:
            </label>
            <textarea
              value={newJoke}
              onChange={(e) => setNewJoke(e.target.value)}
              placeholder="Enter your funny joke here... 😄"
              style={{
                width: '100%',
                height: '100px',
                padding: '12px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: 'bold'
            }}>
              Rating (1-10):
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              style={{
                padding: '10px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '80px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'transform 0.2s ease'
              }}
              // onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              // onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Add Joke 🎭
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default App
