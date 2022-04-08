import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import useAuth from '../hooks/useAuth.js';
import '../css/Dashboard.css';
import SpotifyWebApi from 'spotify-web-api-node'
import Track from './Track.js';
import Player from './Player.js';
import LeftSideBar from './LeftSideBar.js';
import RightSideBar from './RightSideBar.js';
import TrackHeader from './TrackHeader.js';
import ContextMenu from './ContextMenu.js';
import YourLibrary from './YourLibrary.js';
import { ACTIONS, playDetailsDispatchContext, playDetailsStateContext } from "../hooks/playDetailsContext";

import { useLikedSongs, useUserPlaylists, useContainsSavedTracks, usePlaylistTracks } from '../hooks/customHooks';

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
    const  dispatch  = useContext(playDetailsDispatchContext);
    //const  state  = useContext(playDetailsStateContext);

    const accessToken = useAuth(code);
    const [userID, setUserID] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [playingTrack, setPlayingTrack] = useState();
    const [currentUris, setCurrentUris] = useState([]);
    //simple state variable that flips between 0 and 1 whenever user likes/unlikes a track
    //used to trigger useLikedSongs custom hook to update likedSongs
    const [userLikeTracker, setUserLikeTracker] = useState(0);
    const isLiked = useContainsSavedTracks(searchResults);
    const likedSongs = useLikedSongs(userID, userLikeTracker);

    const [currentPlaylist, setCurrentPlaylist] = useState({});
    const [newPlaylistID, setNewPlaylistID] = useState("");
    const userPlaylists = useUserPlaylists(userID, newPlaylistID);
    const playlistToDisplay = usePlaylistTracks(currentPlaylist);

    const [showSongs, setShowSongs] = useState(false);
    const [showLibrary, setShowLibrary] = useState(false);

    function chooseTrack(track) {
        setPlayingTrack(track);
        /*setCurrentUris(searchResults.map((track) => {
            return track.uri
        }));*/

        dispatch({ type: ACTIONS.CHANGEURIS, uris: [...currentUris], offset: track.offset });
    }

    /*useEffect(() => {
        if (!playingTrack || !currentUris.length || !dispatch) return
        
        dispatch({ type: ACTIONS.CHANGEURIS, uris: currentUris, offset: playingTrack.offset });
    }, [currentUris, playingTrack, dispatch])*/

    useEffect(() => {
        if (!searchResults.length) return;
        setCurrentUris(searchResults.map((track) => {
            return track.uri
        }));
    }, [searchResults])

    function changeTrackLikeStatus (track, likeStatus) {
        if (likeStatus) {
            spotifyApi.removeFromMySavedTracks([track.id])
                .then(res => {
                    console.log("Song successfully removed from liked songs!")
                    const temp = userLikeTracker === 0 ? 1 : 0;
                    setUserLikeTracker(temp);
                }).catch((err) => {
                    console.log("Error trying to remove song from liked songs!")
                })
        }
        else {
            spotifyApi.addToMySavedTracks([track.id])
                .then(res => {
                    console.log("Song successfully added to liked songs!")
                    const temp = userLikeTracker === 0 ? 1 : 0;
                    setUserLikeTracker(temp);
                }).catch((err) => {
                    console.log("Error trying to add song to liked songs!")
                })
        }
    }
    const displayLikedSongs = () => {
        setSearchResults(likedSongs);
    }
    const playLikedSongs = () => {
        setPlayingTrack(likedSongs[0]);
        setCurrentUris(likedSongs.map((track) => {
            return track.uri;
        }));
    }

    function handlePlaylistTracks(playlist) {
        setCurrentPlaylist(playlist);
    }
    const addNewPlaylist = useCallback(() => {
        if (!spotifyApi) return;
        spotifyApi.createPlaylist('test playlist api', { 'description': 'test description', 'public': true })
            .then(function (data) {
                console.log('Created playlist!');
                console.log(data.body);
                setNewPlaylistID(data.body.id)
            }, function (err) {
                console.log('Error trying to create playlist!', err);
            });
    },[])

    const displayUserLibrary = () => {
        setShowSongs(false);
        setShowLibrary(true);
    }

    useEffect(() => {
        setShowSongs(true);
        setShowLibrary(false);
    }, [searchResults]);
    
    // Display the playlistToDisplay
    useEffect(() => {
        setSearchResults(playlistToDisplay);
    }, [playlistToDisplay, accessToken])

    const changeUrisByPlaylist = (playlist) => {
        if (!spotifyApi || typeof playlist === 'undefined' || !Object.keys(playlist).length || !playlist.playlistID) return;

        spotifyApi.getPlaylistTracks(playlist.playlistID).then(res => {
            setPlayingTrack(res.body.items[0]);
            setCurrentUris(
                res.body.items.map((item) => {
                    return item.track.uri
                })
            )
        }).catch(() => {
            console.log("Error trying to get playlist uris");
        })
    }

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
                        id: track.id,
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

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({});
    const searchBarRef = useRef();
    const focusSearchBar = () => {
        if (searchBarRef.current) searchBarRef.current.focus();
    }
    useEffect(() => {
        const handleOnClick = (e) => {
            e.preventDefault();
            setMenuIsOpen(true);
            const position = { x: e.x, y: e.y };
            setMenuPosition(position);
        }
        document.addEventListener('contextmenu', handleOnClick);
        return () => document.removeEventListener('contextmenu', handleOnClick);
    }, [setMenuPosition])

    useEffect(() => {
        const handleOnClick = (e) => {
            if (menuIsOpen)
                setMenuIsOpen(false);
        }
        document.addEventListener('mousedown', handleOnClick);
        return () => document.removeEventListener('mousedown', handleOnClick);
    }, [menuIsOpen])

    const handleSetMenuIsOpen = (position) => {
        setMenuIsOpen(!menuIsOpen);
        setMenuPosition(position);
        console.log(position);
    }

    return (
        <ContextApi.Provider value={spotifyApi}>
            <div className="dashboard">

                {menuIsOpen && <ContextMenu position={menuPosition} playlists={userPlaylists}/>}

                <LeftSideBar displayUserLibrary={displayUserLibrary} addNewPlaylist={addNewPlaylist}
                    displayLikedSongs={displayLikedSongs} playlists={userPlaylists} handlePlaylistTracks={handlePlaylistTracks}
                    focusSearchBar={focusSearchBar}
                />

                <div className="dashboardCenter">

                    <form className="searchForm" onSubmit={handleOnSubmit}>
                        <input
                            type="search"
                            className="searchBar"
                            placeholder="Search Song or Artist"
                            value={searchTerm}
                            onChange={handleOnChange}
                            ref={searchBarRef}
                        />
                    </form>

                    {showLibrary && <YourLibrary displayLikedSongs={displayLikedSongs} playLikedSongs={playLikedSongs} likedSongs={likedSongs} playlists={userPlaylists} handlePlaylistTracks={handlePlaylistTracks} changeUrisByPlaylist={changeUrisByPlaylist}/>}
                    { showSongs && <div className="songsContainer">
                        <TrackHeader />
                        {searchResults.map((track, index) => {
                            return (
                                <Track
                                    key={index}
                                    track={track}
                                    isCurrent={playingTrack?.uri === track.uri}
                                    number={index + 1}
                                    chooseTrack={chooseTrack}
                                    likedSongs={isLiked}
                                    handleSetMenuIsOpen={handleSetMenuIsOpen}
                                    changeTrackLikeStatus={changeTrackLikeStatus}
                                />
                            )
                        }
                        )}
                    </div>}
                </div>

                <RightSideBar />

                <div className="playerWrap">
                    <Player accessToken={accessToken} />
                </div>

                </div>
        </ContextApi.Provider>
    )
}

export default Dashboard;