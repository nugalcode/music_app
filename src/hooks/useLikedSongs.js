import { useState, useEffect, useContext } from 'react';
import { ContextApi, convertDuration } from '../components/Dashboard.js'

export default function useLikedSongs(userID, isLiked) {
    const [likedSongs, setLikedSongs] = useState([]);
    const spotifyApi = useContext(ContextApi);
    
    useEffect(() => {
        if (!userID) {
            return;
        }
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
            }).catch((err) => {
                console.log("Error trying to get user's saved tracks.");
                console.log(err);
            })
    },[userID, isLiked])
        
    return likedSongs;
}
