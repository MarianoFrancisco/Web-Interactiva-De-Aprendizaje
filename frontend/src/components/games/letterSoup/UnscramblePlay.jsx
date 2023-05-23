import React, { useState, useEffect } from "react";

export default function UnscramblePlay({ words }) {
  const [wordList, setWordList] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedWords, setMatchedWords] = useState([]);

  useEffect(() => {
    const messLetters = messLetters(words);
    setWordList(messLetters);
    console.log(wordList)
  }, [words]);

  const messLetters = (wordss) => {
     return newWords = wordss.map((word) => {
      let newWord = word.split('');
      newWord = newWord.sort(() => Math.random() - 0.5)
     });
  }


  return (
    <>
    <div>
    </div>
    </>
  );
}
