import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MovieList.css';

function MovieList({ searchKeyword }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState('releaseDate'); 
  const [sortOrder, setSortOrder] = useState('desc');    

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (searchKeyword) {
          params.append('search', searchKeyword);
        }
        
        params.append('sortBy', sortBy);
        params.append('sortOrder', sortOrder);
        
        const apiUrl = `http://localhost:8000/api/movies?${params.toString()}`;        
        const response = await axios.get(apiUrl);
        setMovies(response.data);

      } catch (err) {
        setError('Failed to load movie list. Please check connection or search term.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchKeyword, sortBy, sortOrder]); 

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return <div className="movie-list-container">Loading movies...</div>;
  }

  if (error) {
    return <div className="movie-list-container error-message">{error}</div>;
  }

  return (
    <div className="movie-list-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Movie List</h2>
        <div className="sorting-controls sorting-controls-container">
          <div>
            <label htmlFor="sort-by" className="sort-label">Sort By: </label>
            <select id="sort-by" value={sortBy} onChange={handleSortByChange} className="sort-select">
              <option value="releaseDate">Release Date</option>
              <option value="title">Title</option>
              <option value="averageRating">Rating</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort-order" className="sort-label">Order: </label>
            <select id="sort-order" value={sortOrder} onChange={handleSortOrderChange} className="sort-select">
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {movies.length === 0 ? (
        <p>No movies found for your search or filter criteria.</p>
      ) : (
        <div className="movie-list">
          {movies.map(movie => (
            <Link to={`/movies/${movie._id}`} key={movie._id} className="movie-list-item-link">
              <div className="movie-list-item">
                <div className="movie-poster-wrapper">
                  {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} className="movie-poster-list" />}
                </div>
                <div className="movie-info-list">
                  <h3>{movie.title}</h3>
                  <p><strong>Rating:</strong> {movie.averageRating != null ? `${parseFloat(movie.averageRating).toFixed(1)}/5` : 'N/A'} ({movie.numberOfRatings || 0} votes)</p>
                  <p><strong>Genre:</strong> {movie.genre}</p>
                  <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;