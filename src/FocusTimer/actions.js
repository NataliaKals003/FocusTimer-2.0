import state from "./state.js";
import * as music from "./audio.js";
import * as timer from "./timer.js";
import * as el from "./elements.js"

export function start() {
    state.isRunning = document.documentElement.classList.toggle('running')
    timer.countdown()
}

export function pause() {
    state.isRunning = document.documentElement.classList.toggle('running')
}

export function reset() {
    state.isRunning = false;
    document.documentElement.classList.remove('running')
    timer.updateDisplay()
}

export function plusFive() {
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)
    seconds += 5

    if (seconds > 60) {
        minutes += 1;
        seconds -= 60
    }
    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
}

export function minusFive() {
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)
    seconds -= 5

    if (seconds < 0) {
        seconds = 55;
        minutes -= 1;
    }

    if (minutes < 0) {
        reset()
        return
    }
    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
}

let activeCard = null;
const audioElements = {
    cardFlorest: music.florestAudio,
    cardRain: music.rainAudio,
    cardStore: music.storeAudio,
    cardFire: music.fireAudio,
};

export function activateCard(cardName) {
    const isSameCardClicked = activeCard === cardName;

    if (activeCard) {
        const previousButton = document.querySelector(`button[data-action="${activeCard}"]`);
        if (previousButton) {
            previousButton.classList.remove('active');
        }
        audioElements[activeCard].pause();
    }

    if (!isSameCardClicked) {
        const currentButton = document.querySelector(`button[data-action="${cardName}"]`);
        if (currentButton) {
            currentButton.classList.add('active');
        }

        audioElements[cardName].play();
        activeCard = cardName;
    } else {
        activeCard = null;
    }
}

export function cardFlorest() {
    state.isActive = false;
    activateCard("cardFlorest");
}

export function cardRain() {
    state.isActive = false;
    activateCard("cardRain");
}

export function cardStore() {
    state.isActive = false;
    activateCard("cardStore");
}

export function cardFire() {
    state.isActive = false;
    activateCard("cardFire");
}

