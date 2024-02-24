"use client";
import { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const GameContextWrapper = ({ children }) => {
  const [playerNum, setPlayerNum] = useState(3);
  const [timer, setTimer] = useState(60);
  const [spyMode, setSpyMode] = useState(false);
  const [spyNumber, setSpyNumber] = useState(0);
  const [theme, setTheme] = useState("");
  const [themeKr, setThemeKr] = useState("");
  const [easterEgg, setEasterEgg] = useState("false");
  const [apiData, setApiData] = useState(null);

  return (
    <GameContext.Provider
      value={{
        playerNum,
        setPlayerNum,
        timer,
        setTimer,
        spyMode,
        setSpyMode,
        spyNumber,
        setSpyNumber,
        theme,
        setTheme,
        themeKr,
        setThemeKr,
        easterEgg,
        setEasterEgg,
        apiData,
        setApiData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
