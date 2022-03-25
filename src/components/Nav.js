import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Nav = ({ displayUserLibrary, focusSearchBar}) => {

    const handleDisplayLibrary = () => {
        if (typeof displayUserLibrary === 'undefined') return;
        displayUserLibrary();
    }
    const handleSearchFocus = () => {
        if (typeof handleSearchFocus === 'undefined') return;
        focusSearchBar();
    }
    return (
        <div className="nav">

            <div className="navItemWrap"> 
                <HomeIcon className="navIcon"/>
                <div>  Home  </div>
            </div>

            <div className="navItemWrap" onClick={() => handleSearchFocus()}>
                <SearchIcon className="navIcon" />
                <div> Search </div>
            </div>

            <div className="navItemWrap" onClick={() => handleDisplayLibrary()}>
                <LibraryMusicIcon className="navIcon"/>
                <div> Your Library </div>
            </div>

        </div>
    )
}

export default Nav;