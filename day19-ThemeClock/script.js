const secHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
  }
});

let secondDeg = 0,
  minDeg = 0,
  hourDeg = 0;

function setTime() {
  const time = new Date();

  // 获取日月星期
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();

  // 获取各指针并计算其表盘角度
  const second = time.getSeconds();
  secondDeg = 90 + (second / 60) * 360;
  const min = time.getMinutes();
  minDeg = 90 + (min / 60) * 360 + (second / 60 / 60) * 360;
  const hour = time.getHours();
  hourDeg =
    90 +
    (hour / 12) * 360 +
    (min / 60 / 12) * 360 +
    (second / 60 / 60 / 12) * 360;

  //解决指针跳顿问题
  //在发生跳顿的角度值处，将 CSS 的 `transition` 属性去掉
  if (secondDeg === 90) secHand.style.transition = "all 0s";
  else
    secHand.style.transition = "all 0.05s cubic-bezier(0.9, 0.54, 0.26, 1.68)";

  if (minDeg === 90) minHand.style.transition = "all 0s";
  else
    minHand.style.transition = "all 0.1s cubic-bezier(0.9, 0.54, 0.26, 1.68)";

  secHand.style.transform = `rotate(${secondDeg}deg)`;
  minHand.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;

  const hoursForClock = hour % 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  timeEl.innerHTML = `${hoursForClock}:${min < 10 ? `0${min}` : min} ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

/*
// 让角度累加(出现分针跳转多次的bug)
function updateDate() {
  secondDeg += (1 / 60) * 360;
  minDeg += (1 / 60 / 60) * 360;
  hourDeg += 1 / 60 / 60 / 12;

  secHand.style.transform = `rotate(${secondDeg}deg)`;
  minHand.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;

  console.log(`${hourDeg}:${minDeg}:${secondDeg}`);
}
*/

setTime();
setInterval(setTime, 1000);
