// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y*83 + 60;
    this.speed = Math.floor(Math.random()*300) + 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 600) {
        this.x = -100;
        this.speed = Math.floor(Math.random()*300) + 200;
    }
    this.x += dt*this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 400;
    this.freeze = false;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    
}

Player.prototype.render = function() {
    Enemy.prototype.render.call(this);
};

Player.prototype.handleInput = function(direction) {
    if (!this.freeze) {
        switch(direction) {
        case 'left':
            this.x = (this.x === 0) ? this.x : this.x - 101;
            break;
        case 'up':
            this.y = (this.y === -15) ? this.y : this.y - 83;
            break;
        case 'right':
            this.x = (this.x === 404) ? this.x : this.x + 101;
            break;
        case 'down':
            this.y = (this.y === 400) ? this.y : this.y + 83;
            break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0), new Enemy(1), new Enemy(2)];
var player = new Player();
var numOfEnemies = 3;
var resetFlag = false;



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

function restart() {
    resetFlag = true;
}
