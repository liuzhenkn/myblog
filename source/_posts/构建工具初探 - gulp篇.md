---
title: 构建工具初探 - gulp篇
date: 2018-02-01 11:00:00
tags:
- 构建工具
- gulp
---

#### 前言

好久没有更新博客了嗯（好慌，最近业务上不是很忙了所以抽空学习了一些自己一直比较感兴趣的东西 - 前端构建工具。

<!-- more -->
#### 构建工具

记得在大学社团里写静态页面，我们只使用简单的 html css js 来完成开发，页面也并不是很多，所以我们把所有页面放在一起用哪个就打开哪个，修改后 f5 查看效果。当时觉得好像也没什么，但是随着自己学习的深入以及项目的复杂、传统的开发方式已经不能满足基本的需求了，所以需要一些东西来辅助我们开发。

回想一下构建一个项目我们可能都需要什么：

1、可能需要引入一些库 jQuery UI库等，框架及其附属 Vue Angular 等。
2、本地开发环境以及项目部署。
3、编码时的 hot load 等。
...(想)

如果这些事都我们手动每次都搞会很麻烦，降低开发效率，所以很多构建工具就出现了，比如 grunt gulp webpack 等，本次就是我自己简单实践 gulp 的小总结。


#### gulp

gulp是基于Nodejs的自动任务运行器，它能自动化地完成javascript/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。(我主要也是简单实现了这一些东西)

1、首先我们需要全局安装 gulp 以及 作为项目的 devDependencies 安装

``` javascript
npm i -g gulp
npm i --save-dev gulp
```
2、项目目录下创建 gulpfile.js

``` javascript
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

3、开始写我们的任务

``` javascript
// gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
// gulp.dest(path[, options]) 处理完后文件生成路径
// 举个例子

var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

gulp.task('less', function () {
   gulp.src('src/style/*.less')
       .pipe(less())
       .pipe(gulp.dest('dist/style'));
});

gulp.task('jsUglify', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['less', 'jsUglify']);
```

上面我们开了一个叫 less 的 task，其处理 src/style 文件夹下的所有 less
文件，处理完后放到 dist/style 目录下(pipe 是管道的意思，可以理解为执行完后执行下一个)。最后我们定一个 default task，我们只需要在命令行执行 gulp default(可以省略)，就会执行后面的两个任务 less jsUglify，当然可以只执行 gulp less 来处理 less 文件。然后我们就会在项目目录下发现 dist 文件夹以及我们构建的文件了。(想做什么就去下相应的 gulp 插件，写 task 即可)
4、想 hot load
需要 gulp-connect 插件，配合 gulp.watch 监听文件变化，然后执行相应的 task，当然你需要在每个 task 的最后执行 connect.reload 来刷新页面。

哈哈哈，反正就写了个简单 demo ,有兴趣可以参考。
!(gulp-demo)[https://github.com/liuzhenkn/IT-FE-build]


#### 想法

其实一直也在看 webpack ，好吧但是感觉自己在玩蛇没搞明白。
