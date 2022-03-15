import React from 'react';
import '../css/ContextMenu.css';

const ContextMenu = ({ position, playlists }) => {
	const style = {
		top: position.y,
		left: position.x,
		position: 'absolute'
	}
	return (
		<div className="contextMenu" style={style}>
			<div className="contextMenuItem"> Saved to your Liked Songs </div>
			<div className="contextMenuItem"> Add to playlist </div>
			<div className="contextMenuItem"> Option 3 </div>
		</div>
	)
}

export default ContextMenu;