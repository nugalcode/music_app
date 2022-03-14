import React, { useState, useEffect, useCallback } from 'react';
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

export function convertDuration(ms) {
    var minutes = Math.floor(ms/ 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
        seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}
export const ContextApi = React.createContext(spotifyApi);

export const Dashboard = ({ code }) => {

    const accessToken = useAuth(code);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [currentUris, setCurrentUris] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userID, setUserID] = useState("");
    const [currentPlaylist, setCurrentPlaylist] = useState({});
    const [likedSongs, setLikedSongs] = useState([]);

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    function handlePlaylistTracks(playlist) {
        setCurrentPlaylist(playlist);
    }

    const displayLikedSongs= useCallback((songs) => {
        setSearchResults(songs);
    }, [setSearchResults])
    

    /*useEffect(() => {
        if (!likedSongs.length) return
        setSearchResults(likedSongs);
    }, [likedSongs]) */

    // get the clicked playlist tracks and set search results accordingly
    useEffect(() => {
        // Object.keys is a built-in javascript method to check if an object is empty
        // I'm doing this because checking if an object is empty (i.e. !object) does not work
        // as expected like it does with arrays or strings
        if (!accessToken || !Object.keys(currentPlaylist).length || !currentPlaylist.playlistID) return;

        spotifyApi.getPlaylistTracks(currentPlaylist.playlistID).then(res => {
            setSearchResults(
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
            console.log("Error trying to get playlist tracks");
        })
    
    }, [currentPlaylist, accessToken])

    // setCurrentUris
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

    // setting spotify api access token 
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    // setting search results according to the search term
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

    // getting the information of the user and setting userID accordingly
    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.getMe().then(res => {
            setUserID(res.body.id);
        })

    }, [accessToken])

    // getting the user's playlists
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

    // handle search term on change and on enter
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
        <ContextApi.Provider value={spotifyApi}>
            <div className="dashboard">

                <LeftSideBar displayLikedSongs={displayLikedSongs} playlists={userPlaylists} handlePlaylistTracks={handlePlaylistTracks} />

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
                                    key={index}
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
        </ContextApi.Provider>
    )
}

export default Dashboard;