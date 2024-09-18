import './style.css';

let counter = {

    count: 1,

    increment: function() {
        this.count++;
    },

    decrement: function() {
        this.count--;
    },

    reset: function() {
        this.count = 1
    },

    change: function(num) {
        this.count = num;
    }
}

function imageTranslate() {
    let images = document.querySelectorAll("li");
    let translateDistance;

    switch (counter.count) {
        case 1:
            translateDistance = '0';
            break;
        case 2:
            translateDistance = '-600';
            break;
        case 3:
            translateDistance = '-1200';
            break;
        default:
            translateDistance = 0;
    }

    images.forEach(image => image.style.transform = `translate(${translateDistance}px)`)
    makeActiveDot();
}

let timeout = {

    start: function() {
        this.startInterval = setInterval(() => {
            nextImage();
        }, 2500);
    },

    reset: function() {
        clearInterval(this.startInterval);

        this.start();
    }
};

function nextImage() {
    if (counter.count === 3) {
        counter.reset();
        imageTranslate();
    } else {
        counter.increment();
        imageTranslate();
    }
}

function previousImage() {
    if (counter.count === 1) {
        counter.change(3);
        imageTranslate();
    } else {
        counter.decrement();
        imageTranslate();
    }
}

function addArrowListeners() {
    let previousArrow = document.querySelector("#previous-arrow");
    let nextArrow = document.querySelector("#next-arrow");

    previousArrow.addEventListener("click", () => {
        timeout.reset();
        previousImage();
    })
    nextArrow.addEventListener("click", () => {
        timeout.reset();
        nextImage();
    })
}

function addNavDotListeners() {
    let navdots = document.querySelectorAll(".dot");
    navdots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            timeout.reset();
            counter.change(index + 1);
            imageTranslate();
        });
    });
}

function makeActiveDot() {
    const navdots = document.querySelectorAll(".dot");
    let activeDot = navdots[counter.count - 1]

    navdots.forEach(dot => dot.classList.remove("active"));
    activeDot.classList.add("active");
}

function initialisePage() {
    timeout.start();
    addArrowListeners();
    addNavDotListeners();
}

window.addEventListener("DOMContentLoaded", initialisePage);

