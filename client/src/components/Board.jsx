import React from "react";

import Piece from "./Piece";
import * as chess from "../utils/chess";

const allowedMoves = [17, 22, 41, 46];

export default function Board() {
	const [game, setGame] = React.useState(chess.init());
	const [selectedPiece, setSelectedPiece] = React.useState(null);

	function onClick(index) {
		if (selectedPiece !== null && selectedPiece !== index && allowedMoves.includes(index)) {
			console.log("Moving from", selectedPiece, "to", index);
			setGame((oldGame) => {
				const newGame = chess.copy(oldGame);
				chess.move(newGame, selectedPiece, index);
				return newGame;
			});
			setSelectedPiece(null);
		} else if (selectedPiece === index) {
			console.log("Deselecting piece", selectedPiece);
			setSelectedPiece(null);
		} else if (!chess.isEmpty(game[index]) && chess.isWhite(game[index])) {
			console.log("Selecting piece", index);
			setSelectedPiece(index);
		}
	}

	function renderBoard() {
		return game.map((piece, index) => {
			const isActive = selectedPiece === index;
			const isAllowed = allowedMoves.includes(index);
			const isHighlighted = selectedPiece !== null && isAllowed;
			const className = `board-tile${isActive ? " active" : ""}${isHighlighted ? " highlighted" : ""}`
			return (
				<div key={index}
					className={className}
					onClick={() => onClick(index)}
				>
					<Piece
						piece={piece}
					/>
				</div>
			);
		});
	}

	return (
		<div className="board">
			{renderBoard()}
		</div>
	);
}