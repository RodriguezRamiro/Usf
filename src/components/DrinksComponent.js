//DrinkComponent.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SnackOrBoozeApi from '../Api';
import './DrinksComponent.css';

function DrinksComponent() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const result = await SnackOrBoozeApi.getDrinks();
        setDrinks(result);
      } catch (error) {
        setError("Failed to load drinks.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {drinks.map(drink => (
        <li key={drink.id}>{drink.name}</li>
      ))}
    </ul>
  );
}

export default DrinksComponent;
