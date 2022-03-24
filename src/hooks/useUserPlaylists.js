/*
 *  custom hook to get user's playlists
 *  @userID and @addNewPlaylist parameters are dependencies of the useEffect.
 *  the useEffect uses the spotifyApi defined by useContext to call the api.
 * */
import { useState, useEffect, useContext } from 'react';
import { ContextApi } from '../components/Dashboard.js';

export default function useUserPlaylists(userID, addNewPlaylist) {

    const spotifyApi = useContext(ContextApi);
    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(() => {
        if (!spotifyApi || !userID) return;

        spotifyApi.getUserPlaylists(userID, { limit: 50 }).then(res => {
            setUserPlaylists(res.body.items.map((playlist, index) => {

                const images = playlist.images;
                const biggestAlbumImage = images.reduce(
                    (biggest, image) => {
                        if (image.height > biggest.height) return image
                        return biggest;
                    },
                    images[0]
                )
                const imageResult = biggestAlbumImage ? biggestAlbumImage.url : "";

                const libraryCaption = playlist.description !== "" ? playlist.description : "By " + playlist.owner.display_name;

                return {
                    name: playlist.name,
                    playlistID: playlist.id,
                    ownerID: playlist.owner.id,
                    image: imageResult,
                    caption: libraryCaption,
                };
            })
            )
        })

    }, [spotifyApi, userID, addNewPlaylist])

    return userPlaylists;

}