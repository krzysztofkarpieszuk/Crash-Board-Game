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
        this.board[this.index(this.crash.x, this.crash.y)].classList.add(".crash"); // adding crash class to div which has crash currently
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
}