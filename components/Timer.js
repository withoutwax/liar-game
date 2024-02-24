import { useState, useEffect } from "react";
import { useGameContext } from "@/components/GameContextWrapper";

const Timer = ({ timerCheck }) => {
  const { timer } = useGameContext();
  const [seconds, setSeconds] = useState(60);
  const [unlimited, setUnlimited] = useState(false);

  useEffect(() => {
    if (timer === "unlimited") {
      setUnlimited(true);
      timerCheck(false);
    } else if (timer === null) {
      setSeconds(60);
    } else {
      setSeconds(timer);
    }
  }, []);

  useEffect(() => {
    if (timer !== "unlimited" && seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(timerId); // This will clear the interval while unmounting
    } else {
      timerCheck(false);
    }
  }, [seconds]); // This effect runs whenever `seconds` changes

  //   console.log({ seconds, unlimited });
  let timerColor = seconds <= 20 ? "red" : "";

  return (
    <div>
      <p>
        <span className={timerColor}>{seconds}</span> {unlimited ? "" : "초"}
      </p>
    </div>
  );
};

export default Timer;
