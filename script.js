const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const colorPicker = document.querySelector("#color-picker");
const brushSize = document.querySelector("#brush-size");
const useCustomColor = document.querySelector("#use-custom-color");
const useCustomSize = document.querySelector("#use-custom-size");
const bgColorPicker = document.querySelector("#bg-color-picker");

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(x, y) {
    if (!isDrawing) return;

    if (useCustomColor.checked) {
        ctx.strokeStyle = colorPicker.value;
    } else {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        hue = (hue + 1) % 360;
    }

    if (useCustomSize.checked) {
        ctx.lineWidth = brushSize.value;
    } else {
        ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth - 1;
        if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
            direction = !direction;
        }
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
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

function setBackgroundColor() {
    canvas.style.backgroundColor = bgColorPicker.value;
}

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseout", handleMouseUp);
canvas.addEventListener("touchend", handleMouseUp, { passive: false });

bgColorPicker.addEventListener("change", setBackgroundColor);
