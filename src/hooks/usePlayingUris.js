import { useEffect, useReducer, useContext } from 'react';
import { ContextApi } from '../components/Dashboard';

export default function usePlayingUris(searchResults, dispatch) {
    const spotifyApi = useContext(ContextApi);

    const [playingUris, setPlayingUris] = useReducer((state, action) => {
        switch (action.type) {
            case 'track':
                console.log("in case track")
                if (!searchResults.length) return
                return searchResults.map((track) => {
                    return track.uri
                })
            case 'playlist':
                return action.result;
            default:
                return state;
        }
	},[]);

    useEffect(() => {
        if (!dispatch || !Object.keys(dispatch).length) return
        
        setPlayingUris({
            type: dispatch.type,
            playlist: dispatch.playlist
        });
               
    }, [dispatch])

    return playingUris;

}