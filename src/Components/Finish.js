import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Finish.scss';

class Finish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liarStatus: this.props.liarStatus,
            vocab: this.props.vocab,
            theme: this.props.theme,
            liarGuess: false,
            liarGuessText: "",
            headerText: "라이어는 단어를 선택해주세요",
            liarWin: true,
            selectData: this.props.selectData
        }
    }

    componentDidMount = () => {
        if (this.state.liarStatus !== "found"){
            console.log("Could not find liar");
            this.setState({
                liarGuessText: "라이어를 찾지 못하였습니다!",
                headerText: "라이어가 승리하였습니다!",
                liarGuess: true
            });
        } 
    }

    liarGuess = (guess) => {
        console.log(guess.target.value, this.state.vocab);
        if (guess.target.value === this.state.vocab) {
            this.setState({
                liarGuessText: "선택한 단어가 맞습니다!",
                headerText: "라이어가 승리하였습니다!",
                liarWin: true
            });
        } else {
            this.setState({
                liarGuessText: `틀렸습니다! 선택된 단어는: ${this.state.vocab}`,
                headerText: "라이어가 패하였습니다!",
                liarWin: false
            });
        }
        this.setState({
            liarGuess: true,
        });
    }
    
    render() {
        console.log(this.state);
        let guessCards = this.state.selectData.map(word => {return <button className="guess-cards" key={word} value={word} onClick={this.liarGuess}>{word}</button>})
        let newGame = <Link to='/setting'>새 게임하기</Link>
        console.log(this.state.liarGuess);
        let headerColor = 'white'
        if (this.state.liarGuess) {
            headerColor = this.state.liarWin ? 'green' : 'red';
        }
        return (
            <div className="finish-container">
                <h2 className={headerColor}>{this.state.headerText}</h2>
                <p>{this.state.liarGuessText}</p>
                <div className="guess-card-container">{this.state.liarGuess ? newGame : guessCards}</div>
            </div>
        );
    }
}

export default Finish;