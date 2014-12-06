

var ship;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    create_ship(game);
}

function update() {
    update_ship(game);
}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Bubble screen', { create: create, update: update });
