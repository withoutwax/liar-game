"use client";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

interface GameContextType {
  playerNum: number;
  setPlayerNum: (num: number) => void;
  timer: number | string;
  setTimer: (timer: number | string) => void;
  spyMode: boolean;
  setSpyMode: (mode: boolean) => void;
  spyNumber: number;
  setSpyNumber: (num: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  themeKr: string;
  setThemeKr: (themeKr: string) => void;
  easterEgg: string;
  setEasterEgg: (val: string) => void;
  dbData: any[]; // Using any[] for now, can be specific later
}

const GameContext = createContext<GameContextType | undefined>(undefined);

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

export const GameContextWrapper = ({ children }: { children: ReactNode }) => {
  const [playerNum, setPlayerNum] = useState<number>(3);
  const [timer, setTimer] = useState<number | string>(60);
  const [spyMode, setSpyMode] = useState<boolean>(false);
  const [spyNumber, setSpyNumber] = useState<number>(0);
  const [theme, setTheme] = useState<string>("");
  const [themeKr, setThemeKr] = useState<string>("");
  const [easterEgg, setEasterEgg] = useState<string>("false");
  // const [apiData, setApiData] = useState(null);
  const [dbData, setDbData] = useState<any[]>([]);

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
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextWrapper");
  }
  return context;
};
