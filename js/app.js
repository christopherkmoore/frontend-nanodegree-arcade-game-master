
var y = [60, 145, 230];
var enemySpeed = 1000;

var spriteBox = 30;
// Enemies our player must avoid
var Enemy = function() {
    
    
    this.x = -100;  
   
    this.y = y[Math.floor(Math.random()* 3)];

    this.speed = Math.floor(100 + (Math.random() * enemySpeed));
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
        this.x = -100;
        
        this.y = y[Math.floor(Math.random() * 3)];

        this.x = this.x + (this.speed * dt);
    }

    if (player.y >= this.y - spriteBox && player.y <= this.y + spriteBox) {
        if (player.x >= this.x - spriteBox && player.x <= this.x + spriteBox) {
            player.lives --;
            player.reset();
            
        }
    }
    
    if (player.y === -25) {
        player.score ++;
        player.reset();
        
    }    
}




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.lives = 5;
    this.score = 0;
}
Player.prototype.update = function(dt) {

    var htmlLives = player.lives;
    var htmlScore = player.score;
    document.getElementById('right').innerHTML = "Lives : " + htmlLives;
    document.getElementById('left').innerHTML = "Score : " + htmlScore;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
    if (player.lives < 1) {
        alert("Game over man");
        player.lives = 5;
        player.score = 0
    }
    if (player.score > 4) {
        alert("Congrats, you win");
        player.lives = 5;
        player.score = 0;
    }
}

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    if (allowedKeys === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }
    if (allowedKeys === 'down' && this.y < 400) {
        this.y = this.y + 85;
    }
    if (allowedKeys === 'up' && this.y > 0) {
        this.y = this.y - 85;
    }
}





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player(200, 400);


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

function endGame() {
     alert("Game over man.");
     player.lives = 5;
     player.score = 0;
}
