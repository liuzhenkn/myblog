---
title: 在阿里云部署node.js项目
date: 2016-03-19 00:00:00
tags:
- node.js
- 服务器
---

作为一个以前没有接触过后台开发的前端，我终于把上次提到的笔记本销售网站完成的差不多了，接下来面临的一个问题就是如何将我的web项目部署到服务器上。
在网上查了一些教程之后，我决定用阿里云的学生优惠的服务器，系统是centOS6.5，虽然以前用过Linux系统，对命令行操作有所了解，但是在下载很多软件的时候确实也有点头疼，所以我决定把部署过程记录下来。

<!-- more -->

### 配置服务器环境

首先我们拿到了服务器后我们登录阿里云去连接服务器，在这里我使用的是Xshell去登录服务器(当然你要先去阿里云控制台把云服务器启动)。
下载安装完Xshell后，打开新建会话，配置如下图：
![](/images/20160601/1.png)
接下来点到用户身份验证
![](/images/20160601/2.png)
登入成功后，就是熟悉的命令行操作了，我就不贴图了。
我们先将yum更新

```
yum -y update
```
然后，我们将使用最新源代码构建Node.js，要进行软件的安装，需要一组用来编译源代码的开发工具：
```
yum -y groupinstall "Development Tools"
```
#### 安装node.js

首先，先找一个安装位置，我安装在 /usr/src文件夹内
接下来从Node.js站点获取压缩档源代码，解压文件，并进入文件夹。
```
wget http://nodejs.org/dist/v0.10.18/node-v0.10.18.tar.gz
tar zxf node-v0.10.18.tar.gz
cd node-v0.10.18
```
然后执行配置脚本进行编译预处理
```
./configure
```
开始编译源代码
```
make
```
当编译完成后，我们需要使之在系统范围内可用, 编译后的二进制文件将被放置到系统路径，默认情况下，Node二进制文件应该放在/user/local/bin/node文件夹下:
```
make install
```
现在已经安装了Node.js，可以开始部署你的应用了，在部署前你需要先下载你所需要的模块，Express Mongoose等。
建立超级链接，否则sudo node时会报”command not found”(好吧其实我也不太懂这块是干嘛。)
```
sudo ln -s /usr/local/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/node /usr/lib/node
sudo ln -s /usr/local/bin/npm /usr/bin/npm
sudo ln -s /usr/local/bin/node-waf /usr/bin/node-waf
sudo ln -s /usr/local/bin/forever /usr/bin/forever
```
#### 安装mongodb

因为我的这个项目使用的是mongodb，所以要配置好mongodb。
我安装在/usr/local文件夹下，进入文件夹下载源码:
```
cd /usr/local
wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.4.9.tgz
```
解压安装包，重命名文件夹为mongodb

```
tar zxvf mongodb-linux-x86_64-2.4.9.tgz
mv mongodb-linux-x86_64-2.4.9 mongodb
```
在var文件夹里建立mongodb文件夹，并分别建立文件夹data用于存放数据，logs用于存放日志
```
mkdir /var/mongodb
mkdir /var/mongodb/data
mkdir /var/mongodb/logs
```
将mongodb启动命令追加到本文件中，让mongodb开机自启动：

```
/usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log -fork
```
看到这些则说明成功启动。
```
forked process: 18394
all output going to: /var/mongodb/logs/log.log
```
上传项目文件

我是用的是Xftp,下载完成后，启动并新建会话,配置如下:
![](/images/20160601/3.png)
登入成功即可传输文件。
![](/images/20160601/4.png)
### 启动项目

最后所有软件都配置好后，进入项目文件夹，启动项目，大功告成！

```
npm start
```
(数据库备份的问题我就不说啦，大家可以自行百度)
参考博客：[把Node.js项目部署到阿里云服务器](http://www.tuicool.com/articles/AfqyYze)
