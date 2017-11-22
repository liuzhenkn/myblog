---
title: Promise、Generator 函数与 async/await
date: 2017-09-18 16:23:46
author: zhenkunliu
tags:
---

#### 前言
本次分享的内容是 Promise、Generator 函数与 async/await ，都是与**异步操作**相关的内容，我们常见的异步操作基本是：**回调函数**和**事件监听**，本次分享中主要以AJAX为例。

```javascript
var request = new XMLHttpRequest();

request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status === 200) {
            return success(request.responseText);
        } else {
            return fail(request.status);
        }
    }
}

request.open('GET', '/api/categories');
request.send();
```
<!-- more -->

#### Promise

首先先看一下Promise是什么：

![Promise.png](/images/20171013/promise.png)

可以看到Promise是一个构造函数，里面有我们熟悉的all、 reject 、resolve 方法，原型上有 then、catch 方法，我们可以新建一个Promise 对象来使用。

```javascript
new Promise(
    /* executor */
    function(resolve, reject) {...}
);
```

我觉得文档上说的比我清楚的多：
>**Promise**对象是一个代理对象（代理一个值）。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。
一个 Promise有以下几种状态:
>> - *pending*: 初始状态，不是成功或失败状态。
>> - *fulfilled*: 意味着操作成功完成。
>> - *rejected*: 意味着操作失败。
>>
pending 状态的 Promise 对象可能触发 fulfilled 状态并传递一个值给相应的状态处理方法，也可能触发 rejected 状态 并传递失败信息。当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为*fulfilled*时，调用 then 的 onfulfilled 方法，当Promise状态为*rejected*时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。
因为 Promise.prototype.then 和 Promise.prototype.catch
方法返回 promise 对象， 所以它们可以被链式调用。

![promises.png](/images/20171013/promises.png)

##### 基本api
- Promise.resolve(value)

> 返回一个状态由给定value决定的Promise对象。如果该值是一个Promise对象，则直接返回该对象；如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。通常而言，如果你不知道一个值是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。

- Promise.reject(resason)

> 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法

- Promise.prototype.then(onFulfilled, onRejected)

> 添加肯定和否定回调到当前 promise, 返回一个新的 promise, 将以回调的返回值 来resolve.

- Promise.prototype.catch(onRejected)

> 添加一个否定(rejection) 回调到当前 promise, 返回一个新的promise。

- Promise.all(iterable) // 所有的完成
- Promise.race(iterable) // 竞速，完成一个即可

#### 应用

然后我们用Promise来重写一下ajax：

```javascript
function ajax (method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}

var p = ajax('GET', '/api/xxxx');
p.then(function (text) {
    console.log(text);
}).catch(function (status) {
    console.log('ERROR: ' + status);
});
```
看起来好像并没有什么改变，但是如果我们想一个请求完成再发起另一个请求呢？

```javascript
ajax ('GET',  '/api/hhh').then(function(data) {
  return ajax('POST', '/api/hhhh', data.body);
})
.then(function(data) {
  return ajax('POST', '/api/hhhhh', data.body);
})
.then(function() {
   console.log(data);
});
```
肯定比无限回调好看多了。

除此之外，我们可以使用 Promise.all() 来并行执行异步操作。

```javascript
function func(num){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(num);
        }, 1000);
    });
    return p;
}

Promise.all([func(1), func(2), func(3)])
.then(function(results){
    console.log(results);
});

// console的值为 [1, 2, 3]
```

三个异步操作的并行执行的，等到它们都执行完后才会进到then里面，all会把所有异步操作的结果放进一个数组中传给then，就是上面的results。

#### Generator 函数

之前没怎么接触过，Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同, 是一个可以返回多次的函数。
generator 函数由 **function***定义，除了 return 还可以使用 yield 返回多次。那到底怎么用？

##### 应用
先来个简单的例子：
斐波那契数列，一般我们要这样写：

```javascript
function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        t = a + b;
        a = b;
        b = t;
        arr.push(t);
    }
    return arr;
}
fib(5); // [0, 1, 1, 2, 3]
```

使用 generator：

```javascript
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 1;
    while (n < max) {
        yield a;
        t = a + b;
        a = b;
        b = t;
        n ++;
    }
    return a;
}

var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: true}

\\ 或者
for (var x of f) {
    console.log(x); // 依次输出0, 1, 1, 2, 3
}
```

要了解generator的内在，需要先了解一下Iterator。
Iterator是一个接口(好吧我一直不太明白，与特定规范匹配的属性值？)，只要是一系列和规范匹配的属性值(array、map、set等数据结构)，就认为其是可迭代的。
我们在控制台内创建一个数组，就会发现其有一个 Symbol.iterator 方法(我就是不太清楚是哪里来的，js引擎自己加的？)，这就是一个迭代器生成函数，执行该函数就会生成一个迭代器。
一个迭代器有next等方法， 其实就跟我们generator生成的迭代器类似，但是又不一样。看图我们可以理解一点，但是嗯，我觉得说不清楚，大家自行理解吧。
![iterator.png](/images/20171013/iterator.png)
![generator.png](/images/20171013/generator.png)
![prototype.png](/images/20171013/prototype.png)


#### async、await
首先他们来自 ES2016 ，为的是把异步操作变得更方便。 async 函数就是 Generator 函数的语法糖。
```

#### 参考文章
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[廖雪峰的javascript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

[Generator 函数的含义与用法](http://www.ruanyifeng.com/blog/2015/04/generator.html)

[async 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)