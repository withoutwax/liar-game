import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {
                "Minutes": 0,
                "Seconds": 0
            },
            seconds: 120
        }
        this.timer = 0;
    }

    componentDidMount = () => {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    
    secondsToTime = (secs) => {
        
    }   

    startTimer = () => {
        this.timer = setInterval(this.countDown, 1000);
    }

    render() {
        return(
            <div>
                
            </div>
        );
    }
}

export default Timer;