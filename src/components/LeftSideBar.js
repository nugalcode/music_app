import React from 'react';
import '../css/LeftSideBar.css';
import Nav from './Nav';
import Playlists from './Playlists';
import NavBottom from './NavBottom';

const LeftSideBar = ({ displayUserLibrary, addNewPlaylist, playlists, handlePlaylistTracks, displayLikedSongs }) => {

    return (
        <div className="LeftSideBar">
            <Nav displayUserLibrary={displayUserLibrary} />
            <NavBottom addNewPlaylist={addNewPlaylist} displayLikedSongs={displayLikedSongs} />
            <Playlists playlists={playlists} handlePlaylistTracks={handlePlaylistTracks}/>
        </div>
    )
}

export default LeftSideBar;