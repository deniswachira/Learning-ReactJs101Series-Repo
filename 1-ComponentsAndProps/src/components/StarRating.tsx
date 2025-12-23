// ⭐ Rating component with function props

interface RatingProps {
    rating: number;
    maxRating?: number;
    onRatingClick: (rating: number) => void;
}

function StarRating({ rating, maxRating = 5, onRatingClick }: RatingProps) {
    return (
        <div style={{ margin: '10px 0' }}>
            <p>Rating: {rating}/{maxRating}</p>
            <div>
                {Array.from({ length: maxRating }, (_, index) => (
                    <span
                        key={index}
                        onClick={() => onRatingClick(index + 1)}
                        style={{
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: index < rating ? '#ffd700' : '#ccc'
                        }}
                    >
                        ⭐
                    </span>
                ))}
            </div>
        </div>
    )
}

export default StarRating