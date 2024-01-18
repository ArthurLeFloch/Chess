const ROOK = "r";
const KNIGHT = "k";
const BISHOP = "b";
const QUEEN = "q";
const KING = "K";
const PAWN = "p";
const EMPTY = "e";

const BLACK = "black";
const WHITE = "white";

const createRook = (color) => ({ type: ROOK, color });
const createKnight = (color) => ({ type: KNIGHT, color });
const createBishop = (color) => ({ type: BISHOP, color });
const createQueen = (color) => ({ type: QUEEN, color });
const createKing = (color) => ({ type: KING, color });
const createPawn = (color) => ({ type: PAWN, color });
export const createEmpty = () => ({ type: EMPTY, color: null });

const createTowers = (color) => [
	createRook(color),
	createKnight(color),
	createBishop(color),
	createQueen(color),
	createKing(color),
	createBishop(color),
	createKnight(color),
	createRook(color),
];

const createPawns = (color) => Array(8).fill(createPawn(color));

const createEmptyRow = () => Array(8).fill(createEmpty());

export const init = () => [
	...createTowers(BLACK),
	...createPawns(BLACK),
	...createEmptyRow(),
	...createEmptyRow(),
	...createEmptyRow(),
	...createEmptyRow(),
	...createPawns(WHITE),
	...createTowers(WHITE),
];

export function copy(game) {
	return [...game];
}

export function move(game, start, end) {
	if (!isEmpty(game[start])) {
		game[end] = {...game[start]};
		game[start] = createEmpty();
	} else {
		console.error("Wrong move!");
	}
}

export const isRook = (piece) => (piece.type === ROOK);
export const isKnight = (piece) => (piece.type === KNIGHT);
export const isBishop = (piece) => (piece.type === BISHOP);
export const isQueen = (piece) => (piece.type === QUEEN);
export const isKing = (piece) => (piece.type === KING);
export const isPawn = (piece) => (piece.type === PAWN);
export const isEmpty = (piece) => (piece.type === EMPTY);

export const isBlack = (piece) => (piece.color === BLACK);
export const isWhite = (piece) => (piece.color === WHITE);
