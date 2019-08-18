import React from 'react';
import '../scss/Game.scss';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNum: null,
            spyMode: null,
            theme: "",
            vocab: "",
            liar: 1,
            buttonDisabled: []
        }
    }

    // Update State
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

    componentDidMount = () => {
        const chosenTheme = {
            "food": require('../data/food.json'),
            "place": require('../data/place.json'),
            "occupation": require('../data/occupation.json')
        }
        let data= chosenTheme[this.state.theme].kr; // Currently only set to Korean

        // Generate a random number to choose the menu
        let randomIndex = Math.floor(Math.random() * data.length);
        let chooseLiar = Math.floor(Math.random() * this.state.playerNum);

        this.setState({ 
            vocab: data[randomIndex],
            liar: chooseLiar
        });
    }
    showCard = (event) => {
        let button = Number(event.target.id);
        
        if (this.state.buttonDisabled.includes(button) === false) {

            this.setState({
                buttonDisabled: this.state.buttonDisabled.concat(button)
            });
        }

        console.log("THIS.STATE", this.state);
    }

    render() {
        console.log("PROPS:", this.props);
        let defaultText = "선택하세요";
        console.log(this.state.buttonDisabled.includes(0));
        
        let playersCard = []
        for (let i = 0; i < this.state.playerNum; i++) {
            if (i === this.state.liar) {
                playersCard.push(<button className={`playersCard liar ${this.state.buttonDisabled.includes(i) ? 'disable' : ''}`} disabled={this.state.buttonDisabled.includes(i) ? true : false} key={i} id={i} onClick={this.showCard}>{defaultText}</button>)
            } else {
                playersCard.push(<button className={`playersCard no-liar ${this.state.buttonDisabled.includes(i) ? 'disable' : ''}`} disabled={this.state.buttonDisabled.includes(i) ? true : false} key={i} id={i} onClick={this.showCard}>{defaultText}</button>)
            }
        }

        return (
            <div>
                <h1>게임화면</h1>
                { playersCard }
            </div>
        );
    }
}

export default Game;