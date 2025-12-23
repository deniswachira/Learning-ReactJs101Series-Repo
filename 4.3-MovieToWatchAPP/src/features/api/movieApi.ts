import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MovieToWatch {
    movie_id: number;
    movie_name: string;
    release_date: number;
    is_watched: boolean;
}

export interface AddMovieRequest {
    movie_name: string;
    release_date: string;
}

export interface UpdateMovieRequest {
    movie_id: number;
    movie_name?: string;
    release_year?: number;
    is_watched?: boolean;
}

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        // Get all movies
        getMovies: builder.query<MovieToWatch[], void>({
            query: () => 'movies',
            providesTags: ['Movie'],
        }),

        // Get a single movie by ID
        getMovieById: builder.query({
            query: (id) => `movies/${id}`,
            providesTags: ['Movie'],
        }),

        // Add a new movie
        addMovie: builder.mutation({
            query: (newMovie) => ({
                url: 'movies',
                method: 'POST',
                body: newMovie,
            }),
            invalidatesTags: ['Movie'],
        }),

        // Update a movie
        updateMovie: builder.mutation({
            query: ({ movie_id, ...patch }) => ({
                url: `movies/${movie_id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Movie'],
        }),

        // Delete a movie
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `movies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Movie'],
        }),

        // Toggle watched status
        toggleWatched: builder.mutation({
            query: (id) => ({
                url: `movies/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Movie'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetMoviesQuery,
    useGetMovieByIdQuery,
    useAddMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useToggleWatchedMutation,
} = movieApi;