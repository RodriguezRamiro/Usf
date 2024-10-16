//DrinkDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SnackOrBoozeApi from '../Api';

function DrinkDetail() {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinkDetail = async () => {
      try {
        const result = await SnackOrBoozeApi.getDrink(id);
        setDrink(result);
      } catch (error) {
        setError("Failed to load drink details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrinkDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{drink.name}</h1>
      <p>{drink.description}</p>
      <h2>Recipe</h2>
      <p>{drink.recipe}</p>
      <h2>How to Serve</h2>
      <p>{drink.serve}</p>
    </div>
  );
}

export default DrinkDetail;
