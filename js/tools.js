// Autor: LucasLyu

function generateRandomBackground(min, max, minformat, maxformat) {
    let randomformat = Math.floor(Math.random() * (maxformat - minformat + 1)) + minformat;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomformat === 1) {
        return './img/Background/background_' + randomNum + '.png';
    } else if (randomformat === 2) {
        return './img/Background/background_' + randomNum + '.jpg';
    } else {
        return './img/Background/background_1.png';
    }
}

function checkImage(src) {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

async function randomBackgroundGenerator(min, max) {
    let body = document.querySelector('body');
    let exitPic = false;
    let randomBackground;
    let minformat = 1;
    let maxformat = 2;

    do {
        randomBackground = generateRandomBackground(min, max, minformat, maxformat);
        exitPic = await checkImage(randomBackground);
    } while (!exitPic);

    body.style.backgroundImage = 'url(' + randomBackground + ')';
}

export {
    randomBackgroundGenerator
};