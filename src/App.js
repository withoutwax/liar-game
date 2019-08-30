import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.scss';

import Intro from './Components/Intro';
import Setting from './Components/Setting';
import Game from './Components/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNum: null,
      timer: null,
      spyMode: false,
      theme: "",
      easterEgg: "",
      apiData: null
    }
  }

  activateEasterEgg = (code) => {
    this.setState({
      easterEgg: code
    });
  }

  updateGlobalState = (setting) => {
    this.setState({
      playerNum: setting.playerNum,
      timer: setting.timer,
      spyMode: setting.spyMode,
      theme: setting.theme,
      apiData: setting.apiData
    });
  }

  render() {
    return (
      <HashRouter basename='/'>
        <div className="App">
          <Route exact path="/" render={(props) => <Intro parentCallbackEasterEgg={this.activateEasterEgg} {...props} />} />
          <Route path="/setting/" render={(props) => <Setting parentCallbackState={this.updateGlobalState} globalState={this.state} {...props} />} />
          <Route path="/game/" render={(props) => <Game globalState={this.state} {...props}/>} />
        </div>
      </HashRouter>
    )
  };
}

export default App;
