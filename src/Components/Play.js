import React from 'react';
import Timer from './Timer';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayStatus: "게임 시작!",
            findLiar: false
        }
        
    }

    checkTimerEnds = (timer) => {
        console.log("Check Timer", timer);

        this.setState({
            displayStatus: "시간이 다 되었습니다! 라이어를 지목해주세요!",
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
                <h2>{this.state.displayStatus}</h2>
                <Timer timerCheck={this.checkTimerEnds}/>
                {this.state.findLiar ? findLiarButton.map(element => { return element}) : ''}
            </div>
        );
    }
}

export default Play;