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
    componentWillMount = () => {
        if (this.props.globalTimer === "unlimited") {
            this.setState ({
                seconds: "시간은 무제한 입니다",
                unlimited: true
            });
            this.props.timerCheck(false);
        } else {
            this.setState({
                seconds: this.props.globalTimer
            });
        }
    }
    componentDidMount = () => {
        if (this.state.unlimited === false) {
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
        let timerColor = this.state.seconds <= 20 ? "red" : "";
        return(
            <div>
                <p><span className={timerColor}>{this.state.seconds}</span> {this.state.unlimited ? '' : '초'}</p>
            </div>
        );
    }
}

export default Timer;