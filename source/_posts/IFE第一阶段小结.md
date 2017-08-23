---
title: IFE第一阶段小结
date: 2016-07-20 00:00:00
tags:
- 总结
- CSS布局
---

最近参加百度前端技术学院的春季班，在这第一阶段也学习到了不少东西。以前听说过圣杯布局和双飞翼布局，但是从来没有自己去了解过，因为第一阶段的任务三与之相关，我便去了解了，在此记录下来。

<!-- more -->

### 圣杯布局
![圣杯布局](/images/20160319/1.png)
在这里，实现了左(200px) 右(220px) 宽度固定，中间自适应，container部分高度保持一致。
下面进行一些要点说明:

- html代码中 middle部分首先要放在container的最前部分。然后是left,right.
- 三块均要float:left;,再加上position:relative;用于后期定位.
- middle部分要width:100%;实现自适应.
- 因为middle占了100%,所以要将left拉回左边，设置margin-left:-100%;同理right设置margin-left:-220px;.
- 但是拉回来的left会覆盖middle左面部分，同理右面也是，所以需要给container添加padding:0 220px 0 200px;.
- 此时left和right也跟着移动了，所以分别添加left:-200px;right:-220px;

其余的样式就可以按照需求设置了.
还是把我的代码加上吧.
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		body{
			min-width: 630px;
		}
		.container{

			padding:  0 220px 0 200px;
			overflow: hidden;
		}
		.container div{
			text-align: center;
			line-height: 200px;
			float: left;
			position: relative;
			border: 1px solid #000;
			height: 200px;
		}
		.container .middle{
			width: 100%;
		}
		.container .left{
			width: 198px;
			margin-left: -100%;
			left: -200px;
		}
		.container .right{
			width: 218px;
			right: -220px;
			margin-left: -220px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="middle">mid</div>
		<div class="left">left</div>
		<div class="right">right</div>
	</div>
</body>
</html>
```
圣杯布局主要是利用position和负的margin值来将每一个部分定位。接下来是双飞翼布局。

### 双飞翼布局
![双飞翼布局](/images/20160319/2.png)
双飞翼布局始于淘宝UED，如果把三栏布局比作一只大鸟，可以把middle看成是鸟的身体，left和right则是鸟的翅膀。这个布局的实现思路是，先把最重要的身体部分放好，然后再将翅膀移动到适当的地方。
先直接上代码：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		body{
			min-width: 630px;
		}
		.container div{
			text-align: center;
			line-height: 200px;
			float: left;
			border: 1px solid #000;
			height: 200px;
		}
		.container .middle{
			width: 100%;
		}
		.container .left{
			width: 198px;
			margin-left: -100%;
		}
		.container .right{
			width: 218px;
			margin-left: -220px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="middle">主列</div>
		<div class="left">子列</div>
		<div class="right">附加列</div>
	</div>
</body>
</html>
```
在代码中我们可以发现，并没有像圣杯布局使用position:relative;,但是更容易理解一些。
