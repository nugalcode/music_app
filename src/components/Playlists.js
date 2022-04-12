import React from 'react';

const Playlists = ({ playlists, handlePlaylistTracks, handleUpdatePlaylistToBeRemoved }) => {

    function handleOnClick(playlist) {
        handlePlaylistTracks(playlist);
    }
    function handleRightClick(e, playlist) {
        const position = { x: e.clientX, y: e.clientY };
        handleUpdatePlaylistToBeRemoved(position, playlist);
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
                            onContextMenu={(e) => handleRightClick(e, playlist)}
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