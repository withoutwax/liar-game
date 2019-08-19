import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 3
        }
        this.timer = 0;
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
        return(
            <div>
                {this.state.seconds}
            </div>
        );
    }
}

export default Timer;