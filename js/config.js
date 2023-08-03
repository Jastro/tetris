import { player } from './player.js';
import { reset } from './player.js';

export const grid = 20;
export const colors = ['red', 'blue', 'orange', 'yellow', 'green', 'purple', 'cyan', 'gray', 'aquamarine'];

const tetrominoes = [
  [ // I (Barra)
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]],
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]]
  ],
  [ // O (Cuadrado)
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]]
  ],
  [ // T
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0], [1, 1], [1, 0]],
    [[1, 1, 1], [0, 1, 0]],
    [[0, 1], [1, 1], [0, 1]]
  ],
  [ // S
    [[0, 1, 1], [1, 1, 0]],
    [[1, 0], [1, 1], [0, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 0], [1, 1], [0, 1]]
  ],
  [ // Z
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1], [1, 1], [1, 0]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1], [1, 1], [1, 0]]
  ],
  [ // J
    [[1, 0, 0], [1, 1, 1]],
    [[1, 1], [1, 0], [1, 0]],
    [[1, 1, 1], [0, 0, 1]],
    [[0, 1], [0, 1], [1, 1]]
  ],
  [ // L
    [[0, 0, 1], [1, 1, 1]],
    [[1, 0], [1, 0], [1, 1]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1], [0, 1], [0, 1]]
  ],
  [ // L invertida
    [[1, 0, 0], [1, 1, 1]],
    [[0, 1], [0, 1], [1, 1]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1], [1, 0], [1, 0]]
  ],
  [ // Z invertida
    [[0, 1, 1], [1, 1, 0]],
    [[1, 0], [1, 1], [0, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 0], [1, 1], [0, 1]]
  ]
];

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const gameBoard = Array(grid).fill(null).map(() => Array(10).fill(0));

export const game = {
  canvas,
  context,
  gameBoard,
  grid,
  tetrominoes,
  player,
  dropInterval: 1000,
  dropCounter: 0,
  deltaTime: 0,
  lastTime: Date.now(),

  collide: () => {
    const { matrix: playerMatrix, pos: playerPosition } = game.player;
    for (let y = 0; y < playerMatrix.length; ++y) {
      for (let x = 0; x < playerMatrix[y].length; ++x) {
        if (playerMatrix[y][x] !== 0 &&
          (game.gameBoard[y + playerPosition.y] && game.gameBoard[y + playerPosition.y][x + playerPosition.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  },

  merge: () => {
    game.player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          game.gameBoard[y + game.player.pos.y][x + game.player.pos.x] = value + game.player.currentPieceIndex;
        }
      });
    });
  },

  removeFullLines: () => {
    outer: for (let y = game.gameBoard.length - 1; y > 0; y--) {
      for (let x = 0; x < game.gameBoard[y].length; x++) {
        if (game.gameBoard[y][x] === 0) {
          continue outer;
        }
      }

      const row = game.gameBoard.splice(y, 1)[0].fill(0);
      game.gameBoard.unshift(row);
      y++;
    }
  },
  reset
};

