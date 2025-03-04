import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce'; // Import lodash debounce

const baseURLs = {
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode"
};

export default function Testing() {
  const [data, setData] = useState(null);  // Data to store the fetched API results
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState(null);  // Track errors
  const [selectedType, setSelectedType] = useState('characters');  // To track selected type (characters, locations, episodes)
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(null);  // URL for the next page
  const [totalCount, setTotalCount] = useState(0);  // Total count of items (characters, locations, episodes)

  // Function to fetch data from API
  const fetchData = (url) => {
    setLoading(true);
    axios.get(url)
      .then(response => {
        setData(response.data);  // Update the data state with the response
        setNextPage(response.data.info.next);  // Set the next page URL
        setTotalCount(response.data.info.count);  // Set the total count of items
        setLoading(false);
      })
      .catch(error => {
        setError(error);  // Set error if the request fails
        setLoading(false);
      });
  };

  // This useEffect fetches data based on selectedType, search, and pageNumber
  useEffect(() => {
    const url = `${baseURLs[selectedType]}?page=${pageNumber}&name=${search}`;
    fetchData(url);  // Fetch the data when selectedType or search or pageNumber changes
  }, [selectedType, search, pageNumber]);

  const handleSelectionChange = (e) => {
    setSelectedType(e.target.value);  // Change the selected type
  };

  const loadNextPage = () => {
    if (nextPage) {
      fetchData(nextPage);  // Fetch the next page of data
    }
  };

  // Create a debounced version of the search handler
  const handleSearch = debounce((e) => {
    setSearch(e.target.value);  // Update search query
    setPageNumber(1);  // Reset to page 1 on search
  }, 500); // Debounce delay set to 500ms

  // Handle change in search field
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Set search value immediately
    handleSearch(e); // Call debounced function
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Rick and Morty API Data</h1>

      <select onChange={handleSelectionChange} value={selectedType}>
        <option value="characters">Characters</option>
        <option value="locations">Locations</option>
        <option value="episodes">Episodes</option>
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange} // Use handleSearchChange with immediate update and debounced call
        value={search}
      />
      
      {/* Total Count Display */}
      <p>Total {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}: {totalCount}</p>

      {/* Data Rendering */}
      <div>
        {selectedType === 'characters' && data && data.results && (
          <div>
            <h2>Characters</h2>
            {data.results.map(character => (
              <div key={character.id}>
                <Link to={`/character/${character.id}`}>
                  <h3>{character.name}</h3>
                </Link>
                <img src={character.image} alt={character.name} />
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
              </div>
            ))}
          </div>
        )}

        {selectedType === 'locations' && data && data.results && (
          <div>
            <h2>Locations</h2>
            {data.results.map(location => (
              <div key={location.id}>
                <h3>{location.name}</h3>
                <p>Type: {location.type}</p>
                <p>Dimension: {location.dimension}</p>
              </div>
            ))}
          </div>
        )}

        {selectedType === 'episodes' && data && data.results && (
          <div>
            <h2>Episodes</h2>
            {data.results.map(episode => (
              <div key={episode.id}>
                <h3>{episode.name}</h3>
                <p>Air Date: {episode.air_date}</p>
                <p>Episode Code: {episode.episode}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {nextPage && (
        <button onClick={loadNextPage}>Show More</button>
      )}
    </div>
  );
}
