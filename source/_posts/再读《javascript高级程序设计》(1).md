---
title: 再读《JavaScript高级程序设计》(1)
date: 2017-02-20 00:00:00
tags:
- JavaScript
- 读书笔记
---

### 为什么要再读
首先我喜欢读实体书，喜欢在书上勾勾画画，其次，一本书我经常多次的阅读，这也是自己的一个读书心得和习惯吧，因为一本书不可能一次就把所有的东西领悟，通过我自己的经验发现，读完一本书经过一定的实践后，再读的时候会有很多恍然大悟之处，前面读过没有领悟到注意到的地方，都会在后续的阅读中发现。
因为自己实习了六个月，在这六个月中学习了不少新东西，基础也变得更牢固了，觉得有必要再读一遍《JavaScript高级程序设计》，看看能否有新的收获。当然不会面面俱到的都总结，只会把自己关注到的、遗忘了的知识进行记录总结。
<!-- more -->

### 第一章 Javascrpt简介

#### JavaScript的诞生
作为一个合格的前端开发同学，不了解JS的历史实在是说不过去。Javascript诞生于 **1995年** (和我同年哦！)，**NetScape公司的Brendan Eich开发的**，当时叫做LiveScript,其主要目的是处理以前由服务器端语言负责的对表单域的校验(因为当时上网速度很慢，提交到服务器校验会浪费大量时间)。 最后NetScape为了搭上当时正火热的Java的顺风车，LiveScript就改名为JavaScript。

#### JavaScript的实现
要知道JavaScript与ECMAScript并不是一个含义，一个完整的JavaScript实现应该由以下三部分组成。
- 核心(ECMAScript)
  ECMAScript就是实现ECMA-262标准各方面规定的各个方面内容的语言的描述。JavaScript实现了ECMAScript，其他有的语言也实现了。
  Web浏览器只是ECMAScript实现可能的宿主环境之一，其他的熟悉的宿主环境就是Node了。
- 文档对象模型(DOM)
  DOM级别分为三级，DOM1级分为DOM Core 和 DOM HTML，DOM核心规定的是如何映射基于XML的文档结构(我理解即DOM树？)，DOM HTML在DOM核心的基础上添加了针对HTML的对象和方法。
  DOM2级则在原来DOM的基础上扩充了鼠标及用户界面事件、范围、遍历等，通过对象接口增加了对CSS的支持，如下所示。
  DOM视图：定义了跟踪不同文档视图的接口。
  DOM事件：定义了事件和事件处理的接口。
  DOM样式：定义了基于CSS样式应用的接口。
  DOM遍历和范围：定义了遍历和操作DOM树的接口。
  DOM3级引入了统一方式加载和保存文档的方法(DOM Load and Save),新增了验证文档的方法(DOM Validation)。(对于三级理解不多，是指require export 吗？待考究)
- 浏览器对象模型(BOM)
BOM只处理浏览器窗口和框架(有时也把针对浏览器的JavaScript扩展算作BOM的一部分)。

### 第三章 基本概念

#### 语法
ECMAScript中的一切都严格区分大小写，标识符是指变量、函数、属性、参数的名字。
- 第一个字符必须是字母、下划线或美元符号$。
- 其他字符可以是字母、下划线、美元符号或数字。

#### 数据类型
ECMAScript中有六种数据类型，其中有五种简单数据类型(基本数据类型)：Undefined、Null、Boolean、Number、String，一种复杂数据类型Object。
null表示一个空对象指针，所以使用typeof操作符时返回object，所以在定义变量将来准备保存对象时应该初始化为null。
Number类型使用的是IEEE754格式来表示整数和浮点数，这也导致了浮点数值计算产生舍入误差问题，可以参考我以前写的文章[Javascript浮点数运算问题](http://liuzhenkn.github.io/2017/01/18/Javascript%E6%B5%AE%E7%82%B9%E6%95%B0%E8%BF%90%E7%AE%97%E9%97%AE%E9%A2%98/),所以不要测试某个特定浮点数。
数值范围在大多数浏览器中是5e-324到1.7976931348623157e+308，超出范围就会转化为+-Infinity。

#### 参数
参数在内部使用一个数组来表示的，函数接收的永远是这个数组而不关心包涵那些参数，在函数体内可以通过arguments对象来访问这个参数数组(arguments只是类似数组)。

### 第四章 变量、作用于和内存问题

#### 基本类型与引用类型
基本类型值指的是简单的数据段，引用类型值指的是可能由多个值组成的对象。
基本数据类型Undefined、Null、Boolean、Number、String，是按值访问的，可以操作保存在变量中的实际值。而引用类型的值是保存在内存中的对象。
在JavaScript中不允许直接访问内存中的位置，所以在操作对象时，是操作对象的引用(我理解是指针的指向)。
所以在复制变量的时候，基本类型是创建一个新的拷贝，复制前后的变量不会互相影响，而对于引用类型来说，实际上是创建了指向内存中同一个对象的指针，两个变量实际上引用的同一个对象，如果对其中一个进行改变，另一个也会受到影响（同样改变）。

#### 传递参数
ECMAScript中所有的参数都是按值传递的，即把函数外部的值复制给函数内部的参数（变量），不过基本类型和引用类型的复制方式不变，在向参数传递引用类型的值的时候，会把值在内存中的地址复制给局部变量，因此这个局部变量的变化会反映在函数外部。

#### 执行环境及作用域
每个执行环境都有一个与之关联的 **变量对象**,环境中定义的所有变量和函数都保存在这个对象中（在web浏览器中默认为windoww对象、node默认为golbal对象）。
每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就会被推入一个环境栈中，函数之行结束后，栈将其环境弹出，控制权返回给之前的执行环境。
当代码在一个环境中执行时，会创建变量对象的一个作用域链，用于保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端始终是当前执行的代码所在环境的变量对象，如果这个环境是函数，则将其 **活动对象** 作为变量对象。

#### 垃圾收集
暂时理解不多，以后再读补充。
