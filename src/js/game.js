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
        return x + (y * 13); // calculating X axis and Y axis index to one number
    }

    showCrash() {
        this.board[this.index(this.crash.x, this.crash.y)].classList.add("crash"); // adding crash class to div which has crash currently
    }

    showPickup() {
        let box = this.board[this.index(this.pickup.x, this.pickup.y)];

        let pickupType = Math.floor(Math.random() * (3 - 1 + 1) + 1);

        // adding class name to pickup depending on drawn number
        switch (pickupType) {
            case 1:
                box.classList.add("diamond");
                break;
            case 2:
                box.classList.add("mystery-box");
                break;
            case 3:
                box.classList.add("apple");
        }
    }

    hideVisibleCrash() {
        const hiddenCrash = document.querySelector(".crash");
        if (hiddenCrash !== null) {
            hiddenCrash.classList.remove("crash");
        }
    }

    hidePickup() {
        const pickedDiamond = document.querySelector(".diamond");
        const pickedMysteryBox = document.querySelector(".mystery-box");
        const pickedApple = document.querySelector(".apple");

        if (pickedDiamond !== null) {
            pickedDiamond.classList.remove("diamond");
            this.score += 1;
            this.writeScore();
        }

        if (pickedMysteryBox !== null) {
            pickedMysteryBox.classList.remove("mystery-box");
            let getScore = Math.floor(Math.random() * (5 - (-3) + 1) + (-3)); // Mystery box can add up to 5 points or subtract max 3 points
            this.score += getScore;
            this.writeScore();
        }

        if (pickedApple !== null) {
            pickedApple.classList.remove("apple")
            this.score += 2;
            this.writeScore();
        }
    }

    moveCrash() {
        this.hideVisibleCrash(); // hiding new crashes showing in 0 0 box

        // Crash X or Y axis index change depending on his movement direction
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
    }

    turnCrash(e) {
        // Crash movement direction change depending on which key on keyboard was pressed
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

    writeScore() {
        this.scoreBoard.innerText = this.score;
    }

    checkPickupCollision() {
        if ((this.crash.y === this.pickup.y) && (this.crash.x === this.pickup.x)) {
            this.hidePickup();
            this.pickup = new Pickup();
            this.showPickup();
        }
    }

    gameOver() {

        // Checking if crash has touched board wall
        if (this.crash.x < 0 || this.crash.x > 12 || this.crash.y < 0 || this.crash.y > 9) {
            clearInterval(this.interval);

            const hiddenScore = document.querySelector(".score");
            hiddenScore.classList.add("hidden");

            const hiddenBoard = document.querySelector(".board");
            hiddenBoard.classList.add("hidden");

            const over = document.querySelector(".game-over");
            over.classList.remove("hidden");

            const restartBtn = over.querySelector(".game-over__restart-btn");

            const alert = document.createElement("p");
            alert.classList.add("game-over__info")
            const overMsg = over.insertBefore(alert, restartBtn);
            overMsg.innerText = "Game Over. Your Score was " + this.score;

            this.hideVisibleCrash();
            return true;
        }

        else {
            return false;
        }
    }

    startGame() {
        this.interval = setInterval(() => {
            this.moveCrash()
        }, 220);
    }
}