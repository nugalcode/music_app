import React from 'react';
import '../css/YourLibrary.css';
const YourLibrary = ({ playlists, handlePlaylistTracks }) => {

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