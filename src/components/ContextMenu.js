import React from 'react';
import '../css/ContextMenu.css';

const ContextMenu = ({ position }) => {
	const style = {
		top: position.y,
		left: position.x,
		position: 'absolute'
	}
	return (
		<div className="contextMenu" style={style}>
			Display text
		</div>
	)
}

export default ContextMenu;