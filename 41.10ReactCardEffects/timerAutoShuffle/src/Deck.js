import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

/** Deck: uses deck API, allows drawing card at a time. */
function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  // these are toggled to true to begin events
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // ref to the timer ID so we can stop it on unmount
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        setDeck(d.data);
      } catch (err) {
        alert('Error loading deck.');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCard() {
      try {
        const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
        if (drawRes.data.remaining === 0) throw new Error("Deck empty!");

        const card = drawRes.data.cards[0];
        setDrawn(d => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image,
          },
        ]);
      } catch (err) {
        setIsDrawing(false);
        alert(err.message);
      }
    }

    if (isDrawing && deck) {
      timerRef.current = setInterval(fetchCard, 1000);
    } else if (!isDrawing && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isDrawing, deck]);

  useEffect(() => {
    async function shuffleDeck() {
      try {
        await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
        setDrawn([]);
        setIsDrawing(false);
        setIsShuffling(false);
      } catch (err) {
        alert('Error shuffling deck.');
        setIsShuffling(false);
      }
    }

    if (isShuffling && deck) shuffleDeck();
  }, [isShuffling, deck]);

  function toggleDraw() {
    setIsDrawing(prev => !prev);
  }

  function startShuffling() {
    setIsShuffling(true);
  }

  function renderDrawBtnIfOk() {
    if (!deck) return null;
    return (
      <button
        className="Deck-gimme"
        onClick={toggleDraw}
        disabled={isShuffling}
      >
        {isDrawing ? "STOP DRAWING" : "START DRAWING"}
      </button>
    );
  }

  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button
        className="Deck-gimme"
        onClick={startShuffling}
        disabled={isShuffling || isDrawing}
      >
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <main className="Deck">
      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}
      <div className="Deck-cardarea">
        {drawn.map(c => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
