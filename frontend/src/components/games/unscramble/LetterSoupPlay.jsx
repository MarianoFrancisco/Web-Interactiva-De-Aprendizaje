import React, { useState, useEffect } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function LetterSoupPlay({ words }) {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setCurrentWord(words[currentWordIndex].word);
    generateBoard();
  }, [currentWordIndex, words]);

  const generateBoard = () => {
    const newBoard = [];
    const letters = currentWord.split("");
    const emptySpaces = 15 * 15 - letters.length;

    // Add the word to the board
    for (let i = 0; i < 15; i++) {
      const row = [];
      for (let j = 0; j < 15; j++) {
        if (i < letters.length && j < letters.length) {
          row.push(letters[j]);
        } else {
          row.push("");
        }
      }
      newBoard.push(row);
    }

    // Fill the remaining empty spaces with random letters
    let count = 0;
    while (count < emptySpaces) {
      const randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      const randomRow = Math.floor(Math.random() * 15);
      const randomCol = Math.floor(Math.random() * 15);

      if (newBoard[randomRow][randomCol] === "") {
        newBoard[randomRow][randomCol] = randomLetter;
        count++;
      }
    }

    setBoard(newBoard);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetters((prevSelectedLetters) => [...prevSelectedLetters, letter]);
  };

  const handleNextWord = () => {
    setSelectedLetters([]);
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{currentWord}</h2>
      <div className="flex flex-wrap mb-4">
        {selectedLetters.map((letter, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white w-12 flex items-center justify-center rounded-md h-12 m-1"
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-15 gap-2 mb-4">
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="bg-gray-200 text-gray-700 flex items-center justify-center rounded-md h-12 cursor-pointer hover:bg-gray-300"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))
        )}
      </div>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleNextWord}
        disabled={currentWordIndex === words.length - 1}
      >
        Siguiente
      </button>
    </div>
  );
}
