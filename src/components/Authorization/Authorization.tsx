

const Authorization = () => {
    const clientID = 'a6deca3ab58b7d8c1202'
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