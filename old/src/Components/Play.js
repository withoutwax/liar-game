import React from 'react';
import Timer from './Timer';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayStatus: "게임 시작!",
            displayStatus02: "게임이 시작되었습니다! 라이어를 찾아주세요!",
            findLiar: false
        }
        
    }

    checkTimerEnds = (timer) => {
        console.log("Check Timer", timer);
        let text = "시간이 다 되었습니다! 라이어를 지목해주세요!"
        if (this.props.globalTimer === "unlimited") {
            text = "준비가 되면 아래의 버튼을 선택하여 진행해주세요.";
        }
        this.setState({
            displayStatus: text,
            displayStatus02: "",
            findLiar: true
        });
    }

    liarStatus = (status) => {
        console.log(status.target.value);
        switch(status.target.value) {
            case "liar-found":
                this.props.nextStage(3);
                break;
            case "liar-not-found":
                this.props.nextStage(4);
                break;
            default:
                this.props.nextStage(4);
                break;
        }
        
    }

    render() {
        let findLiarButton01 = <button key="1" value="liar-found" onClick={this.liarStatus}>라이어를 찾았습니다!</button>;
        let findLiarButton02 = <button key="2" value="liar-not-found" onClick={this.liarStatus}>라이어를 찾지 못했습니다!</button>;
        let findLiarButton = [findLiarButton01, findLiarButton02];
        return (
            <div>
                <h1>{this.state.displayStatus}</h1>
                <p>{this.state.displayStatus02}</p>
                <Timer timerCheck={this.checkTimerEnds} globalTimer={this.props.globalTimer}/>
                {this.state.findLiar ? findLiarButton.map(element => { return element}) : ''}
            </div>
        );
    }
}

export default Play;