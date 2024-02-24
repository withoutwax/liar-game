"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Finish = ({ liarStatus, vocab, theme, selectData }) => {
  const [liarGuess, setLiarGuess] = useState(false);
  const [liarGuessText, setLiarGuessText] = useState("");
  const [headerText, setHeaderText] = useState("라이어는 단어를 선택해주세요:");
  const [liarWin, setLiarWin] = useState(true);

  useEffect(() => {
    if (liarStatus !== "found") {
      console.log("Could not find liar");
      setHeaderText("라이어가 승리하였습니다!");
      setLiarGuessText(`라이어를 찾지 못하였습니다!`);
      setLiarGuess(true);
    }
  }, [liarStatus]);

  const handleLiarGuess = (guess) => {
    console.log(guess.target.value, vocab);
    if (guess.target.value === vocab) {
      setHeaderText("라이어가 승리하였습니다!");
      setLiarGuessText(`라이어가 선택한 단어가 맞습니다!`);
      setLiarWin(true);
    } else {
      setHeaderText("라이어가 패하였습니다!");
      setLiarGuessText(``);
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
    <button key={word} value={word} onClick={handleLiarGuess}>
      {word}
    </button>
  ));

  let newGame = (
    <Link href="/settings" className="col-span-3">
      새 게임하기
    </Link>
  );

  let headerColor = "white";
  if (liarGuess) {
    headerColor = liarWin ? "red" : "red";
  }

  return (
    <div className="">
      <h2 className={headerColor}>{headerText}</h2>
      <p className="mt-6">{liarGuessText}</p>
      {liarGuess ? (
        <p>
          선택된 단어는:<span className="green ml-2">{vocab}</span>
        </p>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-3 gap-2 mt-10">
        {liarGuess ? newGame : guessCards}
      </div>
    </div>
  );
};

export default Finish;
