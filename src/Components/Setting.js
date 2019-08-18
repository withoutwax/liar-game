import React from 'react';
import '../scss/Setting.scss';
import { Link } from 'react-router-dom';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNum: "3",
            spyMode: false,
            theme: ""
        }
    }

    selectMenuChange = (event) => {
        this.setState({playerNum: event.target.value});
        this.props.parentCallbackPlayerNum(event.target.value);
        console.log(event.target.value, this.state.playerNum);
    }
    spyModeSelect = (event) => {
        // console.log(this.state.spyMode);
        console.log(event.target.type);
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        this.setState({
            spyMode: value
        });
    }
    setTheme = (event) => {
        console.log(event.target.value);
        this.setState({theme: event.target.value});
    }

    render() {
        
        // Display 게임 시작! button when the user chooses the theme.
        let startGameButton = this.state.theme !== "" ? (<Link to='/game'>게임시작!</Link>) : ``;

        return (
            <section className="setting-container">
                <h1>설정 창</h1>

                <form>
                    <label>
                        참여인원: {this.state.playerNum}
                        <select value={this.state.value} onChange={this.selectMenuChange}>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <label>
                        {`스파이 모드: ${this.state.spyMode}`}
                        <input 
                            name="spyMode"
                            type="checkbox"
                            checked={this.state.spyMode}
                            onChange={this.spyModeSelect}
                        />
                    </label>
                </form>

                <div>
                    <h2>주제: {`${this.state.theme}`}</h2>
                    <button value="food" onClick={this.setTheme}>음식</button>
                    <button value="place" onClick={this.setTheme}>장소</button>
                    <button value="occupation" onClick={this.setTheme}>직업</button>
                </div>

                {startGameButton}
                
            </section>
            );
    }
}

export default Setting;