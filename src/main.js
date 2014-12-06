

var background;
var alive = 1;

function preload() {
    game.load.image('background', 'assets/images/background.jpg');
}


function create() {
    game.physics.startSystem(Phaser.Physics.NINJA);
    game.physics.ninja.gravity = 0;

    background = game.add.sprite(50, 32,'background');
    game.physics.enable(background);
    background.body.velocity.x = 0;
    background.body.collideWorldBounds = true;

    var ship = create_ship(game);
}

function outOfBackground() {
    ship.destroy();
    rock.destroy();
    background.destroy();
    alive = 0;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);

    // var text = game.add.text(game.world.centerX, game.world.centerY, "- ÅÄÖ -\nwith a sprinkle of\npixi dust", style);

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
    //rock.height = size;
    //rock.width = size;
    game.physics.ninja.enableCircle(rock, size / 2);
}



function update() {
    if (alive) {
        update_ship(game);

        if (ship.position.y < background.position.y || ship.position.x < background.position.x || ship.position.y + 16 > background.position.y + 525 || ship.position.x + 16 > background.position.x + 700) {
            outOfBackground();
        }
    }
    if (!rock)
        _generate_rock();

    if (game.physics.ninja.overlap(ship, rock)) {
        console.log('/!\\ Collision /!\\');
    }
}

function render() {

    game.debug.body(ship);
    if (rock)
        game.debug.body(rock);

}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Bubble screen',
    { preload: preload,  create: create, update: update, render: render});
