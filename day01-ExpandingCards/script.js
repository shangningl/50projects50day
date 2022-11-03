
const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
    // 点击事件监听，添加active样式
    panel.addEventListener('click',() => {
        // 先移除再添加
        removeActiveClass();
        panel.classList.add('active')       
    })
    
});

// 利用排他思想，移除其他active
function removeActiveClass(){
    panels.forEach((panel) => {
        panel.classList.remove('active')
    })
}