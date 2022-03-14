import React from 'react';
import '../css/LeftSideBar.css';
import Nav from './Nav';
import Playlists from './Playlists';
import NavBottom from './NavBottom';

const LeftSideBar = ({ addNewPlaylist, playlists, handlePlaylistTracks, displayLikedSongs }) => {

    return (
        <div className="LeftSideBar">
            <Nav />
            <NavBottom addNewPlaylist={addNewPlaylist} displayLikedSongs={displayLikedSongs} />
            <Playlists playlists={playlists} handlePlaylistTracks={handlePlaylistTracks}/>
        </div>
    )
}

export default LeftSideBar;