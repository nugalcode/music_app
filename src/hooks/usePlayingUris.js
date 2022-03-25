import { useState, useEffect } from 'react';
import { usePlaylistTracks } from './customHooks';

export default function usePlayingUris(searchResults, dispatch) {
    const playlistTracks = usePlaylistTracks(dispatch.playlist);
    const [playingUris, setPlayingUris] = useState([]);

    useEffect(() => {
        if (!dispatch || !Object.keys(dispatch).length) return

        if (dispatch.type === 'track') {
            if (!searchResults.length) return;
            setPlayingUris(searchResults.map((track) => {
                return track.uri
            }));
        }
        else {
            setPlayingUris(playlistTracks.map((track) => {
                return track.uri
            }));
        }
               
    }, [dispatch, searchResults, playlistTracks])

    return playingUris;

}