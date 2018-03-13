---
title: css3 动画相关回顾
date: 2018-03-13 03:29:00
tags:
- css
---

#### 前言

突然想起来回顾是因为在写一个很简单的小动画的时候突然觉得自己动画相关的内容都忘了差不多了，所以想起来就总结一下吧。

#### transition
transition 的意思是过渡，即从一个样式到另一个样式过度的动画。

举个例子：

``` css
div {
    width: 100px;
    height: 100px;
    transition: width 2s;
}

div:hover {
    width: 200px;
}
```

上述代码里，我们指定了 width 的过渡，当鼠标 hover div 时，width 会在两秒内过渡到 200px，当然我们也可以指定其他属性！

其实 transition 是个简写，其中一共有四个属性：

- transition-property
- transition-duration
- transition-timing-function
- transition-delay

即需要过渡到属性、过渡时间、动画曲线、延时，具体值可以自己查啦，多用用就记住了。

#### transform

transform 是变换，我们可以使用这个属性来对我们到元素做一些以前做不到的骚操作，虽然不是动画，但是经常和 transition 联合使用来实现一些奇妙的效果。

举个简单的例子：

``` css
div {
    width: 100px;
    height: 100px;
    background: blue;
    transition: all 2s;
}

div:hover {
    transform: rotate(360deg);
}
```

上述代码当我们 hover div 时，div 就会旋转 360 度，在离开时，再旋转回去。

当然 transform 不止旋转 ，还有 2D3D转换、2D3D缩放、倾斜、透视等效果，具体可以去查。

#### animation

顾名思义就是动画，它可以实现一些更复杂的动画。

好吧先 show the code:

```css
div{
    position: relative;
    width: 100px;
    height: 100px;
    background: blue;
    animation: mymove 5s infinite;
}

@keyframes mymove{
    0% {
        left:0px;
    }

    50% {
        left: -100px;
    }

    100% {
        left:200px;
    }
}
```

animation 要配合定义的动画‘函数’来使用，我们可以设置动画的在不同时间段的效果和动画播放次数，结合起来上面的 transform 就可以实现非常复杂的动画。

当然 animation 也只是个简写属性，其具体属性有：

- animation-name
- animation-duration
- animation-timing-function
- animation-delay
- animation-iteration-count
- animation-direction

动画名称、动画时间、动画曲线、延迟、播放次数、是否轮流反向播放

#### finally

好吧就写这些，希望以后自己再写 css 动画的时候不再要想好久。