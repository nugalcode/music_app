import React from 'react';
import '../css/YourLibrary.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const YourLibrary = ({ playlists, handlePlaylistTracks, changeUrisByPlaylist }) => {

    const handleOnClick = (playlist) => {
        handlePlaylistTracks(playlist)
    }
    return (
        <div className="yourLibrary">
            <div className="playlistsPreviewContainer">
                <div className="likedSongsPreview">
                    <span> Liked Songs </span>
                </div>
                {playlists.map((playlist,index) => {
                        return (
                            <div className="playlistPreview"
                                key={index}
                                onClick={() => handleOnClick(playlist)}
                            >
                                <div className="imgWrap"> 
                                    <img className="playlistImage" src={playlist.image !== "" ? playlist.image : "https://assets.dryicons.com/uploads/icon/svg/8256/d635dcbf-b76c-420b-a334-23eac4052ada.svg"} alt="" />
                                    <div className="playIconWrap"> <PlayCircleIcon className="playCircleIcon"/> </div>
                                </div>
                                <span> {playlist.name} </span>
                            </div>
                        )
                    })
                }

            </div>
            
        </div>
    )
}

export default YourLibrary;