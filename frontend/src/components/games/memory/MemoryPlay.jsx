import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

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
    return shuffled.map((card, index) => ({
      ...card,
      flipped: false,
      matched: false,
      index: index
    }));
  };

  const handleCardClick = (card) => {
    if (card.flipped || card.matched || selectedCards.length === 2) {
      return;
    }

    const updatedCards = cards.map((itemCard) => (
      itemCard.index === card.index ? { ...itemCard, flipped: true } : itemCard
    ));

    setCards(updatedCards);

    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      checkMatchedCards(card);
    }
  };

  const checkMatchedCards = (card) => {
    const firstCard = selectedCards[0];
    if (firstCard.id === card.id) {
      setMatchedCards([...matchedCards, firstCard.id, card.id]);
      resetSelectedCards();
      if (matchedCards.length === (cards.length - 2)) {
        Swal.fire({
          icon: 'success',
          title: `Juego Completado`,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: `Pareja Conseguida`,
          showConfirmButton: false,
          timer: 800
        });
      }
      console.log(matchedCards);
      console.log(matchedCards.length, ' - ', cards.length);
    } else {
      setTimeout(resetSelectedCards, 500);
    }
  };

  const resetSelectedCards = () => {
    const selectedIdsSet = new Set(selectedCards.map((card) => card.id));

    setCards(cards.map((card) =>
      selectedIdsSet.has(card.id)
        ? { ...card, flipped: false }
        : card
    ));
    setSelectedCards([]);
  };

  const isCardFlipped = (card) =>
    card.flipped || matchedCards.includes(card.id);

  let idList = [];

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => {
        let textCard = '';
        if (idList.includes(card.id)) {
          textCard = card.second;
        } else {
          idList.push(card.id);
          textCard = card.first;
        }
        card.index = index;
        card.text = textCard;
        return (
          <div key={`${card._id}-${index}`}
            className={`card rounded-md m-2 p-4 text-center cursor-pointer ${isCardFlipped(card) ? "bg-green-500" : "bg-white"}`}
            onClick={() => handleCardClick(card)}
          >
            {isCardFlipped(card) ? (
              <p className="text-white">{card.text}</p>
            ) : (
              <p className="text-gray-700">{'←→'}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
