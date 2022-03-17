import React from 'react';

const Playlists = ({ playlists, handlePlaylistTracks }) => {

    function handleOnClick(playlist) {
        handlePlaylistTracks(playlist);
    }
    return (
        <div className="playlists">
            {
                playlists.map((playlist) => {
                    return (
                        <div
                            className="playlist"
                            key={playlist.playlistID}
                            onClick={() => handleOnClick(playlist)}
                        >
                            <span> {playlist.name} </span>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Playlists;