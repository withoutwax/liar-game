import React from 'react';
import "../scss/Intro.scss";

import  { Link } from 'react-router-dom';

function Intro({ match }) {
    return (
        <section className="intro-container">
            <h1>Liar Game</h1>
            <p>누가 거짓말을 하고 있을까요?</p>
            <Link to='/setting'>게임하기</Link>
        </section>
    );
}

export default Intro;