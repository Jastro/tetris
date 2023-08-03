import { game } from './config.js';
import { draw, drawMatrix } from './drawing.js';
import { drop, playerMove, playerRotate } from './movement.js';

const update = () => {
    const currentTime = Date.now();
    game.deltaTime = currentTime - game.lastTime;
    game.lastTime = currentTime;

    game.dropCounter += game.deltaTime;
    if (game.dropCounter > game.dropInterval) {
        drop(game);
        game.dropCounter = 0;
    }
    draw(game.context, game.gameBoard, game.player, drawMatrix, game.canvas);
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        playerMove(game, -1);
    } else if (event.key === 'ArrowRight') {
        playerMove(game, 1);
    } else if (event.key === 'ArrowDown') {
        drop(game);
    } else if (event.key === 'q' || event.key === 'Q') {
        playerRotate(game, -1);
    } else if (event.key === 'w' || event.key === 'W') {
        playerRotate(game, 1);
    }
});

game.reset(game);
update();
