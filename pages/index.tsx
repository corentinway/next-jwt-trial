import type { NextPage } from 'next'
import { Login } from './login'


const Home: NextPage = () => {
  const login =  async function(username: string, password : string) : Promise<boolean> {

    // see https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    };

    const isValidCredential = await fetch('/api/login', options).then( response => {
      return response.json();
    });

    return Promise.resolve(isValidCredential); // will fail
  };

  return (
    <div>
      <Login login={login} />
    </div>
  )
}

export default Home
