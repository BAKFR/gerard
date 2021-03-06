

var ship;
var _ship_tween;

function create_ship(game) {

    var ship_polygon = new Phaser.Polygon([
        new Phaser.Point(0, 0),
        new Phaser.Point(32, 16),
        new Phaser.Point(0, 32),
        new Phaser.Point(10, 16),
        new Phaser.Point(0, 0)
    ]);

    var graphics = new Phaser.Graphics(game, 0, 0);
    graphics.beginFill(0x6633BB);
    graphics.drawPolygon(ship_polygon.points);
    graphics.pivot.setTo(16, 16);

    ship = game.add.sprite(400, 300);
    ship.addChild(graphics);
    ship.anchor.setTo(0.5, 0.5);

    game.physics.p2.enable(ship, true);

    var ship_collision_group =
    ship.body.collideWorldBounds = true;

    _ship_tween = game.add.tween(ship);
    return ship;
}


/**
 * Change the visual direction of the ship, using a rotation tween.
 * @param game
 * @private
 */
function _set_ship_direction(game) {
    var keyboard = game.input.keyboard;
    var angle = null;

    if (keyboard.isDown(Phaser.Keyboard.UP)) {
        angle = -90;
        if (keyboard.isDown(Phaser.Keyboard.LEFT))
            angle -= 45;
        if (keyboard.isDown(Phaser.Keyboard.RIGHT))
            angle += 45;
    } else if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
        angle = 90;
        if (keyboard.isDown(Phaser.Keyboard.LEFT))
            angle += 45;
        if (keyboard.isDown(Phaser.Keyboard.RIGHT))
            angle -= 45;
    } else if (keyboard.isDown(Phaser.Keyboard.LEFT))
        angle = 180;
    else if (keyboard.isDown(Phaser.Keyboard.RIGHT))
        angle = 0;

    //actual angle is between -135 and 180
    //We check value to avoid rotate 3/4 instead of 1/4.
    var diff = Math.abs(ship.angle - angle);
    if (diff > 180)
        angle += (angle < ship.angle) ? 360 : -360;

    if (angle !== null && _ship_tween.last_dir !== angle) {
        _ship_tween.stop();
        _ship_tween = game.add.tween(ship.body);
        _ship_tween.last_dir = angle;
        _ship_tween.to({angle: angle}, 200, Phaser.Easing.Quadratic.InOut);
        _ship_tween.start();
    }
}


function update_ship(game) {
    var keyboard = game.input.keyboard;
    var velocity = ship.body.velocity;

    //The ship always slow down a little.
    if (velocity.x < 2 && velocity.x > -2) {
        velocity.x = 0;
    } else {
        velocity.x += (velocity.x > 0 ? -2 : 2);
    }
    if (velocity.y < 2 && velocity.y > -2)
        velocity.y = 0;
    else
        velocity.y += (velocity.y > 0 ? -2 : 2);

   // _set_ship_direction(game);


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
}
