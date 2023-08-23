import  { useEffect } from 'react';
import axios from 'axios'
function Callback() {
    const clientID = 'a6deca3ab58b7d8c1202'
    const clientSECRET = 'a0f99e475af301984866e440c4e5ff3ddd1a28f3'
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
            console.log(clientID)
            const fetchData = async () => {
                try {
                  const datas = {
                    client_id: clientID,
                    client_secret: clientSECRET,
                    code: code,
                    redirect_uri:'https://maximzhe.github.io/AppList-GraphQL/callback'
                  };
          
                  const response = await axios.post('https://github.com/login/oauth/access_token',
                    datas,
                    {
                      headers: {
                        Accept: 'application/json'
                      }
                    }
                  );
          
                  const accessToken = response.data;
                  console.log(accessToken)
                  // Дальнейшая обработка полученного токена
                } catch (error) {
                  // Обработка ошибок при запросе токена
                }
              };
          
              fetchData();
    }, []);

    return (
        <div>
            <h1>Получение токена...</h1>
        </div>
    );
}

export default Callback;