import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface MoodChangerState {
  mood: string;
}
const initialState: MoodChangerState = {
  mood: "😊",
};

const moodchangerSlice = createSlice({
  name: "moodchanger",
  initialState,
  reducers: {
    happyMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
    },
    excitedMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
    },
    calmMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
    },
    sadMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
    },

  },
});

export const { happyMood, excitedMood, calmMood, sadMood } = moodchangerSlice.actions;
export default moodchangerSlice.reducer;
