---
title: fisp项目练习
tags:
- fis、fisp
- 总结
---

(这个自动保存。。竟然只是临时保存！😢)
##### 简述
fisp基本用法和Smarty的基础语法就不赘述了，可以看[fisp官方文档](http://fex-team.github.io/fis-plus/)和[慕课网上的教程](http://www.imooc.com/learn/69)，这里主要讲我自己学习构建的项目。
开始时是想学前辈构建一个google主页，但是我又想尝试一下对php传输到模版到数据进行处理，所以就选了**github的profile**页面。

<!-- more -->

![showProgram.png](/images/20170118/3.png)

(哈哈哈虽然除了中间那部分基本都是图片，但是主要还是体验。)

##### 项目构建
fisp项目通常分为common和其他模块，common模块中通常存放可复用的文件/组件，fisp的其他模块也有着严格的目录规范，通常如下：

![moduleList.png](/images/20170118/4.png)
- **page**中放页面模版
- **static**中存放不需要组件化的公共库
- **test**中存放数据与page中的模版相对应
- **widget** 中存放模板组件，JS组件，CSS组件等。
- **server.conf** 这是一个很有用的文件，它里面可以配置url转发，可以方便在本地模拟ajax请求等。（这个我暂时不太懂怎么做）
另外fis-config.js文件在每个模块中都有，需要注意的是需要在fis-config.js中设置namespace用来区分是哪个模块。
```bash
fis.config.set('namespace','name');
```
接下来就是我的项目构建，我构建了两个模块common和home， 将fis-config配置好后，将所需的静态文件建立好放到相应的目录。（我觉得这是一个很重要的过程，你要想好你这个页面要分成多少个部分？构建多少个组件？哪些可以复用放到common中？这都是要提前想好的。）
最后构建好是这样的：

![treeList.png](/images/20170118/5.png)


##### 细节展示
建立整个项目都有用到的模版layout.tpl，放在common—>page中，｛%block name=“static_source”%}用于加载页面中需要的静态文件，｛％block name=“content”％｝用于加载页面的主体内容。
```bash
<!doctype html>
{%html framework="common:static/mod.js" class="expanded"%}
	{%head%}
		<meta charset="utf-8"/>
		<title>{%$title%}</title>
		{%block name="static_source"%}{%/block%}
	{%/head%}
	{%body%}
		{%block name="content"%}{%/block%}
	{%/body%}
{%/html%}
```
然后在index.tpl中引用。
```bash
{%extends file="common/page/layout.tpl"%}
{%block name="static_source"%}
	{%require name="home:static/main/main.css"%}
{%/block%}
{%block name="content"%}
	<div id="header">
		{%widget name="common:widget/header/header.tpl"%}
	</div>
	<div id="container">
		<div class="left_profile">
			{%widget name="home:widget/photo/photo.tpl" data=$name%}
			{%widget name="home:widget/left_foot/left_foot.tpl"%}
		</div>
		<div class="right_profile">
			{%widget name="home:widget/right_header/header.tpl"%}
			{%widget name="home:widget/right_program/program.tpl" data=$docs%}
			{%widget name="home:widget/right_footer/footer.tpl"%}
		</div>
		<div class="clear"></div>
	</div>
	<footer>
		{%widget name="common:widget/footer/footer.tpl"%}
	</footer>
{%/block%}
```
可以看到我们用require请求静态文件，用widget调用组件。
(我为了多练习一下将页面分成了好几个组件，有点啰嗦，所以组件是如何实现的就不展示了。)
别忘了php中的模拟数据，因为我没学过php，所以就模仿了pc-demo。
```bash
<?php
	$github = 'https://github.com/';
	$fis_data = array(
		'title' => 'Smarty练习',
		'name' => 'zhiliang',
		'docs' => array(
			array(
				'project' => 'ife',
				'detail' => 'Baidu Institute of Fornt - End Technology'
			),
			array(
				'project' => 'Lenovo-sale',
				'detail' => 'Lenovo sale for the course of software engineering'
			),
			array(
				'project' => 'liuzhenkun.github.io',
				'detail' => ''
			),
			array(
				'project' => 'lshPrograms',
				'detail' => ''
			)
		)
	);
```
这里有个问题，为什么我在模版中只能获取到fis-data中的数据呢？这个问题我也查了好久没能找到个明确的说法。
最后，把所有部分都完成，启动项目。
```bash
//如果没初始化别忘了 fisp init
fisp release -r home
fisp release -r common
fisp server start
```
#####总结
自己构建这样一个项目，我感觉主要就是了解基本应用，另外对组件化的概念有了一定对认识，另外学会对于后台传过来的数据进行调用处理（以前用Jade也了解），其实在晚上海鹏codeview的时候看实际代码还是有点晕的，离实际开发还是有点远，期待以后参与实际开发。
