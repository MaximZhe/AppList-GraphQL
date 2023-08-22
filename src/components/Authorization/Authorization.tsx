import React, { useEffect } from 'react';

const Authorization = () => {
    const clientID = import.meta.env.VITE_API_ID
    const clientSECRET = import.meta.env.VITE_API_SECRET
    const loginAut = () => {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientID}`)
    }
    return (
        <div>
      <h1>Авторизация через GitHub</h1>
      <button onClick={loginAut}>Log In</button>
    </div>
    );
};

export default Authorization;