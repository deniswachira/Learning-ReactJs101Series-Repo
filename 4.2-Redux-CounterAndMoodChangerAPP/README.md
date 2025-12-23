# Redux Toolkit - Advanced State Management

Welcome to the **Redux Toolkit** learning module! This lesson teaches you the modern, simplified way to use Redux for complex state management in React applications.

## 🎯 Learning Objectives

By the end of this lesson, you will:
- ✅ Understand what Redux Toolkit is and why it's the modern Redux standard
- ✅ Learn the core concepts: Store, Slices, Actions, and Reducers
- ✅ Build a Counter app with Redux Toolkit
- ✅ Create a Mood Changer app demonstrating complex state
- ✅ Know when to use Redux vs Context vs local state
- ✅ Implement async actions with createAsyncThunk

## 🚀 What is Redux Toolkit?

Redux Toolkit (RTK) is the **official, opinionated, batteries-included toolset** for efficient Redux development. It simplifies Redux usage and eliminates common boilerplate.

### Why Redux Toolkit?
- 📦 **Less Boilerplate**: Reduces Redux code by ~75%
- 🛡️ **Built-in Best Practices**: Immutability with Immer, DevTools integration
- ⚡ **Better Developer Experience**: TypeScript support, simplified syntax
- 🔧 **Modern Standards**: Uses createSlice, configureStore, createAsyncThunk

## 🏗️ Redux Architecture Overview

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Components    │───▶│    Actions   │───▶│     Store       │
│                 │    │              │    │   (Reducers)    │
└─────────────────┘    └──────────────┘    └─────────────────┘
         ▲                                           │
         │                                           │
         └───────────────── State ◀──────────────────┘
```

### Data Flow:
1. **Component** dispatches an **Action**
2. **Action** goes to the **Store**
3. **Reducer** processes the action and updates state
4. **Component** re-renders with new state

## 🛠️ Redux Toolkit Core Concepts

### 1. Store Configuration
```tsx
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';
import moodSlice from './features/moodSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    mood: moodSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Creating Slices
```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  step: number;
}

const initialState: CounterState = {
  value: 0,
  step: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.step; // Immer makes this safe!
    },
    decrement: (state) => {
      state.value -= state.step;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, setStep, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

### 3. Using Redux in Components
```tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { increment, decrement, reset } from './features/counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const step = useSelector((state: RootState) => state.counter.step);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+{step}</button>
      <button onClick={() => dispatch(decrement())}>-{step}</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```

## 🎭 Project: Counter and Mood Changer App

This project demonstrates two complementary Redux patterns:

### 📊 Counter Features
- ✨ Increment/Decrement with custom steps
- 🔄 Reset functionality
- 📈 History tracking
- 🎯 Target goal setting

### 😊 Mood Changer Features
- 🎭 Multiple mood states (Happy, Sad, Excited, Calm, Angry)
- 🌈 Dynamic background colors based on mood
- 📝 Mood history with timestamps
- 💭 Custom mood messages
- 📊 Mood statistics

## 🔄 Advanced Redux Patterns

### 1. Async Actions with createAsyncThunk
```tsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async action for fetching mood quotes
export const fetchMoodQuote = createAsyncThunk(
  'mood/fetchQuote',
  async (mood: string) => {
    const response = await fetch(`/api/quotes/${mood}`);
    return response.json();
  }
);

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    current: 'neutral',
    quote: '',
    loading: false,
    error: null,
  },
  reducers: {
    setMood: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoodQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoodQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quote = action.payload.quote;
      })
      .addCase(fetchMoodQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

### 2. Typed Hooks for Better DX
```tsx
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## ⚖️ When to Use Redux vs Alternatives

| Scenario | Local State | Context | Redux Toolkit |
|----------|-------------|---------|---------------|
| **Button click count** | ✅ useState | ❌ Overkill | ❌ Overkill |
| **Theme switching** | ❌ Won't persist | ✅ Perfect fit | ⚠️ Could work |
| **User authentication** | ❌ Component scope | ✅ Good choice | ✅ Great choice |
| **Shopping cart** | ❌ Won't persist | ⚠️ Gets complex | ✅ Perfect fit |
| **Complex forms** | ⚠️ Gets messy | ❌ Wrong tool | ✅ Excellent |
| **Real-time data** | ❌ No sync | ❌ No middleware | ✅ With RTK Query |

## 🎨 App Structure

```
src/
├── app/
│   └── store.ts              # Store configuration
├── features/
│   ├── counter/
│   │   ├── counterSlice.ts   # Counter logic
│   │   └── Counter.tsx       # Counter component
│   └── mood/
│       ├── moodSlice.ts      # Mood logic
│       └── MoodChanger.tsx   # Mood component
├── hooks/
│   └── redux.ts             # Typed hooks
└── App.tsx                  # Main app with Provider
```

## 🔧 Redux DevTools Integration

Redux Toolkit automatically configures Redux DevTools for debugging:

- 🕐 **Time Travel**: Step through actions
- 📊 **State Inspector**: View state changes
- 🔍 **Action Logger**: See all dispatched actions
- 📈 **Performance**: Monitor render times

## 🚀 Best Practices

### ✅ Do's
- **Use createSlice** for all reducers
- **Type your state** with TypeScript interfaces
- **Keep slices focused** on single concerns
- **Use createAsyncThunk** for API calls
- **Normalize complex data** structures

### ❌ Don'ts
- **Don't mutate state** outside Immer (in createSlice)
- **Don't put non-serializable** values in state
- **Don't make components too Redux-aware**
- **Don't put all state** in Redux
- **Don't ignore loading/error states**

## 📦 Installation & Setup

```bash
# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux

# TypeScript types (if needed)
npm install --save-dev @types/react-redux
```

## 🎓 Learning Progression

1. **Start Here**: Understand Redux principles and data flow
2. **Basic Counter**: Simple increment/decrement with Redux
3. **Complex State**: Mood changer with multiple properties
4. **Async Actions**: API calls with createAsyncThunk
5. **Real Project**: Combine with React Router, forms, etc.

## 🎯 Project Features Implemented

### Counter App:
- 🔢 Basic increment/decrement
- 📏 Custom step size
- 🎯 Goal setting and tracking
- 📊 Operation history
- 🔄 Reset functionality

### Mood Changer App:
- 🎭 5 different moods with unique styling
- 🌈 Dynamic backgrounds based on mood
- 📝 Mood descriptions and quotes
- 📅 Mood history with timestamps
- 📊 Basic mood analytics

## 💡 Key Takeaways

- **Redux Toolkit eliminates boilerplate** and simplifies Redux
- **createSlice combines** actions and reducers elegantly
- **Immer integration** allows "mutative" logic safely
- **TypeScript support** provides excellent developer experience
- **Perfect for complex state** that multiple components need
- **DevTools integration** makes debugging powerful

---

*Ready to master modern Redux? Let's build some awesome state management! 🚀*
