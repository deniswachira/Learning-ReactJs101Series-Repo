import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {  User } from '../../types/Types';
import { apiDomain } from '../../apiDomain/ApiDomain';


export const restaurantApi = createApi({
    reducerPath: 'restaurantApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['Restaurants'],
    endpoints: (builder) => ({

        // Fetch all Restaurants
        getAllRestaurants: builder.query<User[], void>({
            query: () => 'restaurants',
            providesTags: ['Restaurants'],
        }),        

        //get restaurant by id
        getRestaurantById: builder.query<User, number >({
            query: (restaurant_id) => `restaurants/${restaurant_id}`,
            providesTags: ['Restaurants'],
        }),

        //update restaurant details
        updateRestaurantDetails: builder.mutation<{ message: string }, { restaurant_id: number } & Partial<Omit<User, 'user_id' | 'user_type' | 'created_at'>>>({
            query: ({ restaurant_id, ...updateRestaurant }) => ({
                url: `restaurants/${restaurant_id}`,
                method: 'PUT',
                body: updateRestaurant,
            }),
            invalidatesTags: ['Restaurants'],
        }),

        //update restaurant_status
        updateRestaurantStatus:builder.mutation<{message:string},{restaurant_id:number,restaurant_status:string}>({
            query:({restaurant_id,...updateRestaurantStatus})=>({
                url:`restaurants/restaurant-status/${restaurant_id}`,
                method: 'PATCH',
                body: updateRestaurantStatus,
            }),
            invalidatesTags:['Restaurants']
        }),

    }),
})                                                                                                                                                                                                                                                                                                        