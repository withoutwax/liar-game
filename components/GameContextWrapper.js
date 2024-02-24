"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const GameContext = createContext();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVaCt88HHIpwktXRD7yvp-ocmhwOm_sks",
  authDomain: "liar-game-15738.firebaseapp.com",
  projectId: "liar-game-15738",
  storageBucket: "liar-game-15738.appspot.com",
  messagingSenderId: "604644848255",
  appId: "1:604644848255:web:418478bd5426c19c09854a",
  measurementId: "G-4JGZ8JGX1V",
};

export const GameContextWrapper = ({ children }) => {
  const [playerNum, setPlayerNum] = useState(3);
  const [timer, setTimer] = useState(60);
  const [spyMode, setSpyMode] = useState(false);
  const [spyNumber, setSpyNumber] = useState(0);
  const [theme, setTheme] = useState("");
  const [themeKr, setThemeKr] = useState("");
  const [easterEgg, setEasterEgg] = useState("false");
  // const [apiData, setApiData] = useState(null);
  const [dbData, setDbData] = useState(null);

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const db = getFirestore(app);

  // console.log("db", db);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "words"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setDbData(data);
      console.log(data);
    };

    fetchData();
  }, [db]);

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
        // apiData,
        // setApiData,
        dbData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
