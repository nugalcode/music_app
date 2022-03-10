import React from 'react';

const Playlists = ( {playlists} ) => {
    return (
        <div className="playlists">
            {
                playlists.map((playlist) => {
                    return (
                        <div className="playlist">
                            {playlist.name}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Playlists;