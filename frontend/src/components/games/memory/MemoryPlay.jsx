import { useState, useEffect, useContext } from "react";
import useGameTypes from "../../../hooks/useGameType";
import useMedals from "../../../hooks/useMedal";
import AuthContext from "../../../context/AuthProvider";
import React, { useRef } from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function MemoryPlay({ couples }) {
  const medalSavedRef = useRef(false);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [completed, setCompeted] = useState(false);
  const [tryes, setTryes] = useState(0);
  const [points, setPoints] = useState(100);
  const { gameTypes } = useGameTypes();
  const { insertMedal } = useMedals();
  const { auth } = useContext(AuthContext);

  const saveMedal = (position, game_type) => {
    const medal = {
      position: position,
      game_type: game_type
    };
    insertMedal(medal);
  };

  useEffect(() => {
    if (tryes > couples.length) {
      const difference = tryes - couples.length;
      setPoints(100 - ((tryes / couples.length) * difference));
    }
  }, [tryes])

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
    setTryes((prevCount) => prevCount + 1);
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

  let obtainMedal = (100 - points);
  let myMedal;
  let game_type="";
  
  gameTypes.map((gameTypes, index) => {
    if (gameTypes.name == "Memoria") {
      game_type = gameTypes._id;
    }
  })

  return (
    <>
      {completed ? (
        <>
          <h1 className="mt-10 text-center text-2xl bg-emerald-100 font-bold leading-9 tracking-tight text-black-900">Juego Completado</h1>
          <br />
          <div className="flex flex-wrap justify-center item-center mt-8">
            <table className="table-fixed w-1/2" style={{ border: "1px solid black", borderRadius: "10px" }}>
              <thead>
                <tr>
                  <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    Intentos Totales
                  </th>
                  <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    Intentos Fallidos
                  </th>
                  <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    Puntaje Obtenido
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    {tryes}
                  </td>
                  <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    {(tryes - couples.length)}
                  </td>
                  <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    {points}/100
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {auth.username != null && !medalSavedRef.current && (
            <>
              {obtainMedal === 0 && (
                <div>
                  {myMedal = "1"}
                  {saveMedal(myMedal, game_type)}
                </div>
              )}
              {obtainMedal === 1.8 && (
                <div>
                  {myMedal = "2"}
                  {saveMedal(myMedal, game_type)}
                </div>
              )}
              {obtainMedal === 2.8 && (
                <div>
                  {myMedal = "3"}
                  {saveMedal(myMedal, game_type)}
                </div>
              )}
              {medalSavedRef.current = true}
            </>
          )}
        </>
      ) : (
        <div className="bg-white h-full mt-14 mb-16">
          <div className="card h-32 rounded-lg text-center w-1/2 mx-auto bg-amber-500 p-4 mb-6 flex items-center justify-center">
            <h3 className="text-3xl font-bold text-white">Encuentra parejas</h3>
          </div>
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
