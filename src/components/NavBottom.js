import React, { useState, useContext, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ContextApi, convertDuration } from './Dashboard'

const NavBottom = ({ displayLikedSongs }) => {

    const spotifyApi = useContext(ContextApi);
    const [likedSongs, setLikedSongs] = useState([]);

    const handleClick = () => {

        if (!spotifyApi) return;

        spotifyApi.getMySavedTracks()
        .then(res => {
            console.log(res.body.items);
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
                    }
                })
            )
        }).catch(() => {
            console.log("Error getting user's saved tracks.")
            return
        })

        displayLikedSongs(likedSongs)
    }

    /*useEffect(() => {

        if (!spotifyApi || !likedSongs.length) return

        spotifyApi.getMySavedTracks()
            .then(res => {
                console.log(res.body.items);
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
                        }
                    })
                )
            }).catch(() => {
                console.log("Error getting user's saved tracks.")
            })
    }, [likedSongs])*/

    return (
        <div className="navBottom">

            <div className="navItemWrap">
                <AddBoxIcon className="navIcon" />
                <div>  Create Playlist  </div>
            </div>

            <div className="navItemWrap" onClick={() => handleClick()}>
                <FavoriteIcon className="navIcon" />
                <div>  Liked Songs  </div>
            </div>

        </div>
    )
}

export default NavBottom;