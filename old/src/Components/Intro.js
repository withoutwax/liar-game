import React from 'react';
import "../scss/Intro.scss";
import PackageJson from '../../package.json';

import  { Link } from 'react-router-dom';

class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineText: 'Game',
            easterEggMode: false,
            code01: 'onnuri',
            codeActivated: false,
            codeActivatedText: ''
        }
    }
    
    easterEgg = () => {
        console.log('You have discovered an Easter Egg 🥚 !');
        this.setState({ easterEggMode: true });
    }
    specialCode = (input) => {
        if (input.target.value === this.state.code01) {
            console.log('Activated');
            this.setState({ 
                codeActivated: true,
                codeActivatedText: "온누리 모드 Activated"
             });
             this.props.parentCallbackEasterEgg(this.state.code01);
        }
    }

    render() {
        return (
            <section className="intro-container">
                <h1>Liar <span onClick={this.easterEgg} style={{ fontSize: '3rem' }}>{ this.state.headlineText }</span></h1>
                <p>누가 거짓말을 하고 있을까요?</p>
                {this.state.easterEggMode ? <input className="easterEggInput" placeholder="코드를 입력하세요" onChange={this.specialCode}></input> : ''}
                {this.state.codeActivated ? <p className="green">{this.state.codeActivatedText}</p> : ''}
                <Link to='/setting'>게임하기</Link>
                <p className="version">version v{PackageJson.version}</p>
            </section>
        );
    }
}

export default Intro;