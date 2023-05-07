const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true 

function draw(x, y){
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke(); 
    hue++;

    if (hue > 360){
            hue = 0;
    }
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1){
            direction = !direction; 
    }
    if (direction) {
        ctx.lineWidth++; 
    } else {
        ctx.lineWidth--; 
    }

    [lastX, lastY] = [x, y]
}

function handleMouseDown(e) {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
}

function handleTouchStart(e) {
    e.preventDefault();
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
}

function handleMouseMove(e) {
    draw(e.clientX, e.clientY);
}

function handleTouchMove(e) {
    e.preventDefault();
    draw(e.touches[0].clientX, e.touches[0].clientY);
}

function handleMouseUp() {
    isDrawing = false;
}

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseout", handleMouseUp);
canvas.addEventListener("touchend", handleMouseUp, { passive: false });