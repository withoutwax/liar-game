import React, { useState, useEffect } from "react";
import Select from "./Select";
import Play from "./Play";
import Finish from "./Finish";
import "../scss/Game.scss";

const Game = (props) => {
  const [playerNum, setPlayerNum] = useState(props.globalState.playerNum);
  const [timer, setTimer] = useState(props.globalState.timer);
  const [spyMode, setSpyMode] = useState(props.globalState.spyMode);
  const [spyNumber, setSpyNumber] = useState(props.globalState.spyNumber);
  const [theme, setTheme] = useState(props.globalState.theme);
  const [stage, setStage] = useState(1);
  const [vocab, setVocab] = useState("");
  const [easterEgg, setEasterEgg] = useState("");
  const [apiData, setApiData] = useState(props.globalState.apiData);
  const [selectData, setSelectData] = useState(null);

  useEffect(() => {
    if (props.globalState.easterEgg !== "") {
      setEasterEgg(props.globalState.easterEgg);
    }
  }, [props.globalState.easterEgg]);

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
      gameView = <Play nextStage={progressNextStage} globalTimer={timer} />;
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

  return (
    <div>
      {/* <h1>게임화면</h1> */}
      {gameView}
    </div>
  );
};

export default Game;
