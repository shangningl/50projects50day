const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

// textarea.focus();

textarea.addEventListener("keyup", (e) => {
  //根据textarea内容创建tag
  createTags(e.target.value);

  // 检测回车之后设置一个定时器,并清空value
  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);
    // 随机挑选tag
    randomSelect();
  }
});

function createTags(input) {
  //每个tag之间用','分隔 trim()去除前后空格
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());
  tagsEl.innerHTML = "";

  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;
  // 设置循环执行
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

    setTimeout(() => {
      // 清理随机挑选循环
      clearInterval(interval)

      setTimeout(() => {
        // 随机选出最终结果
        const randomTag = pickRandomTag();
        highlightTag(randomTag);
      }, 100);

    }, times*100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  // 随机选一个tag
  return tags[Math.floor(Math.random() * tags.length)];
}

// 为tag设置高亮
function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}
