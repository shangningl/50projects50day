const search = document.querySelector(".search");
const input = document.querySelector(".input");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  search.classList.toggle("active");
  // 聚焦到输入框
  input.focus();
});
