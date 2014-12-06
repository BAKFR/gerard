

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
    ship.body.velocity.x = 20;
}

function update() {
    var keyboard = game.input.keyboard;
    var max_velocity = 250;

    if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
        ship.body.velocity.x -= 5;
    }
    if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        ship.body.velocity.x += 5;
    }
    if (keyboard.isDown(Phaser.Keyboard.UP)) {
        ship.body.velocity.y -= 5;
    }
    if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
        ship.body.velocity.y += 5;
    }

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
