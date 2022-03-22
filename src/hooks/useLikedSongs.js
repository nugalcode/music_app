import { useState, useEffect, useContext } from 'react';
import { ContextApi, convertDuration } from '../components/Dashboard';

const useLikedSongs = () => {
    const spotifyApi = useContext(ContextApi);
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        if (!spotifyApi) return;

        spotifyApi.getMySavedTracks({ limit: 50 })
            .then(res => {
                setLikedSongs(
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
                console.log("Error getting user's saved tracks.")
                return
            })
    },[spotifyApi])
        
    return likedSongs;
}

export default useLikedSongs;