import React from 'react';
import '../css/LeftSideBar.css';
import Nav from './Nav';
import Playlists from './Playlists';
import NavBottom from './NavBottom';

const LeftSideBar = ( {playlists} ) => {
    return (
        <div className="LeftSideBar">
            <Nav />
            <NavBottom />
            <Playlists playlists={playlists}/>
        </div>
    )
}

export default LeftSideBar;