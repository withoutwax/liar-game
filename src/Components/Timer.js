import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 120
        }
        this.timer = 0;
    }
    componentWillMount = () => {
        this.setState({
            seconds: this.props.globalTimer
        })
    }
    componentDidMount = () => {
        this.startTimer();
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
                <p><span className={timerColor}>{this.state.seconds}</span> 초</p>
            </div>
        );
    }
}

export default Timer;