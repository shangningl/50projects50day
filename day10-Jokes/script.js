const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

jokeBtn.addEventListener("click", generateJoke);

generateJoke();

/**
 * 使用 async/await 异步
 */
async function generateJoke() {
  // 请求头的配置
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const res = await fetch("https://icanhazdadjoke.com", config);

  // 读取 Response 对象并且将它设置为已读
  // （因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），
  // 并返回一个被解析为 JSON 格式的 Promise 对象。
  const data = await res.json();
  jokeEl.innerHTML = data.joke;
}

/**
 * 使用 .then()
 */
// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//     },
//   }

//   fetch('https://icanhazdadjoke.com', config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke
//     })
// }
