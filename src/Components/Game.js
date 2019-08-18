import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div>
                게임화면
            </div>
        );
    }
}

export default Game;