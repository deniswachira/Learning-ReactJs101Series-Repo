# useContext Hook - State Management Solution

Welcome to the **useContext** learning module! This lesson demonstrates how React's `useContext` hook provides an elegant solution to the prop drilling problem we explored in the previous module.

## 🎯 Learning Objectives

By the end of this lesson, you will:
- ✅ Understand what React Context is and why it exists
- ✅ Learn how to create and provide context values
- ✅ Know how to consume context using the useContext hook
- ✅ See practical examples of context replacing prop drilling
- ✅ Understand when to use Context vs other state management solutions

## 📚 What is React Context?

React Context is a built-in feature that allows you to share data across multiple components without manually passing props through every level of the component tree.

### The Problem Context Solves
```
App (has user data)
 └── Header
     └── Navigation
         └── UserProfile (needs user data) ❌ Prop drilling!
```

### The Context Solution
```
App (provides user context)
 └── Header
     └── Navigation
         └── UserProfile (consumes user context) ✅ Direct access!
```

## 🔧 How useContext Works

### Step 1: Create a Context
```tsx
import { createContext } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// Create context with default value
export const UserContext = createContext<User | null>(null);
```

### Step 2: Provide Context Value
```tsx
import { UserContext } from './UserContext';

function App() {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };

  return (
    <UserContext.Provider value={user}>
      <Header />
      <MainContent />
    </UserContext.Provider>
  );
}
```

### Step 3: Consume Context
```tsx
import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
  const user = useContext(UserContext);

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 🆚 Context vs Prop Drilling Comparison

| Feature | Prop Drilling | useContext |
|---------|---------------|------------|
| **Code Clarity** | ❌ Cluttered with unnecessary props | ✅ Clean, only relevant props |
| **Maintenance** | ❌ Hard to refactor | ✅ Easy to modify |
| **Performance** | ✅ Only necessary re-renders | ⚠️ All consumers re-render |
| **Debugging** | ❌ Hard to track data flow | ✅ Clear provider-consumer relationship |
| **Type Safety** | ✅ TypeScript enforced | ✅ TypeScript enforced |
| **Bundle Size** | ✅ No extra dependencies | ✅ Built into React |

## 🎨 Common Context Patterns

### 1. Theme Context
```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 2. Authentication Context
```tsx
interface AuthContext {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);
```

### 3. Shopping Cart Context
```tsx
interface CartContext {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  total: number;
}

const CartContext = createContext<CartContext | null>(null);
```

## ⚡ Best Practices

### ✅ Do's
- **Use TypeScript interfaces** for context values
- **Provide default values** that make sense
- **Create custom hooks** for context consumption
- **Split contexts** by concern (auth, theme, cart)
- **Use Context for truly global state**

### ❌ Don'ts
- **Don't overuse Context** for local component state
- **Don't put everything** in a single massive context
- **Don't forget Provider** - components will get default value
- **Don't use Context** for high-frequency updates

## 🔄 Custom Context Hook Pattern

```tsx
// Create context with custom hook
function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}

// Usage becomes cleaner
function LoginButton() {
  const { login, isLoading } = useAuth(); // ✅ Type-safe and clean
  
  return (
    <button onClick={login} disabled={isLoading}>
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

## 🎓 When to Use Context

### ✅ Great for:
- **User authentication** state
- **Theme/dark mode** preferences
- **Language/internationalization** settings
- **Shopping cart** data
- **Global notifications/alerts**

### ❌ Avoid for:
- **Local component state** (use useState)
- **High-frequency updates** (consider Redux/Zustand)
- **Complex business logic** (consider state machines)
- **Server state** (use React Query/SWR)

## 🚀 Learning Progression

1. **Start here**: Understand the prop drilling problem
2. **Learn Context basics**: createContext, Provider, useContext
3. **Practice**: Convert prop drilling examples to Context
4. **Advanced**: Custom hooks, multiple contexts, optimization
5. **Next level**: Compare with Redux, Zustand for complex apps

## 📖 Practical Examples in This Module

This folder will contain hands-on examples showing:
- 🔄 Converting prop drilling to Context
- 🎨 Theme switching with Context
- 👤 User authentication pattern
- 🛒 Shopping cart management
- 🔧 Custom Context hooks

## 🎯 Key Takeaways

- **Context eliminates prop drilling** for global state
- **useContext hook** provides clean data access
- **Provider pattern** shares data across component trees
- **Custom hooks** make Context consumption cleaner
- **Not a replacement** for all state management needs

---

*Ready to solve the prop drilling problem? Let's dive into practical useContext examples! 🚀*
