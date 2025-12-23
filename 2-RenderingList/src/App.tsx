
import './App.css'
import Joke from './components/Joke'
import Card from './components/Card'
import jokesData from './data/jokesData.json'

function App() {

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>

      <h2>🎭 Learning React List Rendering</h2>
      <Card title="📚 What we're learning" backgroundColor="#f8f9fa">
        <ul style={{ color: '#333' }}>
          <li><strong>Array.map()</strong> - Turn arrays into components</li>
          <li><strong>Keys</strong> - Help React track list items</li>
          <li><strong>Props</strong> - Pass data to each component</li>
          <li><strong>Children</strong> - Pass components inside other components</li>
        </ul>
      </Card>

      <Card title={`🎪 Our Joke Collection (${jokesData.length} jokes)`} backgroundColor="#fff5f5">
        <div style={{
          display: 'grid',
          gap: '15px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {jokesData.map((joke) => (
            <Joke
              key={joke.id}
              id={joke.id}
              joke={joke.joke}
              rating={joke.rating}
            />
          ))}
        </div>
      </Card>

      <Card title="🎯 Try this yourself" backgroundColor="#e3f2fd ">
        <ol style={{  color: '#333',}}>
          <li>Look at the <code>jokesData.json</code> file to see our data</li>
          <li>Check how we use <code>.map()</code> to create Joke components</li>
          <li>Notice the <code>key=&#123;joke.id&#125;</code> - this is important!</li>
          <li>See how we pass <code>joke</code> and <code>rating</code> as props</li>
          <li><strong>NEW:</strong> See how we use <code>Card</code> with children! 🎁</li>
        </ol>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '8px'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>🎁 Children Pattern Example:</h4>
          <code style={{
            display: 'block',
            background: '#f5f5f5',
            color: '#333',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '0.9rem'
          }}>
            {`<Card title="My Title">
  <p>This content is passed as children!</p>
  <button>Any JSX can go here!</button>
</Card>`}
          </code>
        </div>
      </Card>
    </div>
  )
}

export default App
