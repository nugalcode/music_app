import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import '../css/Dashboard.css';
import SpotifyWebApi from 'spotify-web-api-node'
import Track from './Track.js';
import Player from './Player.js';
import LeftSideBar from './LeftSideBar.js';
import RightSideBar from './RightSideBar.js';
import TrackHeader from './TrackHeader.js';

const spotifyApi = new SpotifyWebApi({
    clientId: '8f9b068eeffc4fd0a27b7599b1df9050',
})

function convertDuration(ms) {
    var minutes = Math.floor(ms/ 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
        seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [currentUris, setCurrentUris] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userID, setUserID] = useState("");
    const [currentPlaylist, setCurrentPlaylist] = useState({});

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    function handlePlaylistTracks(playlist) {
        setCurrentPlaylist(playlist);
    }

    useEffect(() => {
        if (!currentPlaylist || !accessToken) return;

        spotifyApi.getPlaylistTracks(currentPlaylist.playlistID).then(res => {
            console.log(res.body);
        })
    
    }, [currentPlaylist])

    useEffect(() => {
        if (!playingTrack) return
        const handleFunc = () => {
                setCurrentUris(
                    searchResults.map((track) => {
                        return track.uri
                    })
                )
        }
        handleFunc();
    }, [playingTrack, searchResults])
    
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
                res.body.tracks.items.map((track, index) => {
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
        })

        
        return () => cancel = true;
    }, [searchTerm, accessToken]);

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.getMe().then(res => {
            setUserID(res.body.id)
        })

    }, [accessToken])

    useEffect(() => {
        if (!accessToken || !userID) return;

        spotifyApi.getUserPlaylists(userID).then(res => {
           // console.log(res.body.items);
            setUserPlaylists(res.body.items.map((playlist, index) => {
                return {
                    name: playlist.name,
                    playlistID: playlist.id,
                    ownerID: playlist.owner.id,
                };
            })
            )
        })
        
    }, [accessToken, userID])


    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleOnSubmit = (e) => {
        // prevents page refresh
        e.preventDefault();
        // only search the term if it isn't empty
        if (searchTerm) {
            // call API
           
        }

    } 
    return (
        <div className="dashboard">

            <LeftSideBar playlists={userPlaylists} handlePlaylistTracks={handlePlaylistTracks} />

            <div className="dashboardCenter">

                <form className="searchForm" onSubmit={handleOnSubmit}>
                    <input
                        type="search"
                        className="searchBar"
                        placeholder="Search Song or Artist"
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                </form>

                <div className="songsContainer">
                    <TrackHeader />
                    {searchResults.map((track, index) => {
                        return (
                            <Track
                                key={track.uri}
                                track={track}
                                number={index + 1}
                                chooseTrack={chooseTrack}
                            />
                        )
                    }
                    )}
                </div>

            </div>

            <RightSideBar />

            <div className="playerWrap">
                <Player accessToken={accessToken} currentTrack={playingTrack} uris={currentUris}/>
            </div>

        </div>
    )
}

export default Dashboard;