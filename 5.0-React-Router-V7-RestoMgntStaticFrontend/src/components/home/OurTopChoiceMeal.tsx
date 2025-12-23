import React from 'react'
import './OurTopChoiceMeal.css'

interface OurTopChoiceMeal {
    menu_item_id: number;
    name: string;
    description: string;
    category_name?: string;
    price: number;
    menuitemimage_url: string;
    is_available: boolean;
}

const OurTopChoiceMeals: OurTopChoiceMeal[] = [
    {
        menu_item_id: 1,
        name: 'Grilled Chicken Salad',
        description: 'A healthy mix of grilled chicken, fresh greens, and a light vinaigrette.',
        price: 12.99,
        category_name: 'Salads',
        menuitemimage_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    },
    {
        menu_item_id: 2,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce, pancetta, and Parmesan cheese.',
        price: 14.99,
        category_name: 'Pasta',
        menuitemimage_url: 'https://images.unsplash.com/photo-1623243020684-9f8bcefe6e94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470',
        is_available: true,
    },
    {
        menu_item_id: 3,
        name: 'Vegan Buddha Bowl',
        description: 'A nourishing bowl of quinoa, roasted veggies, chickpeas, and tahini dressing.',
        price: 11.99,
        category_name: 'Vegan',
        menuitemimage_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    }
]

const OurTopChoiceMeal: React.FC = () => {
    return (
        <section className="top-meals">
            <div className="container">
                <h2 className="section-title">Our Top Choice Meals</h2>
                <p className="section-subtitle">
                    Discover our most loved dishes, carefully crafted with fresh ingredients and authentic flavors
                </p>

                <div className="meals-grid">
                    {OurTopChoiceMeals.map((meal) => (
                        <div key={meal.menu_item_id} className="meal-card">
                            <div className="meal-image">
                                <img src={meal.menuitemimage_url} alt={meal.name} />
                                <div className="meal-category">{meal.category_name}</div>
                            </div>

                            <div className="meal-content">
                                <h3 className="meal-name">{meal.name}</h3>
                                <p className="meal-description">{meal.description}</p>

                                <div className="meal-footer">
                                    <div className="meal-price">${meal.price}</div>
                                    <button className="order-btn">Order Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurTopChoiceMeal