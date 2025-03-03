import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        setLoading(false);  // Set loading to false if there is an error
      });
  };

  useEffect(() => {
    if (!selectedType) return;  // If no selection, do nothing
    // Fetch the initial data based on the selected type
    fetchData(baseURLs[selectedType]);
  }, [selectedType]);  // Re-run effect when the selectedType changes

  const handleSelectionChange = (e) => {
    setSelectedType(e.target.value);  // Update the selected type based on user choice
  };

  const loadNextPage = () => {
    if (nextPage) {
      fetchData(nextPage);  // Fetch the next page of data
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Rick and Morty API Data</h1>

      {/* Dropdown to choose between characters, locations, and episodes */}
      <select onChange={handleSelectionChange} value={selectedType}>
        <option value="characters">Characters</option>
        <option value="locations">Locations</option>
        <option value="episodes">Episodes</option>
      </select>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        {/* Display total count at the top right */}
        <p>Total {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}: {totalCount}</p>
      </div>

      <div>
        {/* Render data depending on what type is selected */}
        {selectedType === 'characters' && data && data.results && (
          <div>
            <h2>Characters</h2>
            {data.results.map(character => (
              <div key={character.id}>
                <h3>{character.name}</h3>
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

      {/* Next Button to load more characters, locations, or episodes */}
      {nextPage && (
        <button onClick={loadNextPage}>Show More</button>
      )}
    </div>
  );
}
