"use client";

// import React, { useState } from "react";

import Intro from "@/components/Intro";
// import Setting from "@/components/Setting";
// import Link from "next/link";

// import ReactGoogleAnalytics from "react-ga";

// ReactGoogleAnalytics.initialize("UA-45795165-2");
// ReactGoogleAnalytics.pageview("/");

export default function Home() {
  // const [playerNum, setPlayerNum] = useState(null);
  // const [timer, setTimer] = useState(null);
  // const [spyMode, setSpyMode] = useState(false);
  // const [spyNumber, setSpyNumber] = useState(0);
  // const [theme, setTheme] = useState("");
  // const [easterEgg, setEasterEgg] = useState("");
  // const [apiData, setApiData] = useState(null);

  // const activateEasterEgg = (code) => {
  //   setEasterEgg(code);
  // };

  // const updateGlobalState = (setting) => {
  //   setPlayerNum(setting.playerNum);
  //   setTimer(setting.timer);
  //   setSpyMode(setting.spyMode);
  //   setSpyNumber(setting.spyNumber);
  //   setTheme(setting.theme);
  //   setApiData(setting.apiData);
  // };

  return (
    <div className="">
      <Intro />
      {/* <Setting /> */}
      {/* <Route
        exact
        path="/"
        render={(props) => (
          <Intro parentCallbackEasterEgg={activateEasterEgg} {...props} />
        )}
      />
      <Route
        path="/setting/"
        render={(props) => (
          <Setting
            parentCallbackState={updateGlobalState}
            globalState={{
              playerNum,
              timer,
              spyMode,
              spyNumber,
              theme,
              apiData,
            }}
            {...props}
          />
        )}
      />
      <Route
        path="/game/"
        render={(props) => (
          <Game
            globalState={{
              playerNum,
              timer,
              spyMode,
              spyNumber,
              theme,
              apiData,
            }}
            {...props}
          />
        )}
      /> */}
    </div>
  );
}
