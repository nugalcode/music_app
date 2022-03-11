import React from 'react';
import '../css/LeftSideBar.css';
import Nav from './Nav';
import Playlists from './Playlists';
import NavBottom from './NavBottom';

const LeftSideBar = ({ playlists, handlePlaylistTracks} ) => {
    return (
        <div className="LeftSideBar">
            <Nav />
            <NavBottom />
            <Playlists playlists={playlists} handlePlaylistTracks={handlePlaylistTracks}/>
        </div>
    )
}

export default LeftSideBar;