import React from 'react';
import Select from './Select';
import Play from './Play';
import Finish from './Finish';
import '../scss/Game.scss';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNum: null,
            spyMode: null,
            theme: "",
            stage: 1,
            vocab: ""
            // liar: 1,
            // buttonDisabled: [],
            // displayStatus: "플레이어를 선택해주세요",
            // buttonDisabledText: "확인했습니다!",
            // beginGame: false
        }
    }

    componentWillMount = () => {
        // TODO: Uncomment after testing. This code updates data with Global Setting
        if (this.props.globalState.playerNum === "" || this.props.globalState.theme === "") {
            this.setState({
                playerNum: 3,
                spyMode: false,
                theme: "food"
            });
        } else {
            this.setState({
                playerNum: this.props.globalState.playerNum,
                spyMode: this.props.globalState.spyMode,
                theme: this.props.globalState.theme
            });
        }
    }

    progressNextStage = (stage) => {
        this.setState({stage: stage});
    }

    updateGlobalVocab = (vocab) => {
        this.setState({vocab: vocab});
    }

    

    render() {
        let gameView;

        switch(this.state.stage) {
            case 1:
                gameView = <Select globalState={this.state} nextStage={this.progressNextStage} setVocab={this.updateGlobalVocab}/>;
                break;
            case 2:
                gameView = <Play nextStage={this.progressNextStage}/>;
                break;
            case 3:
                gameView = <Finish nextStage={this.progressNextStage} liarStatus='found' vocab={this.state.vocab} theme={this.state.theme} />
                break;
            case 4:
                gameView = <Finish nextStage={this.progressNextStage} liarStatus='not-found' vocab={this.state.vocab} theme={this.state.theme} />
                break;
        }

        return (
            <div>
                <h1>게임화면</h1>
                { gameView }

            </div>
        );
    }
}

export default Game;