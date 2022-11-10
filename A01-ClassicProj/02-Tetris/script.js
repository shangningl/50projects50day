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
  // 凸型
  {
    0: {
      row: 1,
      col: 1,
    },
    1: {
      row: 0,
      col: 0,
    },
    2: {
      row: 1,
      col: 0,
    },
    3: {
      row: 2,
      col: 0,
    },
  },
  // 田型
  {
    0: {
      row: 1,
      col: 1,
    },
    1: { row: 2, col: 1 },
    2: { row: 1, col: 2 },
    3: { row: 2, col: 2 },
  },
  // 一型
  {
    0: {
      row: 0,
      col: 0,
    },
    1: { row: 0, col: 1 },
    2: { row: 0, col: 2 },
    3: { row: 0, col: 3 },
  },
  // z型
  {
    0: {
      row: 1,
      col: 1,
    },
    1: {
      row: 1,
      col: 2,
    },
    2: {
      row: 2,
      col: 2,
    },
    3: {
      row: 2,
      col: 3,
    },
  },
];

let currentModel = {};
let currentX = 0,
  currentY = 0;

// {key:'rol_col' val:}
let fixedBox = {};
// 定时器
var mI = null;
/**入口函数
 * 初始化
 */
function init() {
  createModel();
  onKeyDown();
}

/**创建方块
 */
function createModel() {
  // 判断游戏是否结束
  if(isOver()){
    gameOver()
    return;
  }
  // 确定当前使用的模型
  currentModel = MODELS[Math.round(Math.random() * (MODELS.length - 1))];
  // 初始化模型位置
  currentX = 0;
  currentY = 0;
  // 生成模型的元素
  for (let key in currentModel) {
    let divEl = document.createElement("div");
    divEl.className = "activity-model";
    let container = document.getElementById("container");
    container.appendChild(divEl);
  }
  // 定位并渲染模型
  locationBlocks();
  // 自动下落
  autoDown();
}

/**定位方块的位置
 */
function locationBlocks() {
  // 判断越界行为,修正16宫格的位置
  checkBorder();

  let els = document.getElementsByClassName("activity-model");
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    let blockModel = currentModel[i];

    el.style.top = (blockModel.row + currentY) * _STEP + "px";
    el.style.left = (blockModel.col + currentX) * _STEP + "px";
  }
}

/**键盘监听
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
      rotate();
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

/**方向移动函数
 *
 * @param {Number} x x方向变化
 * @param {Number} y y方向变化
 */
function move(x, y) {
  /*单个方块操作  

  // getElementsByClassName返回值是数组
  const am = document.getElementsByClassName("activity-model")[0];

  am.style.top = parseInt(am.style.top || 0) + y * _STEP + "px";
  am.style.left = parseInt(am.style.left || 0) + x * _STEP + "px";
  */

  if (isMeet(currentX + x, currentY + y, currentModel)) {
    // 如果是向下移动,发生了碰撞，即固定模型
    if (y !== 0) fixedBottomModel();
    return;
  }
  // 块元素所属小容器的定位
  currentX += x;
  currentY += y;
  // 重新定位并渲染块
  locationBlocks();
}

/**模型旋转
 */
function rotate() {
  cloneCurrentModel = clone(currentModel);

  for (const key in cloneCurrentModel) {
    let blockModel = cloneCurrentModel[key];
    /**旋转细节
     * 旋转后的行 = 旋转前的列
     * 旋转后的列 = 3-旋转前的行
     */
    let t = blockModel.row;
    blockModel.row = blockModel.col;
    blockModel.col = 3 - t;
  }

  if (isMeet(currentX, currentY, cloneCurrentModel)) {
    return;
  }
  currentModel = cloneCurrentModel;
  locationBlocks();
}
/**深拷贝 */
function clone(obj) {
  if (obj === null) return null;
  if (obj.constructor !== "object") return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  var newObj = new obj.constructor(); //保持继承的原型
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      newObj[key] = typeof val === "object" ? arguments.callee(val) : val;
    }
  }
  return newObj;
}

/**检查模型边界
 */
function checkBorder() {
  const leftBorder = 0,
    rightBorder = _COL_COUNT,
    bottomBorder = _ROW_COUNT;
  for (const key in currentModel) {
    let blockModel = currentModel[key];
    if (blockModel.col + currentX < leftBorder) {
      // 左侧越界
      currentX++;
    } else if (blockModel.col + currentX >= rightBorder) {
      // 右侧越界
      currentX--;
    } else if (blockModel.row + currentY >= bottomBorder) {
      // 底部越界
      currentY--;
      // 将模型固定在底部
      fixedBottomModel();
    }
  }
}

/**固定底部的方块
 */
function fixedBottomModel() {
  let ams = document.getElementsByClassName("activity-model");

  // 由于ams.length会随着页面更新自动更新出现bug,采用反向遍历
  for (let i = ams.length - 1; i >= 0; i--) {
    const el = ams[i];

    el.className = "fixed-model";

    let blockModel = currentModel[i];
    fixedBox[currentY + blockModel.row + "_" + (currentX + blockModel.col)] =
      el;
  }
  // 判断行是否被铺满
  isFilledLine();

  // 固定之后生成新的方块
  createModel();
}

/**碰撞检测
 *
 * @param {Number} x x方向变化
 * @param {Number} y y方向变化
 * @param {*} model 当前模型
 * @returns
 */
function isMeet(x, y, model) {
  // 判断【将要移动的位置】是否存在被固定的模型
  for (let k in model) {
    let blockModel = model[k];
    let prop = y + blockModel.row + "_" + (x + blockModel.col);
    if (fixedBox[prop]) {
      return true;
    }
  }
  return false;
}

/**判断行是否被铺满 */
function isFilledLine() {
  /**
   * 如果采用反向遍历行，只能下落一行
   * 因为该行已被遍历并下落，后续遍历中不会访问该行，所以造成只能下落一行
   */
  for (let i = 0; i < _ROW_COUNT; i++) {
    let flag = true;
    for (let j = _COL_COUNT - 1; j >= 0; j--) {
      let prop = i + "_" + j;
      if (!fixedBox[prop]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      // 该行已满
      // console.log('本行已经满了');
      removeLine(i);
    }
  }
}

/**清理被铺满的行
 *
 * @param {Number} line
 */
function removeLine(line) {
  for (let j = 0; j < _COL_COUNT; j++) {
    // 删除该行的块元素
    document.getElementById("container").removeChild(fixedBox[line + "_" + j]);
    // 删除该行数据源
    fixedBox[line + "_" + j] = null;
  }
  downLine(line);
}

function downLine(line) {
  for (let i = line - 1; i >= 0; i--) {
    for (let j = 0; j < _COL_COUNT; j++) {
      let prop = i + "_" + j;
      if (fixedBox[prop]) {
        fixedBox[i + 1 + "_" + j] = fixedBox[prop];
        fixedBox[i + 1 + "_" + j].style.top = (i + 1) * _STEP + "px";
        fixedBox[prop] = null;
      }
    }
  }
}

function autoDown() {
  if (mI) clearInterval(mI);
  mI = setInterval(() => {
    move(0, 1);
  }, 600);
}

function isOver() {
  for (let j = 0; j < _COL_COUNT; j++) {
    if (fixedBox["0_" + j]) return true;
  }
  return false;
}
function gameOver(){
  if(mI)clearInterval(mI);
  alert("游戏结束！")
}
