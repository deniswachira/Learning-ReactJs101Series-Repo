import React from 'react'
import './WhatYouWillGet.css'

const WhatYouWillGet: React.FC = () => {
    return (
        <section className="what-you-get">
            <div className="container">
                <h2 className="section-title">What you'll get at Mathe's EATERY</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🍽️</div>
                        <h3>Authentic dishes</h3>
                        <p>Each meal is prepared with traditional recipes and fresh, locally-sourced ingredients.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Quick service</h3>
                        <p>All orders are designed to be served quickly without compromising on quality and taste.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Easy ordering</h3>
                        <p>Browse our menu and place your order in seconds with our simple and intuitive system.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhatYouWillGet