import React from 'react'
import './HomeHero.css'
import homehero from '../../assets/hero-homw-pic.jpg';

const HomeHero: React.FC = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Welcome to Mathe's EATERY</h1>
                <p>Experience authentic flavors and fresh ingredients crafted with love</p>
                <button className="hero-btn">Explore Our Meals</button>
            </div>
            <div className="hero-image">
                <img
                    src='https://images.unsplash.com/photo-1703945530456-22774e1412bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjIyfHxjb29rfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500'
                    alt="Chef preparing food"
                />
            </div>
        </div>
    )
}

export default HomeHero