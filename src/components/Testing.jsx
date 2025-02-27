import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = "https://rickandmortyapi.com/api/character";


export default function Testing() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setData(response.data); // Update the state with the fetched data
      })
      .catch(error => {
        console.error(error); // Log error if request fails
      });
  }, []);

  if (!data) return <p>Loading...</p>

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div>
        {JSON.stringify(data)}
        {}
      </div>

    </div>
  )
}






































