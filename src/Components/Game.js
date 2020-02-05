import React from "react";
import Select from "./Select";
import Play from "./Play";
import Finish from "./Finish";
import "../scss/Game.scss";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNum: this.props.globalState.playerNum,
      timer: this.props.globalState.timer,
      spyMode: this.props.globalState.spyMode,
      spyNumber: this.props.globalState.spyNumber,
      theme: this.props.globalState.theme,
      stage: 1,
      vocab: "",
      easterEgg: "",
      apiData: this.props.globalState.apiData,
      selectData: null
    };
  }

  componentDidMount = () => {
    if (this.props.globalState.easterEgg !== "") {
      this.setState({ easterEgg: this.props.globalState.easterEgg });
    }
  };

  progressNextStage = stage => {
    this.setState({ stage: stage });
  };

  updateGlobalVocab = (vocab, selectData) => {
    this.setState({
      vocab: vocab,
      selectData: selectData
    });
  };

  render() {
    let gameView;

    switch (this.state.stage) {
      case 1:
        gameView = (
          <Select
            globalState={this.state}
            nextStage={this.progressNextStage}
            setVocab={this.updateGlobalVocab}
          />
        );
        break;
      case 2:
        gameView = (
          <Play
            nextStage={this.progressNextStage}
            globalTimer={this.state.timer}
          />
        );
        break;
      case 3:
        gameView = (
          <Finish
            nextStage={this.progressNextStage}
            liarStatus="found"
            vocab={this.state.vocab}
            theme={this.state.theme}
            selectData={this.state.selectData}
          />
        );
        break;
      case 4:
        gameView = (
          <Finish
            nextStage={this.progressNextStage}
            liarStatus="not-found"
            vocab={this.state.vocab}
            theme={this.state.theme}
            selectData={this.state.selectData}
          />
        );
        break;
      default:
        gameView = (
          <Select
            globalState={this.state}
            nextStage={this.progressNextStage}
            setVocab={this.updateGlobalVocab}
          />
        );
        break;
    }

    return (
      <div>
        {/* <h1>게임화면</h1> */}
        {gameView}
      </div>
    );
  }
}

export default Game;
