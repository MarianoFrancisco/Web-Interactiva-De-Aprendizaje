import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function UnscramblePlay({ words = [] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [completeWord, setCompleteWord] = useState(false);

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
        console.log(finalWord);
        checkCorrectWord(finalWord);
        setCompleteWord(true);
      }
    }
  }, [selectedLetters])

  useEffect(() => {

  }, [currentWord])

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
        <div className="flex justify-center items-center">
          <p className="text-xl, font-bold">El juego ha terminado</p>
        </div>
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
