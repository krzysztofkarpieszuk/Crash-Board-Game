import Game from './game';

document.addEventListener('DOMContentLoaded', function() {

    const deviceWidth = window.matchMedia("screen and (max-width: 652px)");
    const resolutionMsg = document.querySelector(".resolution-msg");

        if (deviceWidth.matches) {
            resolutionMsg.classList.remove("hidden");
            document.querySelector(".board").classList.add("hidden");
            document.querySelector(".score").classList.add("hidden");
        } else {
            // Creating new game and calling methods to start game
            const gameOne = new Game();
            gameOne.showCrash();
            gameOne.showPickup();
            gameOne.startGame();
    
            // Listener for crash movement control
            document.addEventListener('keydown', (e) => {
                gameOne.turnCrash(e);
            })
        }

        const restartBtn = document.querySelectorAll(".game-over__restart-btn");
            // Listener for Play Again button
            for (let el of restartBtn) {
                el.addEventListener('click', function() {
                    window.location = window.location; // refresh page on button click
                })
            }
    })