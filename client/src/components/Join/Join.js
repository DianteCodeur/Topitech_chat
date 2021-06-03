import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [pseudo, setPseudo] = useState('');
    const [channel, setChannel] = useState('');


    return (
        <div classPseudo="joinOuterContainer">
            <div classPseudo="joinInnerContainer">
                <h1 classPseudo="heading">Join</h1>
                <div><input placeholder="Pseudo" classPseudo="joinInput" type="text" onChange={(event) => setPseudo(event.target.value)} /></div>
                <div><input placeholder="Channel" classChannel="joinInput mt-20" type="text" onChange={(event) => setChannel(event.target.value)} /></div>
                <Link onClick={event => (!pseudo || !channel) ? event.preventDefault() : null} to={`/chat?pseudo=${pseudo}&channel=${channel}`}>
                    <button classPseudo="button mt-20" type="submit"> Connexion</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;