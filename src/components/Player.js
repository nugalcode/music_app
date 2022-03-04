import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
//uris = { trackUri? [trackUri]: [] }
export default function Player({ accessToken, currentTrack, tracks }) {
    const [play, setPlay] = useState(false);
    const [uris, setUris] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setUris(
            tracks.map((track) =>
            {
                return track.uri
            })
        )
    }, [tracks])
    
    useEffect(() => {
        if (!currentTrack) return

        setPlay(true);
        setOffset(currentTrack.offset)
    }, [currentTrack])

    if (!accessToken) return null

    return <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        offset={offset}
        uris={uris}
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