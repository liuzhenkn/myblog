---
title: 再读《JavaScript高级程序设计》(5)
date: 2017-02-24 00:00:00
tags:
- JavaScript
- 读书笔记
---

### 前言
这一篇是读书总结的最后一篇了，虽然后面还有不少章节，但是由于自己确实经验还不足，看完了之后仅仅是记住了书本上的内容，没有什么自己的一些想法，以后自己经验丰富了可能会再补充吧，Canvas自己可能会再学习一下单独开个学习记录。
本次的主要内容是第十、第十一章、十二、十三章的内容，关于DOM及其扩展以及事件相关的内容。

<!-- more -->

### 第十章 DOM 第十一章 DOM扩展

##### 什么是DOM？
DOM是文档对象模型，是针对HTML和XML文档的一个API。DOM描绘了一个层次化的节点树，使我们可以添加、移动和修改页面的某一部分。

##### DOM扩展
对DOM的两个主要扩展是Selectors API和HTML5。
querySelector()方法可以通过接收一个css选择符，返回匹配的 **第一个元素**。看起来和jQuery的选择方法有点像，但是注意只返回匹配的第一个元素。如果想都返回，需要使用querySelectorAll()方法。除此之外还有一个matchesSelector()方法，用于检测相应选择符的元素是否存在。

##### HTML5
HTML5的新增内容真的很多，我只提自己注意到的新的点。
自定义数据属性，为元素提供与渲染无关的信息。
```
<div id="test" data-name="jerry"></div>

var div = document.getElementById("test");
var name = div.dataset.name;
```
以前我都是使用jQuery，使用data()方法来取得、设置值，原生的Javascript与jQuery在这里不同，使用的是dataset。这一点要注意不要混淆。

### DOM2和DOM3
前面我们也讲过，DOM1级主要定义的是HTML和XML文档的底层结构。DOM2和DOM3级则在底层结构上引入了更多的交互能力。
这里我主要看了元素大小，因为有很多属性，所以经常混淆。
- offsetHeight、offsetWidth：元素占用的宽高，包括元素的宽高、可见的滚动条的宽高以及边框。
- offsetTop、offsetLeft： 指的是元素的边框到 **包含元素** 的内边框的距离。
客户区大小
- clientHeight、clientWidth: 是指内容区宽高加上内边框宽高。
滚动大小
- scrollHeight、scrollWidth：没有滚动条的情况下，元素内容的总宽高
- scrollLeft、scrollTop：被隐藏在内容区域左侧及上侧像素数，所以可以通过设置来改变滚动位置。

![](/images/20170218/1.gif)

### 事件
事件的话主要还是理解事件流，事件流是从页面中接收事件的顺序。要知道的是，IE的事件流是冒泡流、而Netscape Communicator的事件流是事件捕获流。
冒泡流就是说事件最准确的元素逐级向上，而捕获流是时间从最上级一直到最精确的元素。
DOM2级时间规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。虽然DOM2级事件明确要求捕获阶段不会涉及事件目标，但是在高版本浏览器中都会在捕获阶段触发事件，结果就是有两个机会在目标对象上操作事件。
##### 事件处理程序
DOM0级事件处理程序将一个函数复制给一个事件处理程序属性。
```
btn.onclick = function(){
  alert("DOM0级事件处理程序");
}
```
DOM2级事件处理程序定义了两个方法addEventListener()和removeEventlistener()。注意ie是attachEvent()和detachEvent()。
使用DOM2级事件处理程序的好处是可以在一个元素定义多个事件处理程序。

##### 事件委托
当事件处理程序过多时，需要使用事件委托。事件委托利用了事件冒泡，只制定一个事件处理程序就可以管理某一类型的所有事件。
把事件绑定自父元素，在父元素的事件处理程序中进行判断(通过target)。(我就不举例子了这次，使用过的同学应该都清楚。)
