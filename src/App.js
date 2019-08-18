import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import Intro from './Components/Intro';
import Setting from './Components/Setting';
import Game from './Components/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNum: "",
      spyMode: false,
      theme: ""
    }
  }

  updateGlobalState = (setting) => {
    this.setState({
      playerNum: setting.playerNum,
      spyMode: setting.spyMode,
      theme: setting.theme
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route exact path="/" component={Intro} />
            <Route path="/setting/" render={(props) => <Setting parentCallbackState={this.updateGlobalState} {...props} />} />
            <Route path="/game/" render={(props) => <Game globalState={this.state} {...props}/>} />
          </header>
        </div>
      </Router>
    )
  };
}

export default App;
