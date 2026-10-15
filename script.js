```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const predictionText = document.getElementById("prediction");
const confidenceText = document.getElementById("confidence");

let drawing = false;

// Canvas setup
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#000000";
ctx.lineWidth = 18;
ctx.lineCap = "round";
ctx.lineJoin = "round";

// Get mouse or touch position
function getPosition(event) {
  const rect = canvas.getBoundingClientRect();

  const point = event.touches
    ? event.touches[0]
    : event;

  return {
    x: (point.clientX - rect.left) * canvas.width / rect.width,
    y: (point.clientY - rect.top) * canvas.height / rect.height
  };
}

// Start drawing
function startDrawing(event) {
  event.preventDefault();
  drawing = true;

  const pos = getPosition(event);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

// Draw digit
function draw(event) {
  if (!drawing) return;

  event.preventDefault();

  const pos = getPosition(event);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

// Stop drawing
function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", startDrawing, {
  passive: false
});
canvas.addEventListener("touchmove", draw, {
  passive: false
});
canvas.addEventListener("touchend", stopDrawing);

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  predictionText.textContent = "--";
  confidenceText.textContent = "--";
}

// Predict digit
function predictDigit() {
  const imageData = ctx.getImageData(
    0, 0, canvas.width, canvas.height
  ).data;

  let hasDrawing = false;

  for (let i = 0; i < imageData.length; i += 4) {
    if (
      imageData[i] < 200 ||
      imageData[i + 1] < 200 ||
      imageData[i + 2] < 200
    ) {
      hasDrawing = true;
      break;
    }
  }

  if (!hasDrawing) {
    predictionText.textContent = "Draw a digit!";
    confidenceText.textContent = "--";
    return;
  }

  predictionText.textContent = "Model not connected";
  confidenceText.textContent = "--";
}
```
