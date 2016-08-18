var Canvas = function() {
    // see engine.js
    this.offset = { x: 101, y: 83 };
    this.grid = {
        rows: 6,
        cols: 5,
        width: ctx.canvas.width,
        height: ctx.canvas.height
    };
};

// Enemies our player must avoid
var Enemy = function() {
    Canvas.call(this);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Reset the enemy's position and speed
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = this.getRandomInt(1, 3) * this.offset.y - 20;
    this.speed = 100 * this.getRandomInt(1, 4);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > this.grid.width) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Returns a random integer between min (inclusive) and max (inclusive)
Enemy.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var Player = function() {
    Canvas.call(this);

    this.row = 5;
    this.col = 2;

    this.x = this.col * this.offset.x;
    this.y = this.row * this.offset.y - 10;

    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    this.x = this.col * this.offset.x;
    this.y = this.row * this.offset.y - 10;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.col = Math.max(0, this.col-1);
            break;
        case 'up':
            this.row = Math.max(0, this.row-1);
            break;
        case 'right':
            this.col = Math.min(this.grid.cols-1, this.col+1);
            break;
        case 'down':
            this.row = Math.min(this.grid.rows-1, this.row+1);
            break;
        default:
            return
    }
};

// Now we instantiate the enemies and player objects.
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
