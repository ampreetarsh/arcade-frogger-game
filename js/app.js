const level = document.querySelector('.levels');
const live = document.querySelector('.lives');
const bestLevel = document.querySelector('.bestLevel');

// Enemies our player must avoid.
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function (dt) {
    this.x = this.x + this.speed * level.textContent * dt;
    if (this.x >= 500) {
        this.x = -10;
    }
    //checks the collison between an enemy and the player.Every time player collides with an enemy, 
    //player's number of lives decreases.
    if (this.x + 60 >= player.x && this.x <= player.x + 60 && this.y + 60 >= player.y && this.y <= player.y + 60) {
        console.log('collided');
        player.x = 200;
        player.y = 400;
        live.textContent--;
        //when the player's lives is equal to zero ,pop-up alert shows up saying play agian and 
        //the game starts again.
        if (live.textContent == 0) {
            swal({
                    title: 'Game Over',
                    text: "Play Again",
                })
                .then((willDelete) => {
                    bestLevel.textContent = level.textContent;
                    level.textContent = 1;
                    live.textContent = 5;
                });
        }
    }
};


// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Draws the player and sets his position
const Player = function () {
    this.sprite = 'images/char-pink-girl.png'
    this.x = 200;
    this.y = 400;
}


//Every time player crosses the blocks without colliding with enemies,
//player wins and number of levels increases, and player starts again 
//from its initial position .
Player.prototype.update = function () {
    if (this.y < 60) {
        this.y = 400;
        level.textContent++;
    }
}


// draws the player on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// every time user presses the up ,down ,left or right key player
//moves in respective position by one block.
Player.prototype.handleInput = function (pressedKey) {
    if (pressedKey == "left" && this.x > 0) {
        this.x = this.x - 100;
    } else if (pressedKey == "right" && this.x < 400) {
        this.x = this.x + 100;
    } else if (pressedKey == "up" && this.y > 20) {
        this.y = this.y - 85;
    } else if (pressedKey == "down" && this.y < 400) {
        this.y = this.y + 85;
    }
}


//instances of Enemy object 
const enemy1 = new Enemy(0, 60, 80);
const enemy2 = new Enemy(0, 150, 75);
const enemy3 = new Enemy(0, 230, 60);
const enemy4 = new Enemy(-800, 130, 90);


const allEnemies = [enemy1, enemy2, enemy3, enemy4];

//instantiated player object
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    const sweetAlert = document.querySelector('.swal-overlay--show-modal');
    // disables the user to play game when the pop-up alert shows up.
    if (!sweetAlert)
        player.handleInput(allowedKeys[e.keyCode]);
});