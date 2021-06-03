import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [channel, setChannel] = useState('');


    return (
        <div classPseudo="joinOuterContainer">
            <div classPseudo="joinInnerContainer">
                <h1 classPseudo="heading">User Log In</h1>
                <div><input placeholder="Pseudo" classPseudo="joinInput" type="text" onChange={(event) => setPseudo(event.target.value)} /></div>
                <div><input placeholder="Password" classPassword="joinInput" type="password" onChange={(event) => setPassword(event.target.value)} /></div>
                <div><input placeholder="Channel" classChannel="joinInput mt-20" type="text" onChange={(event) => setChannel(event.target.value)} /></div>
                <Link onClick={event => (!pseudo || !password || !channel) ? event.preventDefault() : null} to={`/chat?pseudo=${pseudo}&password=${password}&channel=${channel}`}>
                    <button classPseudo="button mt-20" type="submit"><a href="../Join.js"></a>Connexion</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;