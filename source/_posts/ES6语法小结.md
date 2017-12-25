---
title: ES6语法小结
date: 2017-12-15 15:43:46
author: zhenkunliu
tags:
- javascript
- es6
---

### 前言

拖拖拖了好久终于来总结了（都快忘光了，正好当复习了吧。

<!-- more-->

### let

#### 块级作用域

let 类似于 var ，但是用 let 生命出来的变量具有块级作用域（var 只有全局作用域和函数作用域），这样其实就解决了我们我们经常遇到的一种情况：

``` javascript
var test1 = [];
for (var i = 0; i < 5; i++) {
    test1[i] = function() {
        console.log(i);
    }
}
test1[1](); // 5

var test2 = [];
for (let i = 0; i < 5; i++) {
    test2[i] = function() {
        console.log(i);
    }
}
test2[1](); // 1
```

var 声明的 i 是具有全局作用域的，所以在执行 console.log(i) 的时候会输出 5， 但是对于 let 声明的 i 来说，实际上每一轮都声明了一次，因为其设置循环的部分是有作用域的，每一个 function 中的 i 都是其相应的值。

#### 无变量声明提升

let 无变量声明提升，如果在声明前使用变量则会报错，而不是像以前一样当 undefined 处理。

#### 暂时性死区

只要块级作用域内使用 let，它所声明的变量就绑定在这个作用域里，在声明前使用同名变量都会报错。

``` javascript
var tmp = '';
if (true) {
  tmp = 'abc'; // 报错
  console.log(tmp); // 报错

  let tmp; // 声明前都为暂时性死区
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

#### 不允许重复声明

在相同作用域中重复声明会报错。


### const

const 声明一个只读的常量。一旦声明，常量的值就不能改变。其拥有和 let 一样的几条特性：块级作用域、无函数声明提升、暂时性死区、不允许重复声明。

其本质是变量指向的内存地址不得改动，对于简单数据类型则永远不会变了，而对于复杂数据类型，因为内存地址里保存的只是个指针，其指向的内容还是可以改变的。

``` javascript
const test = {};

test.prop = 'hhh';
test.prop // hhh

test = {}; // 报错
```