const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEL = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

const ctx = canvas.getContext("2d");

let size = 10,
  isPressed = false;
let color = "black";
let x, y;

/**左键按下 获取鼠标偏移量*/
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  // 事件对象与目标节点的padding edge的偏移量
  x = e.offsetX;
  y = e.offsetY;
});
/**左键起来 移除鼠标偏移量*/
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  // 清空子路径列表开始一个新路径
  ctx.beginPath();
  /**绘制圆弧路径的方法。
   * 圆弧路径的圆心在 (x, y) 位置，半径为 r，
   * 根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。 */
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  // 填充路径
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// 更新屏幕尺寸
function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

increaseBtn.addEventListener("click", () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => (color = e.target.value));

clearEl.addEventListener("click", () =>
  // 清空整个canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
