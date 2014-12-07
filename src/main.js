

var background;
var alive = 1;

function preload() {
    game.load.image('background', 'assets/images/background.jpg');
}


function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    background = game.add.sprite(0, 0,'background');
    game.physics.enable(background);
    background.body.velocity.x = 20;
    background.body.collideWorldBounds = true;

    var ship = create_ship(game);
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

var rock;

function _generate_rock() {

    var size = game.rnd.integerInRange(20, 250);
    var x = game.rnd.integerInRange(0, 800);
    var y = game.rnd.integerInRange(0, 600);

    var graphics = new Phaser.Graphics(game, 0, 0);
    graphics.beginFill(0x8B4513);
    graphics.drawCircle(size, size, size);
    graphics.pivot.setTo(size   , size);

    rock = game.add.sprite(x, y);
    rock.addChild(graphics);
    rock.anchor.setTo(0.5, 0.5);
    game.physics.p2.enableBody(rock, true);
    rock.body.setCircle(size / 2);

    ship.body.collides(rock, console.log.bind(console));
}

function update() {
    if (alive != 0) {
        update_ship(game);
    }
    if (!rock)
        _generate_rock();

    //console.log(ship.type);
    //console.log(rock.type);
//    if (game.physics.p2.overlap(ship, rock, console.log.bind(console))) {
    //    console.log('/!\\ Collision /!\\');
  //  }
}

function render() {

    game.debug.body(ship);
    if (rock)
        game.debug.body(rock);

}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Bubble screen',
    { preload: preload,  create: create, update: update, render: render});
