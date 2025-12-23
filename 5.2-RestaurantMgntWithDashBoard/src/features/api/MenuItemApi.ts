import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MenuItem } from '../../types/Types';
import { apiDomain } from '../../apiDomain/ApiDomain';


export const menuItemApi = createApi({
    reducerPath: 'menuItemApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['MenuItems'],
    endpoints: (builder) => ({

        // Fetch all Menu Items
        getAllMenuItems: builder.query<MenuItem[], void>({
            query: () => '/menu-items',
            providesTags: ['MenuItems'],
        }),

        //get menu item by id
        getMenuItemById: builder.query<MenuItem, {menu_item_id: number}>({
            query: (menu_item_id) => `/menu-items/${menu_item_id}`,
            providesTags: ['MenuItems'],
        }),

        //add new menu item
        addMenuItem: builder.mutation<{ message: string }, Partial<Omit<MenuItem, 'menu_item_id'>>>({
            query: (newItem) => ({
                url: '/menu-items',
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ['MenuItems'],
        }),
        //update menu item
        updateMenuItem: builder.mutation<{ message: string }, { menu_item_id: number } & Partial<Omit<MenuItem, 'menu_item_id'>>>({
            query: ({ menu_item_id, ...updatedItem }) => ({
                url: `/menu-items/${menu_item_id}`,
                method: 'PUT',
                body: updatedItem,
            }),
            invalidatesTags: ['MenuItems'],
        }),
        //delete menu item
        deleteMenuItem: builder.mutation<{ message: string }, number>({
            query: (menu_item_id) => ({
                url: `/menu-items/${menu_item_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MenuItems'],
        }),
    }),
})                                                                                                                                                                                                                                                                                                        