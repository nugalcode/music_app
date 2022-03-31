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
            return { uris: action.uris, offset: action.offset, play: true };
        case "changeOffset":
            return { uris: action.uris, offset: action.offset, play: true };
        case "stopPlaying":
            return { uris: action.uris, offset: action.offset, play: false };
        default:
            throw new Error();
    }
}
export default function Player({ accessToken, offset, uris }) {

    const [playerDetails, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "changeUris", uris: uris, offset: offset });
    }, [uris, offset])

    if (!accessToken) return null

    return <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) {
                dispatch({type: "stopPlaying"});
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