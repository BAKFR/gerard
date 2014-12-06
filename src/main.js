

var background;
var alive = 1;

function preload() {
    game.load.image('background', 'assets/images/background.jpg');
}


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.sprite(0, 0,'background');
    var ship = create_ship(game);

    game.physics.enable([background], Phaser.Physics.ARCADE);
    //game.physics.arcade.enableBody(ship);

    background.body.velocity.x = 20;
    background.body.collideWorldBounds = true;

    ship.events.onOutOfBounds.add(shipOut.bind(null, ship), this);
}

function shipOut(ship) {
    background.destroy();
    var alive = 0;
    ship.outOfBoundsKill = true;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);
    text.anchor.set(0.5);
}

function update() {
    if (alive != 0) {
        update_ship(game);
    }
}

function render() {

    //game.debug.body(ship);
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Bubble screen',
    { preload: preload,  create: create, update: update, render: render});
