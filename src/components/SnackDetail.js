import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SnackOrBoozeApi from '../Api';

function SnackDetail() {
  const { id } = useParams();
  const [snack, setSnack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnackDetail = async () => {
      try {
        const result = await SnackOrBoozeApi.getSnack(id);
        setSnack(result);
      } catch (error) {
        setError("Failed to load snack details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSnackDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{snack.name}</h1>
      <p>{snack.description}</p>
      <h2>Recipe</h2>
      <p>{snack.recipe}</p>
      <h2>How to Serve</h2>
      <p>{snack.serve}</p>
    </div>
  );
}

export default SnackDetail;
