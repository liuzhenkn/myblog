---
title: 使用Express与MongoDB建立一个网站后台（1）
date: 2016-04-19 00:00:00
tags:
- 后端
- Node.js
- Express
---

本学期学习软件工程这门课程，所以老师要求分组完成一个项目————联想笔记本电脑销售网站，由于我们小组没有了解网站后台技术的同学，所以我就打算使用Node.js建立网站后台，数据库使用mongodb，在学习了一段时间之后，我将最近学习到的知识总结下来。

### 什么是Express

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

<!-- more -->

### 安装Express

假定我们已经安装好了Node.js,接下来我们需要为我们的应用创建一个目录。

```
npm install express -g
express sale
```
执行完后会在默认位置产生一个sale项目，里面的结构如下：
![](/images/20160426/1.png)
接下来我们进入这个文件夹，启动这个项目：
```
cd sales
npm start
```
如果发生错误缺少module,我们只需使用npm install 命令挨个再下载下来就好。
成功就会显示这样：
![](/images/20160426/2.png)
然后我们访问127.0.0.1:3000(默认端口3000)，如果显示是这样就说明你成功了：
![](/images/20160426/3.png)
是不是很简单？

### 了解几个概念

在使用Express之前,我们需要了解几个概念—————路由、中间件。

#### 路由

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个URI、HTTP 请求(GET、POST等)和若干个句柄组成，它的结构如下:app.METHOD(path, [callback…], callback),app是express 对象的一个实例,METHOD是一个HTTP请求方法,path是服务器上的路径,callback 是当路由匹配时要执行的函数。例如:
```
var express = require('express');
var app = express();
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
```
#### 中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。
中间件(Middleware)是一个函数，它可以访问请求对象(request object (req)), 响应对象(response object (res)), 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。
中间件的功能包括：
- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。
如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。
Express 应用可使用如下几种中间件：
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件
使用可选则挂载路径，可在应用级别或路由级别装载中间件。另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。
在这里我们只看应用级中间件和路由级中间件。

#### 应用级中间件

应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：
```
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```
#### 路由级中间件

路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
路由级使用 router.use() 或 router.VERB() 加载。

上述在应用级创建的中间件系统，可通过如下代码改写为路由级：
```
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```
好了，这一次就到这里吧，例子主要参考的[Express的中文文档](http://www.expressjs.com.cn/),下一次我会说一下我在开发中遇到的一些问题及解决方法。
