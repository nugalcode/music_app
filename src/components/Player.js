import { useEffect, useReducer } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'

const initialState =
{
    uris: [],
    offset: 0,
    play: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "changeUris":
            console.log("changeUris")
            return { uris: action.uris, offset: action.offset, play: false };
        case "startPlaying":
            console.log("startPlaying")
            console.log(state.offset);
            return { uris: [...state.uris], offset: state.offset, play: true };
        case "stopPlaying":
            console.log("stopPlaying");
            return { uris: action.uris, offset: action.offset, play: false };
        case "stopPlayingFromTrack":
            console.log("stopPlaying");
            return { uris: [...state.uris], offset: state.offset, play: false };
     
        default:
            throw new Error();
    }
}
export default function Player({ accessToken, offset, uris, isPlaying, pausePlayer, playPlayer }) {

    const [playerDetails, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        dispatch({ type: "changeUris", uris: uris, offset: offset });
    }, [uris, offset])

    useEffect(() => {
        if (!isPlaying) {
            dispatch({ type: "stopPlayingFromTrack" });
        }
        else if (isPlaying) {
            dispatch({ type: "startPlaying" });
        }
    }, [isPlaying])

    if (!accessToken) return null

    return <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) {
                // dispatch({ type: "stopPlayingFromTrack", uris: uris, offset: offset });
                if (isPlaying)
                    pausePlayer();
            }
            else if (state.isPlaying) {
                if (!isPlaying)
                    playPlayer();
            }
        }}
        play={playerDetails.play}
        offset={playerDetails.offset}
        uris={playerDetails.uris}
        styles={{
            activeColor: '#fff',
            bgColor: '#28282b',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#ffffff',
           
        }}
    />
 
}