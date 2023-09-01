
import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import { useStateProvider } from './utiles/StateProvider'
import { reducerCases } from './utiles/constant'
import Spotify from './components/Spotify'

function App() {

  const [{token} ,dispatch]=  useStateProvider();
  useEffect(()=>{
    const hash=window.location.hash;
    console.log(hash)
    if(hash){
      const token=hash.substring(1).split("&")[0].split('=')[1] ;
      console.log(token)
      dispatch({type : reducerCases.SET_TOKEN,token});
    }
  },[token,dispatch])

  return (
    <>
    {
      token ? <Spotify /> :  <Login />
    }
 
    </>
  )
}

export default App
