import { useContext, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
import { ACTIONS, playDetailsDispatchContext, playDetailsStateContext } from "../hooks/playDetailsContext";

export default function Player({ accessToken }) {
    const dispatch = useContext(playDetailsDispatchContext);
    const  playDetailsState  = useContext(playDetailsStateContext);

    function handleStopPlayingCallback() {
        if (playDetailsState.play) {
            dispatch({ type: ACTIONS.STOPPLAYING })
        }
    }

    function handleStartPlayingCallback() {
        if (!playDetailsState.play) {
            dispatch({ type: ACTIONS.STARTPLAYING })
        }
    }

    useEffect(() => {
        if (!playDetailsState.uris.length) return;

        dispatch({ type: ACTIONS.STARTPLAYING });
    }, [playDetailsState.uris, dispatch])

    if (!accessToken) return null

    return <SpotifyPlayer
        token={accessToken}
        callback={state => {
            if (!state.isPlaying) {
                handleStopPlayingCallback();
               
            }
            else if (state.isPlaying) {
                handleStartPlayingCallback();
            }
        }}
        play={playDetailsState.play}
        offset={playDetailsState.offset}
        uris={playDetailsState.uris}
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