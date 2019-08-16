import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import Intro from './Components/Intro';
import Setting from './Components/Setting';
import Game from './Components/Game';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Intro} />
          <Route path="/setting/" component={Setting} />
          <Route path="/game/" component={Game} />
        </header>
      </div>
    </Router>
  );
}

export default App;
