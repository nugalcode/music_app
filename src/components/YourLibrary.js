import React from 'react';
import '../css/YourLibrary.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const YourLibrary = ({ playlists, handlePlaylistTracks, changeUrisByPlaylist }) => {

    const handlePlaylist = (playlist) => {
        handlePlaylistTracks(playlist)
    }

    const handleUris = (e, playlist) => {
        // prevents onClick event from bubbling up and triggering the parent onClick event
        e.stopPropagation();
        changeUrisByPlaylist(playlist);
    }

    return (
        <div className="yourLibrary">
            <div className="playlistsPreviewContainer">
                <div className="likedSongsPreview">
                    <div className="likedSongsCaption"> Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler Filler
                        Filler -webkit-box-orient: vertical; -webkit-box-orient: vertical; aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                    <span> Liked Songs </span>
                </div>
                {playlists.map((playlist,index) => {
                        return (
                            <div className="playlistPreview"
                                key={index}
                                onClick={() => handlePlaylist(playlist)}
                            >
                                <div className="imgWrap"> 
                                    <img className="playlistImage" src={playlist.image !== "" ? playlist.image : "https://assets.dryicons.com/uploads/icon/svg/8256/d635dcbf-b76c-420b-a334-23eac4052ada.svg"} alt="" />
                                    <div className="playIconWrap">
                                        <PlayCircleIcon className="playCircleIcon" onClick={(e) => handleUris(e, playlist)} />
                                    </div>
                                </div>
                                <span className="playlistName"> {playlist.name} </span>
                                <span className="playlistCaption"> {playlist.caption} </span> 
                            </div>
                        )
                    })
                }

            </div>
            
        </div>
    )
}

export default YourLibrary;