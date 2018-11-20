import Crash from './crash';
import Pickup from './pickup';


export default class Game {
    constructor() {
        this.board = document.querySelectorAll(".board__box");
        this.crash = new Crash();
        this.pickup = new Pickup();
        this.score = 0;
        this.scoreBoard = document.querySelector(".score strong");
    }

    index(x, y) {
        return x + (y * 13);
    }

    showCrash() {
        this.board[this.index(this.crash.x, this.crash.y)].classList.add("crash"); // adding crash class to div which has crash currently
    }

    showPickup() {
        let box = this.board[this.index(this.pickup.x, this.pickup.y)];
        // box.classList.add("diamond");

        let pickupType = Math.floor(Math.random() * (3 - 1 + 1) + 1);

        switch (pickupType) {
            case 1:
                box.classList.add("pickup", "diamond");
                break;
            case 2:
                box.classList.add("pickup", "mystery-box");
                break;
            case 3:
                box.classList.add("pickup", "apple");
        }
    }

    hideVisibleCrash() {
        const hiddenCrash = document.querySelector(".crash");
        if (hiddenCrash !== null) {
            hiddenCrash.classList.remove("crash");
        }
    }

    hidePickup() {
        const hiddenPickup = document.querySelector(".pickup");
        hiddenPickup.classList.remove("pickup", "diamond", "mystery-box", "apple");
    }

    moveCrash() {
        this.hideVisibleCrash(); // hiding new crashes showing in 0 0 box

        switch (this.crash.direction) {
            case "right":
                this.crash.x += 1;
                break;
            case "left":
                this.crash.x -= 1;
                break;
            case "up":
                this.crash.y -= 1;
                break;
            case "down":
                this.crash.y += 1;
                break;
        }

        if (!this.gameOver()) {
            this.checkPickupCollision();
            this.showCrash();
        }


        console.log(this.index(this.crash.x, this.crash.y), this.crash.direction);
    }

    turnCrash(e) {
        switch (e.which) {
            case 37: // left arrow
                this.crash.direction = "left";
                break;
            case 38: // up arrow
                this.crash.direction = "up";
                break;
            case 39: // right arrow
                this.crash.direction = "right";
                break;
            case 40: // down arrow
                this.crash.direction = "down";
                break;
        }
    }

    checkPickupCollision() {

        if ((this.crash.y === this.pickup.y) && (this.crash.x === this.pickup.x)) {
            this.hidePickup();
            this.score += 1;
            this.scoreBoard.innerText = this.score;
            this.pickup = new Pickup();
            this.showPickup();
        }
    }

    gameOver() {
        if (this.crash.x < 0 || this.crash.x > 12 || this.crash.y < 0 || this.crash.y > 9) {
            clearInterval(this.interval);

            const hiddenScore = document.querySelector(".score");
            hiddenScore.classList.add("hidden");

            const hiddenBoard = document.querySelector(".board");
            hiddenBoard.classList.add("hidden");

            const over = document.querySelector(".game-over");
            over.classList.remove("hidden");

            const alert = document.createElement("pre");
            const overMsg = over.appendChild(alert);
            overMsg.innerText = "Game Over. Your Score was " + this.score;

            this.hideVisibleCrash();
            return true;
        } else {
            return false;
        }
    }

    startGame() {
        this.interval = setInterval(() => {
            this.moveCrash()
        }, 250);
    };
}