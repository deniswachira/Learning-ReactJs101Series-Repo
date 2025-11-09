# Lesson 0: Introduction to React.js

Welcome to the first lesson in our React.js learning series! This lesson introduces you to React, its ecosystem, and sets up your development environment.

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Understand what React.js is and why it's popular
- Learn about the React ecosystem and modern tooling
- Set up a React development environment with Vite and TypeScript
- Understand the project structure of a React application
- Run your first React application
- Explore the basic React concepts through the default template

## 📚 What is React.js?

**React** is a JavaScript library for building user interfaces, particularly web applications. Created by Facebook (now Meta), React has become one of the most popular frontend frameworks due to its:

- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient updates and rendering for better performance
- **Declarative Nature**: Describe what the UI should look like, not how to achieve it
- **Strong Ecosystem**: Rich community and extensive third-party library support
- **Flexibility**: Can be integrated into existing projects or used to build new applications

## 🛠️ Our Technology Stack

This project uses modern React development tools:

- **React 18+**: Latest React features with Concurrent Mode
- **TypeScript**: Static type checking for better code quality and developer experience
- **Vite**: Fast build tool and development server with Hot Module Replacement (HMR)
- **ESLint**: Code linting for consistent code style and error prevention

### Why Vite?

Vite provides several advantages over traditional bundlers:
- ⚡ **Lightning Fast**: Native ES modules for instant server start
- 🔥 **Hot Module Replacement**: See changes instantly without losing state
- 📦 **Optimized Builds**: Production builds optimized with Rollup
- 🔧 **Simple Configuration**: Minimal setup required

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- Node.js (version 18 or higher)
- npm or pnpm package manager

### Installation & Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

You should see the default React + Vite application running!

## 📁 Project Structure

```
0-Intro-ReactJS/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Application entry point
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   └── assets/          # Images, icons, etc.
├── index.html            # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## 🔍 Exploring the Code

### Entry Point (`main.tsx`)
The application starts in `src/main.tsx`, which:
- Imports React and ReactDOM
- Renders the App component into the DOM
- Uses React 18's `createRoot` API

### Main Component (`App.tsx`)
The `App.tsx` file contains:
- A functional React component
- JSX syntax for describing the UI
- CSS imports for styling
- React and Vite logos with interactive features

## 🎯 Key Concepts Introduced

1. **Components**: React applications are built using components
2. **JSX**: JavaScript XML syntax for writing UI components
3. **Props**: How components receive data from their parents
4. **State**: How components manage their internal data
5. **Virtual DOM**: React's efficient rendering system

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint for code quality

## 🎨 Try It Yourself

1. **Modify the App component**: Change the text or add new elements
2. **Experiment with styles**: Edit `App.css` to change the appearance
3. **Add new content**: Try adding more JSX elements to see how React renders them

## 🔧 Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
