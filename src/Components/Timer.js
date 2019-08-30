import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 60,
            unlimited: false
        }
        this.timer = 0;
    }

    componentDidMount = () => {
        if (this.props.globalTimer === "unlimited") {
            this.setState ({
                seconds: "시간은 무제한 입니다",
                unlimited: true
            });
            this.props.timerCheck(false);
        } else if (this.props.globalTimer === null) {
            this.setState({seconds: 60})
            this.startTimer();
        } else {
            this.setState({
                seconds: this.props.globalTimer
            });
            this.startTimer();
        }
    }
    
    countDown = () => {
        let seconds = this.state.seconds - 1;
        this.setState({ seconds: seconds });

        if (seconds === 0) {
            clearInterval(this.timer);
            this.props.timerCheck(false);
        }
    }

    startTimer = () => {
        this.timer = setInterval(this.countDown, 1000);
    }

    render() {
        console.log(this.state);
        let timerColor = this.state.seconds <= 20 ? "red" : "";
        return(
            <div>
                <p><span className={timerColor}>{this.state.seconds}</span> {this.state.unlimited ? '' : '초'}</p>
            </div>
        );
    }
}

export default Timer;