const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let FPS = 60;
const radius = 30;
let x = 200;
let y = 300;
let xSpeed = 8;
let ySpeed = 10;
let canvasClick = 0;

let count = 0;

function start(){
    document.getElementById("banner").style.display="none";
    document.getElementById("banner1").style.display="inherit";
    document.getElementById("demo").style.display="inherit";
}

function clear() {
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "yellow";
    context.fill();
}

function clickOnCanvas(){
    canvasClick = 1;
}

function reposition(){
    document.addEventListener("click", myFunction);
    function myFunction(e) {
        if(canvasClick===1){
        x= e.clientX;
        y= e.clientY;
        }
    }
}

function resetCount(){
    count = 0;
}

function speedUp(){
    FPS = FPS + 100;
}

function speedDown(){
    FPS = FPS - 100;
}

function update() {
    canvasClick = 0;
    x = x + xSpeed;
    y = y + ySpeed;

    const isCollidingWithRightSide = (x + radius >= canvas.width);

    if (isCollidingWithRightSide) {
        x = canvas.width - radius;
        xSpeed = -xSpeed;
        count = count +1;
    }

    const isCollidingWithLeftSide = (x - radius <= 0);

    if (isCollidingWithLeftSide) {
        x = 0 + radius;
        xSpeed = -xSpeed;
        count = count +1;
    }

    const isCollidingWithBottomSide = (y + radius >= canvas.height);

    if (isCollidingWithBottomSide) {
        y = canvas.height - radius;
        ySpeed = -ySpeed;
        count = count +1;
    }

    const isCollidingWithTopSide = (y - radius <= 0);

    if (isCollidingWithTopSide) {
        y = 0 + radius;
        ySpeed = -ySpeed;
        count = count +1;
    }
    
}

function animate() {
    clear();
    draw();
    reposition();
    update();
    document.getElementById('count').innerHTML = count;
}

window.setInterval(animate, 1000 / FPS);