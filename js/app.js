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

    // if the object is out of the canvas, place it back to 
    // the initial x position and assign a random speed 
    // between 200 and 500 to it
    if (this.x > 600) {
        this.x = -100;
        this.speed = Math.floor(Math.random()*300) + 200;
    }

    // make the object move
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
    this.freeze = true;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    Enemy.prototype.render.call(this);
};

Player.prototype.handleInput = function(direction) {
    // make sure the player won't be moved out of the canvas
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0), new Enemy(1), new Enemy(2)];
var player = new Player();
var numOfEnemies = 3;

// use flags to monitor the status of the game
var resetFlag = false;
var gameStarted = false;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
        82: 'reset',
        83: 'switch'
    };

    if (player.freeze) {
        if (gameStarted) {
            restart(allowedKeys[e.keyCode]);
        } else {
            characterSelect(allowedKeys[e.keyCode]);
        }
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});


// keyboard function for when the game is initiated or stopped
function characterSelect(direction) {
    // get all character elements
    var characters = document.querySelector('.select').children;

    for (var i = 0; i < characters.length; i++) {
        var bgImg = characters[i].style.backgroundImage.split(',');
        // use background length to find the selected element
        if (bgImg.length === 2) {

            // add the selector.png to left or right element based on pressed key
            if (direction === 'left' && i>0) {
                characters[i].style.backgroundImage = bgImg[0];
                characters[i-1].style.backgroundImage = characters[i-1].style.backgroundImage.concat(`,${bgImg[1]}`);
            }
            if (direction === 'right' && i<characters.length-1) {
                characters[i].style.backgroundImage = bgImg[0];
                characters[i+1].style.backgroundImage = characters[i+1].style.backgroundImage.concat(`,${bgImg[1]}`);
            }
            // hide modal and initialize the player sprite
            if (direction === 'enter') {
                document.querySelector('.modal').style.opacity = 0;
                player.freeze = false;
                player.sprite = bgImg[0].split(`"`)[1];
                gameStarted = true;
                resetFlag = false;
            }
            // a return functin is needed to exit loop
            return;
        }
    }
}

function restart(key) {

    // reset without quiting the current interface
    if (key === 'reset' && gameStarted) {
        resetFlag = true;
        player.freeze = false;
    }

    // back to the initial screen
    if (key === 'switch') {
        document.querySelector('.modal').style.opacity = 1;
        player.freeze = true;
        document.querySelector('#reset').style.display = 'none';
        document.querySelector('#result').style.display = 'none';
        document.getElementById('switch').style.display = 'none';
        resetFlag = true;
        gameStarted = false;
    }
}

