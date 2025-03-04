import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const { id } = useParams();  // Fetch the ID from the URL
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data based on the ID from the URL
    const fetchData = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      setData(data);  // Set the fetched data
    };

    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>
      <p>Location: {data.location.name}</p>
      <p>Origin: {data.origin.name}</p>
    </div>
  );
};

export default CardDetails;
