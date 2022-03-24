import { useState, useEffect, useContext } from 'react';
import { ContextApi } from '../components/Dashboard.js';

/**
 * custom hook that checks every track inside searchResults if it is in user's Saved Tracks
 * This information is used to display/not display a Favorite Icon next to each Track.
 * @searchResults parameter is an array that contains Tracks
 */
export default function useContainsSavedTracks(searchResults) {

    const [isLiked, setIsLiked] = useState([]);
    const spotifyApi = useContext(ContextApi);

    // when searchResults changes, check which tracks are in the liked songs playlist
    // doing batch check to avoid Error 429: too many api requests
    useEffect(() => {
        if (!searchResults.length || !spotifyApi) return
        const checkIfLiked = () => {
            const results = searchResults;
            var tracksToCheck = (results.map((track) => {
                return track.id
            })
            )
            // Spotify API has limit of 50 track checks per query
            var lastIndex = -1;
            const length = tracksToCheck.length;
            if ((length > 0) && (length < 50)) {
                lastIndex = length - 1;
            }
            else {
                lastIndex = 49;
            }

            const temp = lastIndex === 0 ? tracksToCheck : tracksToCheck.slice(0, lastIndex);
            if (!temp.length) return

            spotifyApi.containsMySavedTracks(temp)
                .then((res) => {
                    setIsLiked(res.body.map((result) => {
                        return result
                    })
                    )
                }).catch((err) => {
                    console.log("Error checking if tracks are in user's Liked Songs")
                    console.log(err);
                })
        }

        checkIfLiked();
    }, [searchResults])

    return isLiked;
}

