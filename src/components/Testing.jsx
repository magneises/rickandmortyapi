import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = "https://rickandmortyapi.com/api/character";

export default function Testing() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setData(response.data); // Update state with the fetched data
      })
      .catch(error => {
        console.error(error); // Log error if request fails
      });
  }, []); // Empty array ensures this runs only once when the component mounts

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div>
        {data.results.map((character) => (
          <div key={character.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h2>{character.name}</h2>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
            <img src={character.image} alt={character.name} style={{ width: '100px', height: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
