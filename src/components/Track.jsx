import axios from 'axios';
import React, { useEffect } from 'react'
import { useStateProvider } from '../utiles/StateProvider';
import { styled } from 'styled-components';
import { reducerCases } from '../utiles/constant';


const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;
const Track=()=> {
    const[{token,currentlyPlaying},dispatch]=useStateProvider();
    useEffect(()=>{
        const getTrack=async() =>{
            const response=await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers:{
                    Authorization:"Bearer " + token,
                    "Content-Type":"application/json",

                }
            })
          
            if(response.data !==""){
                const {item}=response.data;
                const currentlyPlaying = {
                    id: response.data.item.id,
                    name: response.data.item.name,
                    artists: response.data.item.artists.map((artist) => artist.name),
                    image: response.data.item.album.images[2].url,
                  };
            }
            dispatch({type : reducerCases.SET_PLAYING,currentlyPlaying});
          
            console.log("track",response)
        }
        getTrack();
    },[token,dispatch]);
  return (
    <Container>

{currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentlyPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  )
}

export default Track