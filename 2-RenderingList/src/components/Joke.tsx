interface JokeProps {
    rating: number;
    joke: string;
    id: number;
}

const Joke = ({ rating, joke, id }: JokeProps) => {

    function getEmojiForRating(rating: number) {
        if (rating >= 8) return "😂";
        if (rating >= 5) return "😄";
        if (rating >= 3) return "😊";
        return "😐";
    }

    return (
        <div style={{ border: '2px solid #ddd',borderRadius: '10px',   padding: '20px', margin: '10px 0',            color: '#333',         backgroundColor: '#f9f9f9'
        }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>
                Joke #{id}
            </div>

            <p style={{  fontSize: '1.1rem',   lineHeight: '1.5',   margin: '0 0 15px 0'         }}>
                "{joke}"
            </p>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{ fontSize: '1.5rem' }}>
                    {getEmojiForRating(rating)}
                </span>
                <span style={{
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    Rating: {rating}/10
                </span>
            </div>
        </div>
    )
}

export default Joke