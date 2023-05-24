import React, { useState, useEffect,useRef } from "react";
import Swal from 'sweetalert2';
import AuthContext from "../../../context/AuthProvider";
import useGameTypes from "../../../hooks/useGameType";
import useMedals from "../../../hooks/useMedal";

export default function UnscramblePlay({ words = [] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [completeWord, setCompleteWord] = useState(false);
  const [resUser, setResUser] = useState([]);
  const [tryesFailed, setTryesFailed] = useState(0);
  const [points, setPoints] = useState(100);
  const medalSavedRef = useRef(false);
  const { gameTypes } = useGameTypes();
  const { insertMedal } = useMedals();
  const { auth } = useContext(AuthContext);
  let game_type="";


  useEffect(() => {
    const failed = tryesFailed;
    setPoints(100 - (100 / wordList.length) * failed);
  }, [tryesFailed])

  useEffect(() => {
    const messLettersWords = messLetters(words);
    setWordList(messLettersWords);
  }, [words]);

  useEffect(() => {
    if (selectedLetters.length !== 0) {
      if (selectedLetters.length === wordList[currentWord].letters.length) {
        let finalWord = '';
        selectedLetters.forEach((item) => {
          finalWord += item.letter;
        })
        checkCorrectWord(finalWord);
        setResUser((prevWords) => [...prevWords, finalWord]);
        setCompleteWord(true);
      }
    }
  }, [selectedLetters])

  useEffect(() => {

  }, [currentWord])

  gameTypes.map((gameTypes, index) => {
    if (gameTypes.name == "Descifrado") {
      game_type=gameTypes._id;
    }
  })

  const saveMedal = (game_type) => {
    const position="";
    if(points==null){
      position="1";
    }else if(points){

    }
    if(position!=""){
    const medal={position:position,game_type:game_type};
    insertMedal(medal);
    }
  };

  const messLetters = (wordsArray) => {
    return wordsArray.map((word) => {
      let messWord = word.word.split('');
      messWord = messWord.sort(() => Math.random() - 0.5);
      const addFields = messWord.map((item, index) => ({
        letter: item,
        index: index,
        clicked: false
      }))
      return {
        ...word,
        letters: addFields
      }
    })
  }

  const handleLetterClick = (letter) => {
    const updateList = updateClick(letter);
    setWordList(updateList);
    setSelectedLetters((prevLetters) => {
      if (letter.clicked) {
        return prevLetters.filter((detail) => detail.index !== letter.index);
      } else {
        const detail = {
          letter: letter.letter,
          index: letter.index
        }
        return [...prevLetters, detail];
      }
    });
  }

  const updateClick = (letter) => {
    const status = letter.clicked;
    return wordList.map((object, index) => {
      if (index === currentWord) {
        const updateLetters = object.letters.map((item) => item.index === letter.index ? { ...item, clicked: !status } : item);
        return { ...object, letters: updateLetters }
      }
      return object;
    })
  }


  const checkCorrectWord = (finalWord) => {
    const realWord = wordList[currentWord].word;
    if (finalWord === realWord) {
      Swal.fire({
        icon: 'success',
        title: `Encontraste la palabra`,
        showConfirmButton: false,
        timer: 800
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `Fallaste, la palabra era: '${realWord}'`,
        showConfirmButton: true
      });
      setTryesFailed((prevCount) => prevCount + 1);
    }
  }

  const updatePreview = () => {
    return selectedLetters.map(item => item.letter).join('');
  }

  const handleNext = () => {
    setCurrentWord((prevWord) => prevWord + 1);
    setCompleteWord(false);
    setSelectedLetters([]);
  }

  const isLetterClicked = (letter) => letter.clicked;

  const wordN = wordList[currentWord];
  const isLastWord = currentWord === wordList.length - 1;

  return (
    <div className="w-3/4 mt-14 md:w-1/2 mx-auto">
      {currentWord === wordList.length ? (
        <>
          <h1 className="mt-10 text-center text-4xl font-bold">Has Terminado el Juego</h1>
          <h1 className="mt-10 text-center text-2xl bg-emerald-100 font-bold leading-9 tracking-tight text-black-900">PUNTEO TOTAL:  {points ? points : 100}/100</h1>
          <br />
          <div className="flex justify-center items-center">
            <table className="table-fixed w-1/2" style={{ border: "1px solid black", borderRadius: "10px" }}>
              <thead>
                <tr>
                  <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    Palabra Ingresada
                  </th>
                  <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                    Palabra Correcta
                  </th>
                </tr>
              </thead>
              <tbody>
                {wordList.map((word, index) => (
                  <tr key={index}>
                    <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                      {resUser[index]}
                    </td>
                    <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                      {word.word}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="card h-32 rounded-lg text-center bg-amber-500 p-4 mb-4 flex items-center justify-center">
            <h3 className="text-xl font-bold text-white">Ordena la palabra</h3>
          </div>

          {completeWord ? (
            <div className="flex justify-center items-center">
              <p className="text-xl, font-bold">Palabra Enviada</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              {wordN && wordN.letters.map((letter, index) => (
                <div key={index}
                  className={`card rounded-md m-2 p-4 text-center cursor-pointer ${isLetterClicked(letter) ? "bg-green-500" : "bg-blue-500"}`}
                  onClick={() => handleLetterClick(letter)}
                >
                  <p className="text-white font-bold">{letter.letter}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-center mt-5 bg-blue-200 rounded-md p-4">
            <input type="text" readOnly={true} value={updatePreview()} />
          </div>

          <div className="flex justify-center items-center mt-3">
            <button
              className="bg-emerald-400 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
              disabled={!completeWord}
              onClick={() => { handleNext(); }}
            >
              {isLastWord ? "Terminar" : "Siguiente"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
