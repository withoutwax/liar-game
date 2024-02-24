import React, { useState } from "react";
import PackageJson from "@/package.json";
import Link from "next/link";

const Intro = () => {
  const [headlineText] = useState("Game");
  const [easterEggMode, setEasterEggMode] = useState(false);
  const [code01] = useState("onnuri");
  const [codeActivated, setCodeActivated] = useState(false);
  const [codeActivatedText, setCodeActivatedText] = useState("");

  const easterEgg = () => {
    console.log("You have discovered an Easter Egg 🥚 !");
    setEasterEggMode(true);
  };

  const specialCode = (input) => {
    if (input.target.value === code01) {
      console.log("Activated");
      setCodeActivated(true);
      setCodeActivatedText("온누리 모드 Activated");
      this.props.parentCallbackEasterEgg(code01);
    }
  };

  return (
    <section className="text-center flex flex-col">
      <h1 className="my-1 mx-0">
        Liar{" "}
        <span className="text-[2.5rem]" onClick={easterEgg}>
          {headlineText}
        </span>
      </h1>
      <p className="mb-8">누가 거짓말을 하고 있을까요?</p>
      {easterEggMode ? (
        <input
          className="easterEggInput mb-6 rounded-md text-base p-2"
          placeholder="코드를 입력하세요"
          onChange={specialCode}
        ></input>
      ) : (
        ""
      )}
      {codeActivated ? (
        <p className="mb-8 bg-transparent text-white text-lg p-4 border border-light-blue-300">
          {codeActivatedText}
        </p>
      ) : (
        ""
      )}
      <Link href="/settings">게임하기</Link>
      <p className="mt-20 text-base">version v{PackageJson.version}</p>
    </section>
  );
};

export default Intro;
