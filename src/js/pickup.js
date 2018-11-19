export default class Pickup {
    constructor() {
        this.x = Math.floor(Math.random()*(12-0+1)+0); // random position on X axis
        this.y = Math.floor(Math.random()*(9-0+1)+0); // random position on Y axis
    }
}