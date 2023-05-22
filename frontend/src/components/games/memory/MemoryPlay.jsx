import React, { useState, useEffect } from "react";

export default function MemoryPlay({ couples }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const shuffledCards = shuffleCards(couples);
    setCards(shuffledCards);
  }, [couples]);

  const shuffleCards = (cards) => {
    const shuffled = [...cards, ...cards].sort(() => Math.random() - 0.5);
    return shuffled.map((card) => ({
      ...card,
      flipped: false,
      matched: false,
    }));
  };

  const handleCardClick = (card) => {
    if (card.flipped || card.matched || selectedCards.length === 2) {
      return;
    }

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      checkMatchedCards(card);
    }
  };

  const checkMatchedCards = (card) => {
    const firstCard = selectedCards[0];
    if (firstCard.first === card.first || firstCard.second === card.second) {
      setMatchedCards([...matchedCards, firstCard.id, card.id]);
      resetSelectedCards();
    } else {
      setTimeout(resetSelectedCards, 1000);
    }
  };

  const resetSelectedCards = () => {
    setCards(
      cards.map((card) =>
        selectedCards.includes(card.id)
          ? { ...card, flipped: false }
          : card
      )
    );
    setSelectedCards([]);
  };

  const isCardFlipped = (card) =>
    card.flipped || matchedCards.includes(card.id);

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <div
          key={`${card.id}-${index}`}
          className={`card rounded-md m-2 p-4 text-center cursor-pointer ${
            isCardFlipped(card) ? "bg-green-500" : "bg-white"
          }`}
          onClick={() => handleCardClick(card)}
        >
          {isCardFlipped(card) ? (
            <p className="text-white">{card.second}</p>
          ) : (
            <p className="text-gray-700">{card.first}</p>
          )}
        </div>
      ))}
    </div>
  );
}
