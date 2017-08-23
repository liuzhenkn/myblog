---
title: 如何使用Hexo搭建博客
date: 2015-10-19 00:00:00
tags:
- blog
- hexo
---

## 前言
自从开始学习前端的技术已经两年了，使用过博客园也使用过LOFTER，但是自己一直没能坚持的更新下去。
现在我打算自己搭建一个博客，所以在教程和朋友的帮助下搭建了这个博客——**执凉’s blog**。

<!-- more-->
## 开发环境
**安装Node.js**

直接到官网下载安装即可 [Node.js](https://nodejs.org/en/)

**安装Git**

windows: 下载并安装Git
Linux (Ubuntu, Debian)：sudo apt-get install git-core
其余的一些版本在此就不一一列举。

**安装Hexo**

安装完node.js和git之后，即可以通过npm安装hexo了
打开git bash,键入以下命令

```
npm install -g hexo-cli
```
安装完成后可以通过 hexo -v查看hexo版本信息

## 初始化
安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件
```
hexo init <folder>
cd <folder>
npm install
```
初始化完成后，你会在该文件夹下得到如下的目录结构
```
.

├── _config.yml
├── package.json
├── scaffolds
├── scripts
├── source
|   ├── _drafts
|   └── _posts
└── themes
```
## 本地启动

执行命令

```
hexo server
```
成功启动则会看到反馈信息
[info] Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
此时端口4000被打开，打开浏览器，输入上面所示网址
出现了默认的主题界面，心情是不是有点激动~
![hexo init](/images/20151101/hexo-web.png)
到此为止hexo的初始化已经完成，接下来就是相关配置。

## 博客配置

博客的基本配置都在_config.yml文件中
打开该文件我们可以看到注释写的很详细了(英文不好的同学就自己想想办法吧~)，在其中我们可以对网站显示的相关个人信息进行修改以及主题的使用的等。
![\_config.yml](/images/20151101/config.png)

## 创建新文章

```
hexo new "我的第一篇博文"
```
系统会自动在_posts目录下生成文件 “我的第一篇博文.md”
之后用编辑器编辑md文件就好啦！（要用markdown语法编辑哦~）
markdown的语法可以参考 http://ibruce.info/2013/11/26/markdown/ 以及一些搜索到的教程。

## hexo指令

下面只写一些常用命令及部分简写
>hexo n == hexo new 新建文件
hexo g == hexo generate 生成静态文件
hexo s == hexo server 启动服务器
heox d == hexo deploy 部署网站
hexo list 列出网站资料

同时，hexo还支持复合命令，如 hexo d -g 意为 先静态化处理，再部署
详细指令说明可参阅 https://hexo.io/zh-cn/docs/commands.html

## 发布到github

**静态化处理**

执行命令
```
hexo generate
```
在此说明一下静态化处理的目的，由于我们用hexo所搭建的这个博客，是静态网站，即只有html,css和javascript，无法动态更新。静态化处理即生成只有html、css和javascript的网站。

**部署到github**

注册github帐号
建立一个仓库，名为[your_user_name.github.io]
添加SSH公钥到[Account settings -> SSH Keys -> Add SSH Key]
有了github帐号之后
编辑配置文件_config.yml，在deploy部分，设置github的项目地址
```
deploy:
	type: git
	repository: git@github.com:example/example.github.io.git
```
添加SSH
首先设置用户名和密码:
```
git config --global user.email "example@163.com"
git config --global user.name "example"
```
然后生成密钥:
```
ssh-keygen -t rsa -C "example@163.com"
```
上述命令如果成功，会在根目录下的.ssh文件夹内生成id_rsa 和 id_rsa.pub两个文件
打开id_rsa.pub文件，复制里面的内容添加到 Add SSH Key
![SSH Key](/images/20151101/addSSH.jpg)
然后执行命令

```
hexo deploy
```
若没问题的话会提示你输入帐号密码，之后就部署成功了，可以在github查看，
点击右侧的setting
![setting](/images/20151101/github-setting.jpg)
在此页面中你会看到
![publish](/images/20151101/github-publish.jpg)
这就是你网站部署的地址了，打开此网址，即可看到你发布的网站

>在执行hexo deploy命令时，可能会提示找不到git
解决方法：
在Hexo 3.0版本后deploy git 被分开的，所以需要安装，安装命令如下:
npm install hexo-deployer-git --save ,安装好后再尝试一下就ok

## 绑定域名

如果对于github默认分配的二级域名example.github.io满意的话，就用这个也是可以的。
如果不太满意，可以购买一个域名，博主是从阿里云购买的.com
域名。从网上大家的评论来看.com和.me的域名评价比较高，而且.com是国际域名,
比.cn的总归要方便一些（你懂的~）
购买域名都是按年付费的,.com和.me的一年50-60人民币，一般第一年都有优惠。

设置域名有两种方式

- 主域名绑定: 如example.com
- 子域名绑定：如blog.example.com
- 主域名绑定

在source根目录下新建文件 CNAME，无后缀，纯文本文件，内容为要绑定的域名
example.com,如果要使用www.example.com的形式，文件内容改为www.example.com

DNS设置
主机记录@，类型A，记录值192.30.252.153
主机记录www，类型A，记录值192.30.252.153
参考https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider

子域名绑定

比如使用域名example.com的子域名blog.example.com
CNAME文件内容为blog.example.com

DNS设置
主机记录blog，类型CNAME，记录值example.github.io
参考https://help.github.com/articles/tips-for-configuring-a-cname-record-with-your-dns-provider

## 更换主题

https://github.com/hexojs/hexo/wiki/Themes
可以从这上面挑选一个自己喜欢的主题
比如我觉得next还不错，
进入github的项目地址后

复制项目地址
在themes目录下，执行命令

```
git clone https://github.com/iissnan/hexo-theme-next.git
```
完成后会在theme目录下生成hexo-theme-next主题文件夹
打开_config.yml配置文件，找到theme选项
将默认的theme: landscape更换为
theme: hexo-theme-next
此时，启动服务器hexo server可查看效果，之后便可静态化然后部署到github上即可。

http://theme-next.iissnan.com/这是next主题的说明，可参照此修改默认配置。
其他主题也可借鉴说明

## 修改主题样式

刚刚换上主题，作为一名当过一段时间美工的前端，总觉得好难看，哈哈哈，所以果断去改css样式。
以Next主题为例，样式表在themes/hexo-theme-next/source/css，改起来有点累，大家加油。

## 配置插件

至于插件有很多，可以按照自己的喜好配置插件，下面只给出几个教程的连接，需要的同学自行配置就好。
http://www.tuicool.com/articles/AfQnQjy
http://segmentfault.com/a/1190000002538363
还有一些插件是主题自带的，注意就好。

## 后记

虽然搭建博客的过程中遇到很多问题，但是博客成功搭建之后，心里真是觉得很满足。
希望想搭建博客的同学能在这篇文章中得到帮助。
也希望我的博客能给大家带来有用的知识。
