"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Finish = ({ liarStatus, vocab, theme, selectData }) => {
  const [liarGuess, setLiarGuess] = useState(false);
  const [liarGuessText, setLiarGuessText] = useState("");
  const [headerText, setHeaderText] = useState("라이어는 단어를 선택해주세요");
  const [liarWin, setLiarWin] = useState(true);

  useEffect(() => {
    if (liarStatus !== "found") {
      console.log("Could not find liar");
      setLiarGuessText("라이어를 찾지 못하였습니다!");
      setHeaderText("라이어가 승리하였습니다!");
      setLiarGuess(true);
    }
  }, [liarStatus]);

  const handleLiarGuess = (guess) => {
    console.log(guess.target.value, vocab);
    if (guess.target.value === vocab) {
      setLiarGuessText("선택한 단어가 맞습니다!");
      setHeaderText("라이어가 승리하였습니다!");
      setLiarWin(true);
    } else {
      setLiarGuessText(`틀렸습니다! 선택된 단어는: ${vocab}`);
      setHeaderText("라이어가 패하였습니다!");
      setLiarWin(false);
    }
    setLiarGuess(true);
  };

  console.log({
    liarStatus,
    vocab,
    theme,
    liarGuess,
    liarGuessText,
    headerText,
    liarWin,
    selectData,
  });

  let guessCards = selectData.map((word) => (
    <button
      className="w-[30vw]"
      key={word}
      value={word}
      onClick={handleLiarGuess}
    >
      {word}
    </button>
  ));

  let newGame = <Link href="/settings">새 게임하기</Link>;

  let headerColor = "white";
  if (liarGuess) {
    headerColor = liarWin ? "green" : "red";
  }

  return (
    <div className="">
      <h2 className={headerColor}>{headerText}</h2>
      <p>{liarGuessText}</p>
      <div className="flex flex-wrap justify-center">
        {liarGuess ? newGame : guessCards}
      </div>
    </div>
  );
};

export default Finish;
