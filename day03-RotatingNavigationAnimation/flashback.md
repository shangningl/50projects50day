## 思考回顾
***
<a href="https://www.bilibili.com/video/BV1BN4y1j77">coding过程参考</a>

day03的内容和之前相比，难度有所提升。

#### JS部分
整体页面的旋转，是在`container`上进行，内部的`circle-container`和`content`部分继承其新加的`show-nav`的样式。

#### CSS部分
接触到less之后，倾向于这种结构清晰的模式，与参考视频中的一些结构便有所冲突，顺带复习了CSS选择器之中空格的部分

```CSS
/**思考 button #close的情况*/
button#close{
    top: 60%;
    // 字体旋转了90°，此时的位置在圆的上部，所以用top
    transform: rotate(90deg);
    // 字体旋转中心为左上
    transform-origin: top left;
}
```

```CSS
/** nav>ul>li中的部分，将字体沿X轴向左平移移出页面 
*   并构造阶梯式效果呈现
*/
transform: translateX(-100%);
transform: translateX(-150%);
transform: translateX(-200%);
```

```CSS
.container.show-nav+nav li{
    // 让nav中li的平移效果失效，展示在页面中
    transform: translateX(0);
    // 延迟播放
    transition-delay: 0.3s;
}
```