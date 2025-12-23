import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../features/api/AuthApi'
import authSlice from '../features/slice/AuthSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { menuItemApi } from '../features/api/MenuItemApi';


// configure the Redux store
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'isAuthenticated', 'user'], // only persist these keys
};

//configure cart slice for persistence
// const cartPersistConfig = {
//     key: 'cart',
//     storage,
//     whitelist: ['items', 'totalPrice'], // only persist these keys
// };

//Create the  persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

// const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
    reducer: {
        // Add the AuthApi reducer
        [AuthApi.reducerPath]: AuthApi.reducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,

        //add the auth slice reducer
        authSlice: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware, menuItemApi.middleware),
})


//export the persisted store
export const persistor = persistStore(store)



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch