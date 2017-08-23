---
title: FLex布局学习记录
date: 2017-01-23 00:00:00
tags:
- CSS
- Flex布局
---


### 什么是Flex布局
Flex是Flexible Box的缩写，翻译过来就是弹性布局的意思，采用Flex布局的元素，称为Flex容器（flex container）。它的所有子元素自动成为容器成员，称为Flex项目（flex item）。

<!-- more -->

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
详细的属性就不赘述了，可以参考阮一峰老师的[《Flex 布局教程：语法篇》](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)。
![](/images/20170123/2.png)
十分不好意思直接就粘了阮一峰老师博客中的段落，因为阮一峰老师的博客中写的真的就已经很全面了，所以自己主要还是想通过自己学的把自己以前写的圣杯布局应用，改进一下。

### 圣杯布局实践
圣杯布局是指页面从上到下分为三部分：header、body、footer，其中body分为left、mid、right三部分，要求body中，mid宽度自适应,left和right固定宽度。
**html代码如下**
```
<div class="mod-flex">
  <header>header</header>
  <div class="mod-flex-body">
    <div class="mid">mid</div>
    <nav class="left">left</nav>
    <aside class="right">right</aside>
  </div>
  <footer>footer</footer>
</div>
```
**css代码如下**
```
.mod-flex {
  display: flex;
  flex-direction: column; //主轴为垂直方向，起点在上沿。
}

header,footer {
  flex: 1; //flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
}

.mod-flex-body {
  display: flex;
  min-height: 300px;
  flex: 1;
}

.mid {
  flex: 1;
}

.left, .right {
  flex: 0 0 200px;
  border:2px solid #eee;
}

.left {
  order: -1; //定义项目的排列顺序。数值越小，排列越靠前，默认为0。
}
```
![](/images/20170123/3.png)

我们再就可以通过媒体查询，来定义不同屏幕大小时的显示情况，使用起来非常方便，代码量也不多，自己目前也在尝试使用flex布局到自己的毕设中去，使用的比较有心得了之后再来填坑。


**参考博客：**
  阮一峰:[《Flex 布局教程：语法篇》](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
  阮一峰:[《Flex 布局教程：实例篇》](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
