import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import Footer from './Footer'
import { useStateProvider } from '../utiles/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utiles/constant'
import Body from './Body'


const Container=styled.div`
max-width:100vw;
max-height:100vh;
overflow:hidden;
display:grid;
grid-template-rows:85vh 15vh;
.spotify_body{
    display:grid;
    grid-template-columns:15vw 85vw;
    height:100%;
    width:100%;
    background:linear-gradient(transparent,rgba(0,0,0,1));
    background-color:rgb(32,87,100);
    .body{
        height:100%;
        width:100%;
        overflow:auto;
        &::-webkit-scrollbar{
            width:0.3rem;
            &-thumb{
                background-color:rgba(255,255,255,0.6);
            }
        }


    }
}


`
const Spotify=() =>{
    const [{token,dispatch}]=useStateProvider();
    const bodyRef=useRef();
    const[navBackground,setNavBackground]=useState(false);
    const[headerBackground,setHeaderBackground]=useState(false);
    const bodyScrolled=()=>{
        bodyRef.current.scrollTop  >= 30 ? setNavBackground(true):setNavBackground(false);
        bodyRef.current.scrollTop >=268 ? setHeaderBackground(true) : setHeaderBackground(false);
    }

    const [name,setName]=useState();
    useEffect(()=>{
        const getUserInfo=async()=>{
             const {data}=await axios.get("https://api.spotify.com/v1/me",{
                headers:{
                    Authorization:"Bearer " + token,
                    "Content-Type":"application/json",

                }
             })
            //  console.log('data',data)
             const userInfo={
                 userId:data.id,
                 userName:data.display_name,
                };
            //     // dispatch({type:reducerCases.SET_USER,userInfo})
            //     console.log('hh',userInfo?.userName)
            
            setName(userInfo?.userName)
        }
        getUserInfo(); 


    },[dispatch,token])
  return (
    <Container>
        <div className="spotify_body">
          
            <Sidebar />
            <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar name={name} navBackground={navBackground}/>
                <div className="body_contents">
                    <Body headerBackground={headerBackground}/>

                </div>
            </div>
        </div>
        <div className="spotify_footer">
            <Footer />

        </div>
        
        </Container>
  )
}

export default Spotify