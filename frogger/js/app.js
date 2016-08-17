// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 100;
    this.y = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    // FIXME: see engine.js
    this.canvasRows = 6;
    this.canvasCols = 5;
    this.xOffset = 101;
    this.yOffset = 83;

    this.row = 5;
    this.col = 2;
    this.x = this.col * this.xOffset;
    this.y = this.row * this.yOffset;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    this.x = this.col * this.xOffset;
    this.y = this.row * this.yOffset;
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
            this.col = Math.min(this.canvasCols-1, this.col+1);
            break;
        case 'down':
            this.row = Math.min(this.canvasRows-1, this.row+1);
            break;
        default:
            return
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
