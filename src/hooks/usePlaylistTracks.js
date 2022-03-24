import { useState, useEffect, useContext } from 'react';
import { ContextApi, convertDuration } from '../components/Dashboard';
/**
 * custom hook that gets and returns the passed in playlist's tracks
 * @playlist triggers the useEffect, which calls the spotifyApi to get the playlist's tracks
 */
export default function usePlaylistTracks(playlist) {

    const spotifyApi = useContext(ContextApi);
	const [playlistTracks, setPlaylistTracks] = useState([]);

    // get the clicked playlist tracks and set search results accordingly
    useEffect(() => {
        // Object.keys is a built-in javascript method to check if an object is empty
        // I'm doing this because checking if an object is empty (i.e. !object) does not work
        // as expected like it does with arrays or strings
        if (!spotifyApi || !Object.keys(playlist).length || !playlist.playlistID) return;

        spotifyApi.getPlaylistTracks(playlist.playlistID).then(res => {
            console.log("in usePlaylistTracks");
            setPlaylistTracks(
                res.body.items.map((item, index) => {
                    const track = item.track;
                    // find the smallest album image
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest;
                        },
                        track.album.images[0]
                    )

                    const duration = convertDuration(track.duration_ms);

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumName: track.album.name,
                        albumUrl: smallestAlbumImage.url,
                        duration: duration,
                        offset: index,
                        id: track.id,
                    }
                })
            )
        }).catch(() => {
            console.log("Error trying to get playlist tracks");
        })

    }, [playlist, spotifyApi])

    return playlistTracks;
}