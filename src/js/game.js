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
        return x + (y * 10);
    }

    showCrash() {
        this.board[this.index(this.crash.x, this.crash.y)].classList.add("crash"); // adding crash class to div which has crash currently
    }

    showPickup() {
        let box = this.board[this.index(this.pickup.x, this.pickup.y)];

        let pickupType = Math.floor(Math.random() * (3 - 1 + 1) + 1);

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
        hiddenCrash.classList.remove("crash");
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

    startGame() {
        this.interval = setInterval(() => {
            this.moveCrash()
        }, 250);
    };
}