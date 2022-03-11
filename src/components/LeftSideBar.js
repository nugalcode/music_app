import React from 'react';
import '../css/LeftSideBar.css';
import Nav from './Nav';
import Playlists from './Playlists';
import NavBottom from './NavBottom';

const LeftSideBar = ({ playlists, handlePlaylistTracks, displayLikedSongs }) => {

    return (
        <div className="LeftSideBar">
            <Nav />
            <NavBottom displayLikedSongs={displayLikedSongs} />
            <Playlists playlists={playlists} handlePlaylistTracks={handlePlaylistTracks}/>
        </div>
    )
}

export default LeftSideBar;