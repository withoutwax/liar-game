import React, { useState, useEffect } from "react";
import { useGameContext } from "@/components/GameContextWrapper";
import Timer from "@/components/Timer";

const Play = ({ nextStage }) => {
  const { timer } = useGameContext();

  const [displayStatus, setDisplayStatus] = useState("게임 시작!");
  const [displayStatus02, setDisplayStatus02] = useState(
    "게임이 시작되었습니다! 라이어를 찾아주세요!"
  );
  const [findLiar, setFindLiar] = useState(false);

  useEffect(() => {
    if (timer === "unlimited") {
      setDisplayStatus("시간은 무제한입니다.");
      setDisplayStatus02("준비가 되면 아래의 버튼을 선택하여 진행해주세요.");
      setFindLiar(true);
    } else {
      setDisplayStatus("게임 시작!");
      setDisplayStatus02("게임이 시작되었습니다! 라이어를 찾아주세요!");
      setFindLiar(false);
    }
  }, []);

  const checkTimerEnds = (timer) => {
    let text = "시간이 다 되었습니다! 라이어를 지목해주세요!";

    setDisplayStatus(text);
    setDisplayStatus02("");
    setFindLiar(true);
  };

  const liarStatus = (status) => {
    switch (status.target.value) {
      case "liar-found":
        nextStage(3);
        break;
      case "liar-not-found":
        nextStage(4);
        break;
      default:
        nextStage(4);
        break;
    }
  };

  let findLiarButton01 = (
    <button key="1" value="liar-found" onClick={liarStatus}>
      라이어를 찾았습니다!
    </button>
  );
  let findLiarButton02 = (
    <button key="2" value="liar-not-found" onClick={liarStatus}>
      라이어를 찾지 못했습니다!
    </button>
  );
  let findLiarButton = [findLiarButton01, findLiarButton02];

  return (
    <div className="">
      <h1>{displayStatus}</h1>
      <p className="mt-2">{displayStatus02}</p>
      <div className="mt-12">
        {timer === "unlimited" ? <></> : <Timer timerCheck={checkTimerEnds} />}
      </div>
      <div className="grid gap-0">
        {findLiar
          ? findLiarButton.map((element) => {
              return element;
            })
          : ""}
      </div>
    </div>
  );
};

export default Play;
