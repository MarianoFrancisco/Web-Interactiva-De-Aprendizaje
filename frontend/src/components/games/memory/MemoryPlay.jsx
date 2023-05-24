import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function MemoryPlay({ couples }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [completed, setCompeted] = useState(false);

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
        setCompeted(true);
      } else {
        Swal.fire({
          icon: 'success',
          title: `Pareja Conseguida`,
          showConfirmButton: false,
          timer: 800
        });
      }
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
    <>
      {completed ? (
        <div className="flex flex-wrap justify-center item-center mt-8">
          <p className="font-bold text-xl">Juego Completado</p>
        </div>
      ) : (
        <div className="bg-white h-full mt-14">
          <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
                  <div
                    key={`${card._id}-${index}`}
                    className={`card w-full h-full rounded-md m-2 p-4 text-center cursor-pointer ${isCardFlipped(card) ? "bg-green-500" : "bg-blue-500"}`}
                    onClick={() => handleCardClick(card)}
                  >
                    <div className="flex flex-col justify-center items-center h-full">
                      {isCardFlipped(card) ? (
                        <p className="text-white text-xl font-bold">{card.text}</p>
                      ) : (
                        <FontAwesomeIcon icon={faArrowsRotate} className="text-white h-32" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
