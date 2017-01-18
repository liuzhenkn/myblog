---
title: 前端开发者都应知道的15个jQuery小技巧
tags:
- Jquery
---

一些简单的技巧集合，帮助我们提升Jquery技能。
这是Matt Smith 发起的一个小项目，目前有15个小技巧。

<!-- more -->

- 回到顶部按钮
- 预加载图片
- 检查图片是否加载完毕
- 自动修复损坏图片
- Hover上的Class开关
- 禁用input字段
- 停止链接加载
- 淡入淡出/滑动开关
- 简单的折叠效果
- 将两个Div设置相同高度
- 在新窗口打开外部链接
- 找到文本元素
- 切换可视与隐藏的触发器
- Ajax 调用的错误处理
- 链式操作

### 回到顶部按钮

通过使用Jquery中的animate和scrollTop方法，便可以无需使用插件创建一个简单的回到顶部动画:

```
//back to top
$('a.top').click(function(e){
	e.preventDefault();
	$(document.body).animate({scrollTop:0},800);
});

<a class="top" href="#">Back to top</a>
```
是不是很简单？

### 预加载图片

如果你的页面使用了大量不能初始可见的图片（例如绑定在 hover 上），预加载它们是十分有用的：

```
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```
### 检查图片是否加载完成

有时你或许要检查图片是否完全加载完毕，才能在脚本中进行后续操作：

```
$('img').load(function () {
  console.log('image load successful');
});
```
也可以把img换成id或class，来检查特定图片。

### 自动修复已损坏图片

如果你发现自己网站的图片链接挂了，一个一个替换很麻烦。这段简单的代码可以帮上大忙：

```
$('img').on('error', function () {
  $(this).prop('src', 'img/broken.png');
});
```
如果图片没有问题，这段代码不会有丝毫影响。

### Hover上的Class切换

如果用户的鼠标悬停在页面上某个可点击元素时，你想要改变这个元素的视觉表现。可以使用下面这段代码，当用户悬停时，为该元素增加一个 class；当用户鼠标离开后移除这个 class：

```
$('.btn').hover(function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```
你仅需增加必须的 CSS。如果需要更简单的方式，还可以使用 toggleClass 方法：

```
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```
注意：CSS 或许是这个例子更快速的解决方式，但大家仍然值得知道这一点。

### 禁用input字段

有时你也许想让表单的提交按钮或其文本输入框变得不可用，直到用户执行了一个特定行为（例如确认 “我已经阅读该条款” 的复选框）。增加 disabled attribute 到你的 input，就可以实现自己想要的效果：

```
$('input[type="submit"]').prop('disabled', true);
```
当你想把 disabled 的值改为 false 时，仅需在该 input 上再运行一次 prop 方法。

```
$('input[type="submit"]').prop('disabled', false);
```
### 停止链接加载
有时你不想链接跳转到某个页面或重加载该页面，而希望可以做一些其他事情，比如触发其他脚本。下面的代码是禁止默认行为的一个小诀窍：

```
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```
### 淡入淡出/滑动开关

淡入淡出与滑动是我们经常使用 jQuery 做成的动画效果。或许你只是想在用户点击某物时展现一个元素，使用 fadeIn 和 slideDown 都很棒。但如果想让该元素在第一次点击时显现，第二次点击时消失，下面的代码可以很好地完成这个工作：

```
// Fade
$('.btn').click(function () {
  $('.element').fadeToggle('slow');
});

// Toggle
$('.btn').click(function () {
  $('.element').slideToggle('slow');
});
```
### 简单的手风琴效果

这是一个快速实现手风琴效果的简单方法：

```
// Close all panels
$('#accordion').find('.content').hide();

// Accordion
$('#accordion').find('.accordion-header').click(function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```
增加这段脚本后，你所需做的所有事就是，查看脚本是否在必须的 HTML 中正常工作。

### 使两个Div高度一致

```
$('.div').css('min-height', $('.main-div').height());
```
该例设置了 min-height，意味着它可以比主要 div 更大，但永远不能更小。但有一个更加灵活的方法是遍历一组元素的设置，然后将高度设为元素中的最高值：

```
var $columns = $('.column');
var height = 0;
$columns.each(function () {
  if ($(this).height() &gt; height) {
    height = $(this).height();
  }
});
$columns.height(height);
```
如果你想让所有列都有相同高度：

```
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```
### 在新标签/窗口打开站外链接

在一个新标签或者新窗口中打开外置链接，并确保站内链接会在相同的标签或窗口中打开：

```
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```
### 找到文本元素

通过使用 jQuery 中的 contains() 选择器，你可以找到某个元素中的文本。如果文本不存在，该元素将会隐藏：

```
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```
### 切换可视与隐藏的触发器

当用户焦点在另外一个标签上，或重新回到标签时，触发 JavaScript：

```
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === "visible") {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === "hidden") {
    console.log('Tab is now hidden!');
  }
});
```
### Ajax 调用的错误处理

当某次 Ajax 调用返回 404 或 500 错误，就会执行错误处理。但如果没有定义该处理，其他 jQuery 代码或许会停止工作。可以通过下面这段代码定义一个全局 Ajax 错误处理：

```
$(document).ajaxError(function (e, xhr, settings, error) {
  console.log(error);
});
```
### 链式调用

Jquery支持链式调用插件，以减缓反复查询DOM，并创建多个Jquery对象。

```
$('#elem').show();
$('#elem').html('bbb')
$('#elem').otherStuff();
```
上面的代码可以通过链式操作大大改进:

```
$('#elem').show().html('bbb').otherStuff();
```
还有一种办法就是把元素还存在变量中:

```
var $elem = $('#elem');
$elem.hide();
$elem.html('bbb');
$elem.otherStuff();
```
Jquery中的链式操作和缓存方法，都大大精简和提速了代码。
