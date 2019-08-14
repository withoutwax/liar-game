import React, { useState } from 'react';
import './App.scss';
import Intro from './Components/Intro';
import Setting from './Components/Setting';

function App() {
  const [introduction, gameStart] = useState(true);

  if (introduction) {
    return (
      <div className="App">
        <header className="App-header">
          <Intro />
          <button onClick={() => gameStart(false)}>게임하기</button>
        </header>
      </div>
      );
  } else {
    return <Setting />
  }
}

export default App;
