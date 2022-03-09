import React from 'react';
import '../css/LeftSideBar.css';
import Nav from './Nav';
import Playlists from './Playlists';
import NavBottom from './NavBottom';

const LeftSideBar = () => {
    return (
        <div className="LeftSideBar">
            <Nav />
            <NavBottom />
            <Playlists />
        </div>
    )
}

export default LeftSideBar;