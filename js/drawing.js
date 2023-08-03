import { colors, grid } from './config.js';

export const draw = (context, gameBoard, player, drawMatrix, canvas) => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(context, gameBoard, { x: 0, y: 0 });
    drawMatrix(context, player.matrix, player.pos, player.currentPieceIndex + 1);
};

export function drawMatrix(context, matrix, offset, color) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = color ? colors[color - 1] : colors[value - 1];
                context.fillRect((x + offset.x) * grid,
                    (y + offset.y) * grid,
                    grid, grid);
            }
        });
    });
}
