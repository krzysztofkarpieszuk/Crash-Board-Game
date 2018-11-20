import Game from './game';

const gameOne = new Game();
gameOne.showCrash();
gameOne.showPickup();
gameOne.startGame();

document.addEventListener('keydown', (e) => {
    gameOne.turnCrash(e);
});
