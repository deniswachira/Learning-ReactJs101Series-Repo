import { useDispatch,useSelector } from 'react-redux'
import { type RootState, type AppDispatch } from '../app/store';
import { happyMood, excitedMood, calmMood, sadMood } from '../features/moodchangerSlice'



const MoodChanger = () => {
    const dispatch = useDispatch<AppDispatch>();
    const mood = useSelector((state: RootState) => state.moodChanger.mood);

    return (
        <div>
            <h2>MoodChanger</h2>
            <h2>Current Mood: {mood}</h2>
            <button onClick={() => dispatch(happyMood("😊"))}>Happy 😊</button>
            <button onClick={() => dispatch(excitedMood("😃"))}>Excited 😃</button>
            <button onClick={() => dispatch(calmMood("😌"))}>Calm 😌</button>
            <button onClick={() => dispatch(sadMood("😢"))}>Sad 😢</button>
        </div>
    )
}

export default MoodChanger