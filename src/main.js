

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    //Ship creation
    var ship = new Phaser.Polygon([
        new Phaser.Point(0, 0),
        new Phaser.Point(32, 16),
        new Phaser.Point(0, 32),
        new Phaser.Point(10, 16),
        new Phaser.Point(0, 0)
    ]);

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x6633BB);
    graphics.drawPolygon(ship.points);


    var x = game.add.sprite(400, 300);
    x.addChild(graphics);

    game.physics.arcade.enable(x, Phaser.Physics.ARCADE);
    x.body.velocity.x = 20;
}

function update() {

}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Bubble screen', { create: create });
