export const drop = (game) => {
    game.player.pos.y++;
    if (game.collide()) {
        game.player.pos.y--;
        game.merge();
        game.removeFullLines();
        game.reset(game);
    }
    return 0;
};

export const playerMove = (game, dir) => {
    game.player.pos.x += dir;
    if (game.collide()) {
        game.player.pos.x -= dir;
    }
}

export const playerRotate = (game, dir) => {
    const previousOrientation = game.player.currentOrientation;
    game.player.currentOrientation = (game.player.currentOrientation + 4 + dir) % 4;
    game.player.matrix = game.tetrominoes[game.player.currentPieceIndex][game.player.currentOrientation];
    const pos = game.player.pos.x;
    let offset = 1;
    while (game.collide()) {
        game.player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > game.player.matrix[0].length) {
            game.player.currentOrientation = previousOrientation;
            game.player.matrix = game.tetrominoes[game.player.currentPieceIndex][game.player.currentOrientation];
            game.player.pos.x = pos;
            return;
        }
    }
}
