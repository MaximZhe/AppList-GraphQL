import React, { useEffect } from 'react';
import axios from 'axios'
function Callback() {
    const clientID = import.meta.env.VITE_API_ID
    const clientSECRET = import.meta.env.VITE_API_SECRET
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
            console.log(clientID)
            const fetchData = async () => {
                try {
                  const datas = {
                    client_id: `${clientID}`,
                    client_secret: `${clientSECRET}`,
                    code: `${code}`,
                    redirect_uri:'http://localhost:5173/callback'
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