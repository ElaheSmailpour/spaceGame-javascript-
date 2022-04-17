let KEY_SPACE = false; //32
let KEY_UP = false; //38
let KEY_DOWN = false; //40
let backgroundImage = new Image();
let canvas;
let ctx;
let rocket = {
    x: 50,
    y: 200,
    width: 100,
    height: 60,
    src: "/images/rocket.png"
};
let ufos = [];



document.onkeydown = function (e) {
    if (e.keyCode == 32) { //leertaste gedrückt
        KEY_SPACE = true;
    }
    if (e.keyCode == 38) { //nach oben gedrückt
        KEY_UP = true;
    }
    if (e.keyCode == 40) { //nach unten gedrückt
        KEY_DOWN = true;
    }
}

document.onkeyup = function (e) {
    if (e.keyCode == 32) { //leertaste losgelassen
        KEY_SPACE = false;
    }
    if (e.keyCode == 38) { //nach oben losgelassen
        KEY_UP = false;
    }
    if (e.keyCode == 40) { //nach unten losgelassen
        KEY_DOWN = false;
    }
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
    ufos.forEach(function (ufo) {
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    })
    requestAnimationFrame(draw)
}
function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    loadImages();
    setInterval(update, 1000 / 25);
    setInterval(createUfos, 5000);
    setInterval(checkForCollion, 1000 / 25);
    draw();
}
function checkForCollion() {
    ufos.forEach(function (ufo) {
        if (rocket.x + rocket.width > ufo.x && rocket.y + rocket.height > ufo.y && rocket.x < ufo.x && rocket.y < ufo.y) {
            rocket.img.src="/images/boom.png";
            console.log("collion!!!");
           ufos=ufos.filter(u=> u !=ufo);
        }
    })
}
function createUfos() {
    let ufo = {

        x: 800,
        y: 200,
        width: 100,
        height: 40,
        src: "/images/ufo.png",
        img: new Image()
    }
    ufo.img.src = ufo.src; //ufo-Bild wird geladen.
    ufos.push(ufo);
}
function update() {
    if (KEY_UP) {
        rocket.y -= 4;
    }
    if (KEY_DOWN) {
        rocket.y += 4;
    }
    ufos.forEach(function (ufo) {
        ufo.x -= 5;
    })
}
function loadImages() {
    backgroundImage.src = "images/space.png";
    rocket.img = new Image();
    rocket.img.src = rocket.src;

}