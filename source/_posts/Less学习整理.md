---
title: Less学习整理
date: 2016-11-19 00:00:00
tags:
- Less
- CSS预处理
---

![logo.png](/images/20170118/6.png)
##### 什么是Less？
Less是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。
知道Less是什么很重要，Less的出现就是为了方便程序员编写的，如果你使用Less还像写css那样编写，那使用Less是没有意义的。
<!-- more -->
##### 基础语法
###### 变量
如果学过编程语言，那么就很好理解，Less使用**@**来定义一个变量，之后想使用变量中的值就直接调用变量就好。
```
@color: #fff;
#header {color: @color;}
```
###### 混合
我认为混合是很有用的，尤其是在写css3的时候。
```
.rounded-corners (@radius: 5px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    -ms-border-radius: @radius;
    -o-border-radius: @radius;
    border-radius: @radius;
}
#header {
    .rounded-corners;
}
#footer {
    .rounded-corners(10px);
}
```
编译后：
```
#header {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
#footer {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
}
```
在这里要注意，你可以指定参数，可以给参数赋值也可以不赋值，看需要而定。
###### 嵌套
这是Less中最常用的，嵌套实现了在一个选择器里嵌套另一个选择器，从而实现选择器的继承，减少代码量。
```
#header {
    h1 {
        font-size: 26px;
        font-weight: bold;
    }
    p {
        font-size: 12px;
        a {
            text-decoration: none;
            &:hover {
                border-width: 1px
            }
        }
    }
}
```
编译后：
```
 #header h1 {
    font-size: 26px;
    font-weight: bold;
}
#header p {
    font-size: 12px;
}
#header p a {
    text-decoration: none;
}
#header p a:hover {
    border-width: 1px;
}
```
需要注意的一点是**&**代表上一级选择器。
###### 运算
在Less中支持加，减，乘，除操作，也可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。
##### 总结
我觉得Less既然作为一个方便程序员写css的语法，我们使用的时候就不应该像写css那样去用，提前的设计是比较重要的，应该先规划好比如：哪几个属性值、颜色常用？可以定义为变量，哪个选择器里的样式我可以直接调用？这样才能做到真正的简化、方便。我个人的实践还是比较少，等以后用得多了再来补充～
