const open = document.querySelector("#open");
const close = document.querySelector("#close");
const container = document.querySelector('.container');

// 添加旋转样式
open.addEventListener('click',() => {
    container.classList.add('show-nav');    
})

// 移除旋转样式
close.addEventListener('click',() => {
    container.classList.remove('show-nav');    
})

