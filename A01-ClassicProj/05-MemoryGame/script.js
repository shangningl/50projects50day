// 选择器，选游戏组件
const selectors = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
};
// 游戏状态
const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};

/**数组随机交换内部元素 */
const shuffle = (array) => {  
  const clonedArray = [...array];
  for (let i = clonedArray - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const original = clonedArray[i];

    clonedArray[i] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }
  return clonedArray;
};

/**随机挑选元素生成新数组 */
const pickRandom = (array, items) => {
  const clonedArray = [...array];
  const randomPicks = [];

  for (let i = 0; i < items; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    randomPicks.push(clonedArray[randomIndex]);
    // clonedArray删除该位置元素
    clonedArray.splice(randomIndex, 1);
  }
  return randomPicks;
};

/**初始化 */
const generateGame = () => {
  const dimensions = selectors.board.getAttribute("data-dimension");
  // dimension要求为偶数(卡牌要成对)
  if (dimensions % 2 !== 0) {
    throw new Error("The dimension of the board must be an even number.");
  }
  const emojis = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏"];

  // 挑足够的卡牌，复制成一对传入shuffle打乱
  const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
  const items = shuffle([...picks, ...picks]);
  // 生成4*4的格子 
  const cards = `
  <div class="board" style="grid-template-columns: repeat(${dimensions},auto)">
  ${items
    .map(
      (item) => `
    <div class="card">
      <div class="card-front"></div>
      <div class="card-back">${item}</div>
    </div>
  `
    )
    .join("")}
  </div>
  `;
  const parser = new DOMParser().parseFromString(cards, "text/html");
  selectors.board.replaceWith(parser.querySelector(".board"));
};

const startGame = () => {
  state.gameStarted = true;
  selectors.start.classList.add("disabled");

  // 每秒显示当前步数与时间
  state.loop = setInterval(() => {
    state.totalTime++;
    selectors.moves.innerText = `${state.totalFlips} 步`;
    selectors.timer.innerText = `${state.totalTime} 秒`;
  }, 1000);
};

/**卡牌翻回背面 */
const flipBackCards = () => {
  document.querySelectorAll(".card:not(.matched)").forEach((card) => {
    card.classList.remove("flipped");
  });
  state.flippedCards = 0;
};
/**翻卡 */
const flipCard = (card) => {
  state.flippedCards++;
  state.totalFlips++;

  // 翻第一张卡时默认开始
  if (!state.gameStarted) {
    startGame();
  }
  if (state.flippedCards <= 2) {
    card.classList.add("flipped");
  }
  if (state.flippedCards === 2) {

    const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
    // 判断两张卡内容是否一致
    if (flippedCards[0].innerText === flippedCards[1].innerText) {
      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");
    }

    // 定时器1s，自动翻回背面
    setTimeout(() => {
       flipBackCards(); 
    }, 1000);
  }

  // 卡牌全部被翻开
  if(!document.querySelectorAll('.card:not(.flipped)').length){
    setTimeout(() => {
      // 将卡牌板翻面并结束游戏
       selectors.boardContainer.classList.add('flipped') ;
       selectors.win.innerHTML=`
       <span class="win-text">
         你赢了! <br/>
         通过 <span class="highlight">${state.totalFlips}</span>
         步<br/>
         使用了 <span class="highlight">${state.totalTime}</span>
         秒
       </span>
       `
       clearInterval(state.loop);
    }, 1000);
  }
};
/**添加按钮事件监听 */
const attachEListeners=() => {
    document.addEventListener('click',event=>{
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if(eventTarget.className.includes('card')&& !eventParent.className.includes('flipped')){
          // 点击【背面的】【卡片】
            flipCard(eventParent)
        }else if(eventTarget.nodeName==='BUTTON' && !eventTarget.className.includes('disabled')){
          // 点击【没有disabled样式的】【按钮】
            startGame();
        }
    })
}

generateGame();
attachEListeners();