import React from 'react';
import { Link } from 'react-router-dom';

class Finish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liarStatus: "",
            vocab: "",
            theme: "",
            guessWords: [],
            liarGuess: false,
            liarGuessText: "",
            headerText: "라이어는 단어를 선택해주세요"
        }
    }

    componentWillMount = () => {
        this.setState({
            liarStatus: this.props.liarStatus,
            vocab: "짜장면", //this.props.vocab,
            theme: this.props.theme
        });
    }
    componentDidMount = () => {
        if (this.state.liarStatus === "found"){
            const chosenTheme = {
                "food": require('../data/food.json'),
                "place": require('../data/place.json'),
                "occupation": require('../data/occupation.json')
            }
            let data = chosenTheme[this.state.theme].kr; // Currently only set to Korean
            this.setState({guessWords: this.state.guessWords.concat(data)});
        } else {
            this.setState({
                headerText: "축하합니다. 라이어를 잡았습니다!",
                liarGuess: true
            });
        }
        
    }

    liarGuess = (guess) => {
        console.log(guess.target.value, this.state.vocab);
        if (guess.target.value === this.state.vocab) {
            this.setState({
                liarGuessText: "축하합니다! 선택한 단어가 맞습니다!",
                headerText: "라이어 승"
            });
        } else {
            this.setState({
                liarGuessText: "아쉽습니다! 선택한 단어가 틀렸습니다!",
                headerText: "라이어 패"
            });
        }
        this.setState({
            liarGuess: true,
        });
    }
    

    render() {
        console.log(this.state);
        let guessCards = this.state.guessWords.map(word => {return <button key={word} value={word} onClick={this.liarGuess}>{word}</button>})
        let newGame = <Link to='/setting'>새 게임하기</Link>
        console.log(this.state.liarGuess);
        return (
            <div>
                <h2>{this.state.headerText}</h2>
                <p>{this.state.liarGuessText}</p>
                <div>{this.state.liarGuess ? newGame : guessCards}</div>
            </div>
        );
    }
}

export default Finish;