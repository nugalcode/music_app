import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
/*const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!currentTrack) return

        const handleFunc = () => {
            setOffset(currentTrack.offset)
        }

        handleFunc();
    }, [currentTrack])

    useEffect(() => {
        const handleFunc = () => {
            if (!uris.length) return
            console.log(uris);
            if (offset > uris.length - 1){ setOffset(0) };
            setPlay(true);
        }
        handleFunc();
    }, [uris])

    useEffect(() => {
        console.log(offset);
    }, [offset])*/
export default function Player({ accessToken, currentTrack, uris }) {
    const [play, setPlay] = useState(false);
    const [offset, setOffset] = useState(-1);
    const [currUris, setCurrUris] = useState([]);

    useEffect(() => {
        if (!uris.length) return;
        setCurrUris(uris);
        if (offset > uris.length - 1) { setOffset(0) };
    }, [uris])
    useEffect(() => {
        if (!currentTrack) return;
        setOffset(currentTrack.offset);
    }, [currUris, currentTrack])

    useEffect(() => {
        setPlay(true);
    }, [offset])
    if (!accessToken) return null

    return <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) {
                setPlay(false);
                console.log("setting play to false");
                state.needsUpdate = true;
            }
        }}
        play={play}
        offset={offset}
        uris={currUris}
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