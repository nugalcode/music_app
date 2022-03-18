import React from 'react';
import '../css/YourLibrary.css';
const YourLibrary = ({ playlists } ) => {
    return (
        <div className="yourLibrary">
            <div className="playlistsPreviewContainer">
                <div className="likedSongsPreview"> LIKED SONGS FILLER FILLER FILLER</div>
                {playlists.map((playlist,index) => {
                        return (
                            <div className="playlistPreview"
                                key={index}
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