"use client";

import { useState, useEffect } from "react";
import { useGameContext } from "@/components/GameContextWrapper";
import Select from "@/components/Select";
import Play from "@/components/Play";
import Finish from "@/components/Finish";

export default function Game() {
  const {
    playerNum,
    timer,
    spyMode,
    spyNumber,
    theme,
    easterEgg,
    setEasterEgg,
    apiData,
  } = useGameContext();

  const [stage, setStage] = useState(1);
  const [vocab, setVocab] = useState("");
  const [selectData, setSelectData] = useState(null);

  useEffect(() => {
    if (easterEgg !== "") {
      setEasterEgg(easterEgg);
    }
  }, [easterEgg]);

  const progressNextStage = (stage) => {
    setStage(stage);
  };

  const updateGlobalVocab = (vocab, selectData) => {
    setVocab(vocab);
    setSelectData(selectData);
  };

  let gameView;

  switch (stage) {
    case 1:
      gameView = (
        <Select
          globalState={{
            playerNum,
            timer,
            spyMode,
            spyNumber,
            theme,
            apiData,
          }}
          nextStage={progressNextStage}
          setVocab={updateGlobalVocab}
        />
      );
      break;
    case 2:
      gameView = <Play nextStage={progressNextStage} />;
      break;
    case 3:
      gameView = (
        <Finish
          nextStage={progressNextStage}
          liarStatus="found"
          vocab={vocab}
          theme={theme}
          selectData={selectData}
        />
      );
      break;
    case 4:
      gameView = (
        <Finish
          nextStage={progressNextStage}
          liarStatus="not-found"
          vocab={vocab}
          theme={theme}
          selectData={selectData}
        />
      );
      break;
    default:
      gameView = (
        <Select
          globalState={{
            playerNum,
            timer,
            spyMode,
            spyNumber,
            theme,
            apiData,
          }}
          nextStage={progressNextStage}
          setVocab={updateGlobalVocab}
        />
      );
      break;
  }

  return <div>{gameView}</div>;
}
