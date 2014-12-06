

var ship;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    //Ship creation
    var ship_polygon = new Phaser.Polygon([
        new Phaser.Point(0, 0),
        new Phaser.Point(32, 16),
        new Phaser.Point(0, 32),
        new Phaser.Point(10, 16),
        new Phaser.Point(0, 0)
    ]);

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x6633BB);
    graphics.drawPolygon(ship_polygon.points);


    ship = game.add.sprite(400, 300);
    ship.addChild(graphics);

    game.physics.arcade.enable(ship, Phaser.Physics.ARCADE);
}

function update() {
    var keyboard = game.input.keyboard;
    var velocity = ship.body.velocity;
    var max_velocity = 250;

    //The ship always slow down a little.
    if (velocity.x < 2 && velocity.x > -2)
        velocity.x = 0;
    else
        velocity.x += (velocity.x > 0 ? -2 : 2);
    if (velocity.y < 2 && velocity.y > -2)
        velocity.y = 0;
    else
        velocity.y += (velocity.y > 0 ? -2 : 2);

    //Keyboard input
    if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
        ship.body.velocity.x -= 7;
    }
    if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        ship.body.velocity.x += 7;
    }
    if (keyboard.isDown(Phaser.Keyboard.UP)) {
        ship.body.velocity.y -= 7;
    }
    if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
        ship.body.velocity.y += 7;
    }

    //Max velocity
    if (ship.body.velocity.x < - max_velocity)
        ship.body.velocity.x = - max_velocity;
    if (ship.body.velocity.x > max_velocity)
        ship.body.velocity.x = max_velocity;
    if (ship.body.velocity.y < - max_velocity)
        ship.body.velocity.y = - max_velocity;
    if (ship.body.velocity.y > max_velocity)
        ship.body.velocity.y = max_velocity;
}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Bubble screen', { create: create, update: update });
