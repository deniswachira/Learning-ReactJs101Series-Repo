import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 🧩 Import all our components from the components folder
import Superhero from './components/Superhero'
import PizzaCard from './components/PizzaCard'
import SongCard from './components/SongCard'
import StarRating from './components/StarRating'
import Card from './components/Card'
import StudentCard from './components/StudentCard'

function App() {
  // Function to handle rating clicks
  const handleRatingClick = (rating: number) => {
    alert(`You clicked ${rating} stars! ⭐`)
  }

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}

      <h1>🧩 Components & Props Masterclass!</h1>

      {/* Using Card component with children */}
      <Card title="🦸‍♂️ Superhero Gallery" backgroundColor="#e3f2fd">
        <Superhero name="Spider-Man" power="Web-slinging" color="#e53e3e" age={23} />
        <Superhero name="Wonder Woman" power="Super strength" color="#d53f8c" />
        <Superhero name="Black Panther" power="Vibranium suit" color="#2d3748" age={35} />
      </Card>

      <Card title="🍕 Pizza Menu" backgroundColor="#fff5f5">
        <PizzaCard
          name="Margherita"
          toppings={['Tomato sauce', 'Mozzarella', 'Basil']}
          price={12.99}
          isVegetarian={true}
          size="Medium"
        />
        <PizzaCard
          name="Meat Lovers"
          toppings={['Pepperoni', 'Sausage', 'Ham', 'Bacon']}
          price={18.99}
          isVegetarian={false}
          size="Large"
        />
        <PizzaCard
          name="Veggie Supreme"
          toppings={['Mushrooms', 'Bell peppers', 'Olives', 'Onions']}
          price={15.99}
          isVegetarian={true}
          size="Large"
        />
      </Card>

      <Card title="🎵 Music Library" backgroundColor="#f0fffe">
        <SongCard
          title="Bohemian Rhapsody"
          artist={{ name: "Queen", country: "UK" }}
          duration="5:55"
          genre="Rock"
          releaseYear={1975}
        />
        <SongCard
          title="Billie Jean"
          artist={{ name: "Michael Jackson", country: "USA" }}
          duration="4:54"
          genre="Pop"
          releaseYear={1983}
        />
        <SongCard
          title="Hotel California"
          artist={{ name: "Eagles", country: "USA" }}
          duration="6:30"
          genre="Rock"
          releaseYear={1976}
        />
      </Card>

      <Card title="⭐ Interactive Rating" backgroundColor="#fffbf0">
        <p>Click the stars to rate!</p>
        <StarRating rating={3} onRatingClick={handleRatingClick} />
        <StarRating rating={5} maxRating={10} onRatingClick={handleRatingClick} />
      </Card>

      <Card title="🎓 Student Directory" backgroundColor="#f8f6ff">
        <StudentCard
          name="Alice Johnson"
          grade="A+"
          favoriteSubject="Computer Science"
          hobbies={['Coding', 'Gaming', 'Reading']}
          emoji="💻"
        />
        <StudentCard
          name="Bob Smith"
          grade="B+"
          favoriteSubject="Mathematics"
          hobbies={['Sports', 'Music']}
          emoji="🏀"
        />
        <StudentCard
          name="Charlie Brown"
          grade="A"
          favoriteSubject="Art"
        // Using default hobbies and emoji
        />
      </Card>

      <Card title="🎮 Your Mission" backgroundColor="#fff3cd">
        <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <h3>🧩 Component Organization:</h3>
          <p>Check out the <code>src/components/</code> folder! Each component has its own file:</p>
          <ul>
            <li>📁 <code>Superhero.tsx</code> - TypeScript interfaces & optional props</li>
            <li>📁 <code>PizzaCard.tsx</code> - Arrays, booleans & union types</li>
            <li>📁 <code>SongCard.tsx</code> - Object props & nested data</li>
            <li>📁 <code>StarRating.tsx</code> - Function props & events</li>
            <li>📁 <code>Card.tsx</code> - Children props & composition</li>
            <li>📁 <code>StudentCard.tsx</code> - Default props & fallbacks</li>
          </ul>

          <h3>Try these challenges:</h3>
          <ul>
            <li>🎯 Add a new superhero in a new component file</li>
            <li>🍕 Create your own pizza with unique toppings</li>
            <li>🎵 Add your favorite song to the music library</li>
            <li>🎓 Add yourself as a student</li>
            <li>⭐ Create a movie rating component</li>
            <li>🆕 Create a completely new component type!</li>
            <li>📁 Try moving components between files</li>
          </ul>
          <p><strong>Remember:</strong> Each component is reusable and well-organized! 🔄</p>
        </div>
      </Card>

      <p className="read-the-docs">
        🚀 You're becoming a Component Master! Keep experimenting with the components folder!
      </p>
    </>
  )
}

export default App
