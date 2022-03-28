import { useState, useEffect } from 'react';
/**
 * @param {array} tracksArr
 * custom hook that takes in an array of tracks. returns an array of the tracks' uris
 */
export default function useTracksUris(tracksArr) {

    const [uris, setUris] = useState([]);

    useEffect(() => {
        if (typeof tracksArr === 'undefined') return;

        if (!tracksArr.length) {
            setUris([]);
        }
        else {
            setUris(tracksArr.map((track) => {
                return track.uri;
            }))
        }
    }, [tracksArr]);

    return uris;
}