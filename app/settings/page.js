"use client";

import { useEffect } from "react";
import { useGameContext } from "@/components/GameContextWrapper";
import Link from "next/link";

export default function Settings() {
  const {
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
    easterEgg,
    setEasterEgg,
    apiData,
    setApiData,
  } = useGameContext();

  useEffect(() => {
    if (easterEgg !== "") {
      setEasterEgg(easterEgg);
    }

    // Get data from API
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {
    fetch("https://liar-game-api.withoutwax.now.sh/api/getData")
      .then((data) => data.json())
      .then((res) => {
        setApiData(res);
      });
  };

  // const updateGlobalState = () => {
  //   props.parentCallbackState({
  //     playerNum,
  //     timer,
  //     spyMode,
  //     spyNumber,
  //     theme,
  //     themeKr,
  //     easterEgg,
  //     apiData,
  //   });
  // };

  // Display 게임 시작! button when the user chooses the theme.
  let startGameButton =
    theme !== "" ? (
      <Link href="/game">게임시작!</Link>
    ) : (
      `` // Empty string
    );

  let themeButton = [];
  // After apiData state has value from the API
  if (apiData) {
    themeButton = apiData.data.map((theme) => {
      return theme.easterEgg === "false" || theme.easterEgg === easterEgg ? (
        <button
          value={theme.type}
          onClick={() => setTheme(theme.type)}
          key={theme.type}
        >
          {theme.typeKr}
        </button>
      ) : (
        "" // Empty string
      );
    });
  }

  let spyModeSelect =
    spyMode && playerNum >= 5 ? (
      <label className="mt-8">
        <select
          value={spyNumber}
          onChange={(event) => setSpyNumber(event.target.value)}
          className="w-24"
        >
          <option value="1">1</option>
          {playerNum >= 8 ? <option value="2">2</option> : ""}
          {playerNum >= 12 ? <option value="3">3</option> : ""}
          {playerNum >= 15 ? <option value="4">4</option> : ""}
          {playerNum >= 18 ? <option value="5">5</option> : ""}
        </select>
      </label>
    ) : (
      "" // Empty string
    );

  let spyModeToggle = playerNum >= 5 ? "" : "disabled";

  return (
    <section className="text-center flex flex-col">
      <h1>설정 창</h1>

      <form className="flex flex-col items-center">
        <label className="m4">
          <h2>참여인원:</h2>
          <select
            value={playerNum}
            onChange={(event) => setPlayerNum(Number(event.target.value))}
            className=""
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </label>
        <label className="set-timer">
          <h2>제한시간:</h2>
          <select
            value={timer}
            onChange={(event) => setTimer(event.target.value)}
            className=""
          >
            <option value="60">60 초</option>
            <option value="90">90 초</option>
            <option value="120">120 초 (2분)</option>
            <option value="150">150 초 (2분 30초)</option>
            <option value="180">180 초 (3분)</option>
            <option value="240">240 초 (4분)</option>
            <option value="300">300 초 (5분)</option>
            <option value="unlimited">무제한</option>
          </select>
        </label>
        <label className="mt-16">
          <span className="caption" style={{ fontSize: 1 + "rem" }}>
            **스파이 모드는 5명 이상일 경우 가능합니다!**
          </span>
          <br />
          <div
            className={`spyNumSelect disabled:opacity-50 disabled:cursor-not-allowed ${spyModeToggle}`}
          >
            스파이 모드:
            <input
              name="spyMode"
              type="checkbox"
              checked={spyMode}
              onChange={(event) => {
                let value =
                  event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value;
                if (!value) {
                  setSpyNumber(0);
                }
                setSpyMode(value);
                setSpyNumber(1);
              }}
              disabled={spyModeToggle}
            />
          </div>
          <br />
          {spyModeSelect}
        </label>
      </form>

      <div className="m-4">
        <h2>주제: {`${themeKr}`}</h2>
        {themeButton.map((button) => {
          return button;
        })}
      </div>

      <div>{startGameButton}</div>
    </section>
  );
}
