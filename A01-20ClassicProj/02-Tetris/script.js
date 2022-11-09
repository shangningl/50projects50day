// 常量,方块步长20px
const _STEP = 20;
// 分割容器,18*10
const _ROW_COUNT = 18,
  _COL_COUNT = 10;

// 使用数组存储模型，方便使用随机
const MODELS = [
  //L型
  {
    0: {
      row: 1,
      col: 0,
    },
    1: {
      row: 1,
      col: 1,
    },
    2: {
      row: 1,
      col: 2,
    },
    3: {
      row: 0,
      col: 2,
    },
  },
];

let currentModel = {};
let currentX = 0,
  currentY = 0;
/**入口函数
 * 初始化
 */
function init() {
  createModel();
  onKeyDown();
}

/**创建方块
 *
 */
function createModel() {
  // 确定当前使用的模型
  currentModel = MODELS[0];
  // 生成模型的元素
  for (let key in currentModel) {
    let divEl = document.createElement("div");
    divEl.className = "activaty-model";
    let container = document.getElementById("container");
    container.appendChild(divEl);
  }
  // 定位并渲染模型
  locationBlocks();
}

/**定位方块的位置
 *
 */
function locationBlocks() {
  let els = document.getElementsByClassName("activaty-model");
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    let blockModel = currentModel[i];

    el.style.top = (blockModel.row + currentY) * _STEP + "px";
    el.style.left = (blockModel.col + currentX) * _STEP + "px";
  }
}

/**键盘监听
 *
 */
function onKeyDown() {
  document.onkeydown = function (e) {
    let k = e.key;
    // 定义移动方向数组
    const UP = ["ArrowUp", "w", "W"],
      DOWN = ["ArrowDown", "s", "S"],
      LEFT = ["ArrowLeft", "a", "A"],
      RIGHT = ["ArrowRight", "d", "D"];
    if (UP.includes(k)) {
      // console.log("上");
      move(0, -1);
    } else if (DOWN.includes(k)) {
      // console.log("下");
      move(0, 1);
    } else if (LEFT.includes(k)) {
      // console.log("左");
      move(-1, 0);
    } else if (RIGHT.includes(k)) {
      // console.log("右");
      move(1, 0);
    }
  };
}

/**方向盘移动函数
 *
 * @param {Number} x
 * @param {Number} y
 */
function move(x, y) {
  /*单个方块操作  

  // getElementsByClassName返回值是数组
  const am = document.getElementsByClassName("activaty-model")[0];

  am.style.top = parseInt(am.style.top || 0) + y * _STEP + "px";
  am.style.left = parseInt(am.style.left || 0) + x * _STEP + "px";
  */

  // 块元素所属小容器的定位
  currentX += x;
  currentY += y;
  // 重新定位并渲染块
  locationBlocks()
}
