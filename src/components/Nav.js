import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Nav = ({ displayUserLibrary }) => {

    const handleOnClick = () => {
        displayUserLibrary();
    }

    return (
        <div className="nav">

            <div className="navItemWrap"> 
                <HomeIcon className="navIcon"/>
                <div>  Home  </div>
            </div>

            <div className="navItemWrap">
                <SearchIcon className="navIcon" />
                <div> Search </div>
            </div>

            <div className="navItemWrap">
                <LibraryMusicIcon className="navIcon"/>
                <div onClick={() => handleOnClick()}> Your Library </div>
            </div>

        </div>
    )
}

export default Nav;