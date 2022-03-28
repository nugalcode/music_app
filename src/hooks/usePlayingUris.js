import { useState, useEffect } from 'react';
import { usePlaylistTracks, useTracksUris } from './customHooks';

export default function usePlayingUris(searchResults, dispatch) {
    const [playingUris, setPlayingUris] = useState([]);
    const playlistTracks = usePlaylistTracks(dispatch.playlist);
    const searchResultUris = useTracksUris(searchResults);
    const playlistUris = useTracksUris(playlistTracks);

    useEffect(() => {
        if (!dispatch || !Object.keys(dispatch).length || dispatch.type === '') return;
        if (dispatch.type === 'track') {
            setPlayingUris(searchResultUris);
        }
        else {
            setPlayingUris(playlistUris);
        }

    }, [dispatch, playlistUris, searchResultUris])

    return playingUris;

}