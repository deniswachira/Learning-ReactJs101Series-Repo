
import * as movieApi from '../features/api/movieApi';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
    movie_name: string;
    release_date: string;
}

const MovieToWatch = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();

    // RTK Query hooks
    const { data: movies = [], error, isLoading, } = movieApi.useGetMoviesQuery();
    const [addMovie, { isLoading: isAddingLoading }] = movieApi.useAddMovieMutation();
    const [updateMovie] = movieApi.useUpdateMovieMutation();
    const [deleteMovie] = movieApi.useDeleteMovieMutation();
    const [toggleWatched] = movieApi.useToggleWatchedMutation();





    const handleAddMovie: SubmitHandler<IFormInput> = async (data) => {
        try {
            console.log(data)
            const response = await addMovie(data).unwrap();
            alert(response.message);
            reset();
        } catch (error) {
            console.error('Failed to add movie:', error);
            alert('Failed to add movie:' + error);
        }
    };

    const handleDeleteMovie = async (movie_id: number) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                const response = await deleteMovie(movie_id).unwrap();
                alert(response.message);
            } catch (error) {
                console.error('Failed to delete movie:', error);
                alert('Failed to delete movie:' + error);
            }
        }
    };

    const handleToggleWatched = async (movie_id: number) => {
        // try {
        //     await toggleWatched(movieId).unwrap();
        // } catch (error) {
        //     console.error('Failed to toggle watched status:', error);
        // }
    };



    return (
        <div className="movie-to-watch-container">
            <header className="header">
                <h1>Movies to Watch</h1>
            </header>

            {/* //form to add movie */}
            <div className='add-movie-section'>
                <h2>Add a New Movie</h2>
                <form onSubmit={handleSubmit(handleAddMovie)} className="add-movie-form">
                    <input
                        {...register('movie_name', { required: "This field is required" })}
                        placeholder="Movie Name"
                    />
                    {errors.movie_name && <span style={{ color: 'red' }}>{errors.movie_name.message}</span>}

                    <input
                        {...register('release_date', { required: "This field is required" })}
                        placeholder="Release Year"
                        type="date"
                    />
                    {errors.release_date && <span style={{ color: 'red' }}>{errors.release_date.message}</span>}
                    {/* <button type="submit">Add Movie</button> */}
                    <button type="submit">{isAddingLoading ? "Adding..." : "Add Movie"}</button>
                </form>
            </div>



            {/* Movie List */}
            <div className="movie-list">
                {isLoading ? (
                    <div className="loading">Loading movies...</div>
                ) : error ? (
                    <div className="error">Error loading movies</div>
                ) : (
                    movies.length === 0 ? (
                        <p className="no-movies">No movies found for the current filter.</p>
                    ) : (
                        movies.map((movie) => (
                            <div key={movie.movie_id} className={`movie-item ${movie.is_watched ? 'watched' : ''}`}>
                                <div className="movie-info">
                                    <h3>{movie.movie_name}</h3>
                                    <p>Release Year: {movie.release_date}</p>
                                    <p style={{ color: movie.is_watched ? 'green' : 'orange' }}>Status: {movie.is_watched ? '✅ Watched' : '⏳ To Watch'}</p>
                                </div>
                                <div className="movie-actions">
                                    <button
                                        onClick={() => handleToggleWatched(movie.movie_id)}
                                        className={movie.is_watched ? 'mark-unwatched' : 'mark-watched'}
                                    >
                                        {movie.is_watched ? 'Mark Unwatched' : 'Mark Watched'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMovie(movie.movie_id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ))

                }
            </div>

        </div>
    );
};

export default MovieToWatch;