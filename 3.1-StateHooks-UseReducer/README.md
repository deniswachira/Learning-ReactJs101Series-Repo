# 🔢 useReducer Hook Learning Project

This project teaches React's **useReducer** hook for managing complex state logic. 

## 🎯 Learning Objectives

By completing this lesson, trainees will understand:

- ✅ When to use `useReducer` vs `useState`
- ✅ How to define state types and action types
- ✅ How to write reducer functions
- ✅ How to dispatch actions to update state
- ✅ TypeScript integration with React hooks

## 🚀 Project Features

### Interactive Counter App

- **Complex State Management**: Counter with configurable step size
- **Multiple Actions**: Increment, Decrement, Reset, and Set Step
- **Type Safety**: Full TypeScript integration
- **Beautiful UI**: Modern gradient design with smooth interactions

### Educational Components

- **Code Comments**: Step-by-step explanations
- **Visual Learning**: Clear state display and controls
- **Comparison Guide**: useReducer vs useState
- **Best Practices**: When to use each approach

## 🛠️ Tech Stack

- **React 18** - Latest React features
- **TypeScript** - Type-safe development
- **Vite** - Fast development server
- **CSS-in-JS** - Inline styling for simplicity

## 📚 Key Concepts Covered

### 1. State Type Definition

```typescript
interface CounterState {
  count: number
  step: number
}
```

### 2. Action Types

```typescript
type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_STEP'; payload: number }
```

### 3. Reducer Function

```typescript
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step }
    // ... more cases
  }
}
```

### 4. useReducer Hook Usage

```typescript
const [state, dispatch] = useReducer(counterReducer, initialState)
```

## 🎓 Teaching Flow

1. **Review useState**

   - Quick recap of previous lesson
   - Identify limitations with complex state
2. **Introduce useReducer**

   - When useState becomes inadequate
   - Benefits of reducer pattern
   - Step-by-step implementation
3. **Code Together**

   - Build the counter app together
   - Explain each part thoroughly
   - Test different actions
5. **Assignment** (5 minutes)

   - Add multiply/divide actions
   - Create a different reducer example

## 🔄 useReducer vs useState

| useReducer                | useState             |
| ------------------------- | -------------------- |
| Complex state logic       | Simple state values  |
| Multiple related values   | Independent updates  |
| Predictable updates       | Quick prototyping    |
| State depends on previous | Direct state setting |

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```
2. **Start development server:**

   ```bash
   pnpm dev
   ```
3. **Open browser:**
   Navigate to `http://localhost:5173`

## 📝 Assignment Ideas

### Beginner Level

- Add multiply and divide actions
- Change the styling colors
- Add input validation

### Intermediate Level

- Create a todo list with useReducer
- Build a shopping cart reducer
- Add undo/redo functionality

### Advanced Level

- Combine multiple reducers
- Add async actions simulation
- Create a mini Redux-like pattern

## 🎯 Next Steps

After mastering useReducer, trainees should explore:

- **Context API** - Global state management
- **Custom Hooks** - Reusable logic
- **useEffect** - Side effects and lifecycle
- **State Management Libraries** - Redux, Zustand

## 📖 Additional Resources

- [React useReducer Documentation](https://react.dev/reference/react/useReducer)
- [TypeScript with React](https://react.dev/learn/typescript)
- [When to use useReducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)

---

**Happy Learning! 🎉**

*This project is part of the React Learning Curriculum - Week 7*
