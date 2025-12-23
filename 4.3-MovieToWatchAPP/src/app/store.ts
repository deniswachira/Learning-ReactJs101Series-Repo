import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../features/api/movieApi';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [movieApi.reducerPath]: movieApi.reducer,
        // Keep your existing slice for any local state
        // movieToWatch: movieToWatchReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
