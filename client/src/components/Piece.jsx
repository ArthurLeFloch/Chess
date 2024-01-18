import React from "react";

import * as chess from "../utils/chess";

import blackRook from "../assets/chess-rook-black.svg";
import blackKnight from "../assets/chess-knight-black.svg";
import blackBishop from "../assets/chess-bishop-black.svg";
import blackQueen from "../assets/chess-queen-black.svg";
import blackKing from "../assets/chess-king-black.svg";
import blackPawn from "../assets/chess-pawn-black.svg";

import whiteRook from "../assets/chess-rook-white.svg";
import whiteKnight from "../assets/chess-knight-white.svg";
import whiteBishop from "../assets/chess-bishop-white.svg";
import whiteQueen from "../assets/chess-queen-white.svg";
import whiteKing from "../assets/chess-king-white.svg";
import whitePawn from "../assets/chess-pawn-white.svg";

function pieceImage(piece) {
	if (chess.isEmpty(piece)) return null;
	const isBlack = chess.isBlack(piece);
	if (chess.isRook(piece)) return isBlack ? blackRook : whiteRook;
	if (chess.isKnight(piece)) return isBlack ? blackKnight : whiteKnight;
	if (chess.isBishop(piece)) return isBlack ? blackBishop : whiteBishop;
	if (chess.isQueen(piece)) return isBlack ? blackQueen : whiteQueen;
	if (chess.isKing(piece)) return isBlack ? blackKing : whiteKing;
	if (chess.isPawn(piece)) return isBlack ? blackPawn : whitePawn;
}

export default function Piece(props) {
	const src = pieceImage(props.piece);
	return (
		<>
			{src && <img src={src} alt={props.type} className="board-tile-img" />}
		</>
	);
}