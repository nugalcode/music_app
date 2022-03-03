import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import '../css/Dashboard.css';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '8f9b068eeffc4fd0a27b7599b1df9050',
})

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!searchTerm) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;

        spotifyApi.searchTracks(searchTerm).then(res => {
            // if a new request comes in before a request finishes, then cancel previous one
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    // find the smallest album image
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest;
                        },
                        track.album.images[0]
                    )
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })

        
        return () => cancel = true;
    }, [searchTerm, accessToken]);

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    /*const handleOnSubmit = (e) => {
        // only search the term if it isn't empty
        if (searchTerm) {
            // call API
            // reset searchTerm
            setSearchTerm("")
        }

    }*/
    return (
        <div className="dashboard">
            <form>
                <input
                    type="search"
                    className="searchBar"
                    placeholder="Search Song or Artist"
                    value={searchTerm}
                    onChange={handleOnChange}
                />
            </form>

            <div className="songsContainer">
                songs
            </div>

        </div>
    )
}

export default Dashboard;