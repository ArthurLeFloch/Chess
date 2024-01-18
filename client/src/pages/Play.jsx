import React from "react";

import Board from "../components/Board";

// Websocket handling is probably going to be done here
// setters from useState will be passed down to Board as props
export default function Play() {
	return (
		<div className="board-container">
			<Board />
		</div>
	);
}