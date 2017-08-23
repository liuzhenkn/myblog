---
title: 使用Express与MongoDB建立一个网站后台（2）
date: 2016-04-20 00:00:00
tags:
- 后端
- Node.js
- Express
---

历经两个月的时间，我总算是把这个网站全部搞好了，虽然从每一个部分来看做的都很差，都大有改进之处，但是这一套网站从前端到后台再到服务器，都是由我自己搞定的，可以说是小小的体验了一次全栈开发吧，233。
由于是买的阿里云的学生服务器，所以就买了一个月，已经到期了所以就不展示了。

下面我就说一下我在这次开发中学到的知识以及遇到的问题及其解决办法。

<!-- more -->

### GET POST

首先就是从 GET或POST 的数据中获取想要得到的数据以及返回数据
对于get 获取数据是 req.params,对于post 获取数据是 req.body。
返回数据使用的是 res.send()。

### 模板引擎

模板引擎的使用是我的另一个收获吧，其实一开始我是拒绝使用的，但是我又发现它对于我这种没做过后台开发的人来说又十分好用，因为模板引擎把前后端的技术揉杂在一起，可以很简单的就处理了从后台传过来的数据。
在使用前首先你要调用一个模块，来告诉服务器你使用的是什么模板引擎:
```
app.set('view engine', 'jade');
```
### Session

会话(session),以前在自学JSP的时候接触过session，但是没有真正用过，但是在写这个网站的用户登录的时候就用到了，为了让用户登录了之后一直保持登录状态，我将登录后的username保存在session中:
```
router.post('/login', function(req, res) {
    var query_doc = {username: req.body.username, password: req.body.password};
    user.find({username:query_doc.username},function(err,docs){
    	if(docs == ""){
            console.log("login failed in " + new Date());
            res.render('warning', { title: '用户名不存在，请重新登录' });   	
    	}else{
	    	var text = eval('('+ docs +')');
	    	if(text.password == query_doc.password){
	            console.log(query_doc.username + ": login success in " + new Date());
	            computer.findShow(function(err,computers){
	            	req.session.username = query_doc.username;//保存在session中
	            	console.log(req.session.username);
	            	res.render('index', {
	            		title: '首页',
	            		username: req.session.username,
	            		computers: computers
	            	});  	            	
	            })
	    	}else{
	            console.log("login failed in " + new Date());
	            res.render('warning', { title: '密码错误' });    		
	    	}	    		
    	}
    });
});
```
在使用session前也需要调用相应的模块，并做出一些设置:
```
var session = require('express-session');
app.use(session({
    secret: '12345',
    name: 'connect.sid',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 480000 },  //设置maxAge是480000ms，即480s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
```
### Ajax模拟get post方法
Ajax确实不陌生了，但是在我做的项目中我确实没怎么使用过，但是这次为了给a标签添加get post方法，我便使用了Ajax,因为已经引入过Jquery了，所以我就直接使用了Jquery Ajax:
```
$("#sum").click(function(){
    var money = $(".sum").text();
    var flag = window.confirm("总价是："+money+"是否结算？");
    if(flag){
        console.log(flag);
        $.ajax({
            type: "POST",
            url: "/account",
            dataType: "json",
            success: function(msg){
                alert(msg.success);
                window.location.reload();
            }
        });
    }
})
```
### 非关系型数据库Mongodb

非关系型数据库确实方便，没有关系型数据库的主键外键之类的限制，不过缺点的话，我觉得没有了限制可能导致添加进不符合要求的数据。
Mongodb的查询语句也和Javascript的语法相近，我用起来也比较顺手。
在使用前要请求mongoose模块，并建立相应的模型，也可以定义静态方法。
```
var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var shopScheMa = new Schema({
    username: String,
    name: String,
    type: String,
    infor: String,
    cost: Number
});
//定义静态方法
shopScheMa.statics = {
	findName: function(username,cb){
		return this
		.find({username: username})
		.exec(cb);
	},
	removeOne: function(username,name,cb){
		return this
		.remove({username: username,name: name})
		.exec(cb);
	},
	removeAll: function(username,cb){
		return this
		.remove({username: username})
		.exec(cb);
	}
}

exports.shoplist = mongoose.model('shoplists', shopScheMa);

```
### 总结

总的来说是一次比较成功的体验吧，学到了很多知识，不过还有很多地方有待改进，在接下来的时间里我会慢慢的改得，谢谢。
