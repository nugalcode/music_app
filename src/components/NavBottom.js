import React, { useState, useContext, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ContextApi, convertDuration } from './Dashboard'

const NavBottom = ({ addNewPlaylist, displayLikedSongs }) => {

    const spotifyApi = useContext(ContextApi);
    const [likedSongs, setLikedSongs] = useState([]);

    // get the user's liked songs
    const getLikedSongs = () => {

        if (!spotifyApi) return;

        spotifyApi.getMySavedTracks()
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
                    }
                })
            )
        }).catch(() => {
            console.log("Error getting user's saved tracks.")
            return
        })
    }
    // triggers when user's liked songs is fetched. calls the props function
    useEffect(() => {
        if (!likedSongs.length) return
        displayLikedSongs(likedSongs)
    }, [displayLikedSongs, likedSongs])

    // add a new playlist 
    const createPlaylist = () => {
        if (!spotifyApi) return

        spotifyApi.createPlaylist('test playlist api', { 'description': 'test description', 'public': true })
            .then(function (data) {
                console.log('Created playlist!');
                const playlist = data.body;
                addNewPlaylist({
                    name: playlist.name,
                    playlistID: playlist.id,
                    ownerID: playlist.owner.id,
                });
            }, function (err) {
                console.log('Error trying to create playlist!', err);
            });
    }

    return (
        <div className="navBottom">

            <div className="navItemWrap" onClick={() => createPlaylist()}>
                <AddBoxIcon className="navIcon" />
                <div>  Create Playlist  </div>
            </div>

            <div className="navItemWrap" onClick={() => getLikedSongs()}>
                <FavoriteIcon className="navIcon" />
                <div>  Liked Songs  </div>
            </div>

        </div>
    )
}

export default NavBottom;