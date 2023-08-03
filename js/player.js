import { colors } from './config.js';

export const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    currentPieceIndex: 0,
    color: null,
};

export const reset = (game) => {
    const { tetrominoes } = game;
    const randomIndex = Math.floor(Math.random() * tetrominoes.length);
    game.player.matrix = tetrominoes[randomIndex][0];
    game.player.currentPieceIndex = randomIndex;
    game.player.currentOrientation = 0;
    game.player.color = colors[randomIndex];
    game.player.pos.y = 0;
    game.player.pos.x = (game.gameBoard[0].length / 2 | 0) - (game.player.matrix[0].length / 2 | 0);
    if (game.collide()) {
        game.gameBoard.forEach(row => row.fill(0));
    }
};