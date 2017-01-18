---
title: FIS学习记录
tags:
- fis
- 前端工具
---

##### 什么是FIS？
FIS(Front-end Intergrated Solution)，前端集成解决方案。 通常，一套完整的前端技术解决方案包括四个方向：
1. **前端框架**：提供组件加载及管理框架支持，提供前端基础库及组件库。
2. **模板框架**：提供组件化开发模式支持；配合前端框架收集页面所需要的最小静态资源需求；留有充分的性能优化空间，性能优化对工程师透明。
3. **自动化工具**：提供基本优化能力；为前端框架、模板框架提供辅助支持。
4. **辅助开发工具**：提升工程师的开发体验，降低调试、部署成本。

如果你想了解更多可以看这篇文章[《什么是F.I.S》](https://github.com/fex-team/fis/wiki/%E4%BB%80%E4%B9%88%E6%98%AFF.I.S)。

<!-- more -->

##### 三条基本语句
FIS的基础使用并不难，也就是三条指令 fis install(下载需要的组件)、fis release(编译并发布到服务器)、fis server(内置服务器相关)。
使用 fis release --optimize 实现资源压缩，fis release --md5实现对静态资源添加md5戳，fis release --pack实现资源合并。如果想同时使用三种功能可以  fis release -omp。
资源合并需要在fis.config.js中进行打包规则的设定。
例如：
```bash
fis.config.set('pack', {
 'pkg/lib.js': [
    '/lib/mod.js',
    '/modules/underscore/**.js',
    '/modules/backbone/**.js',
    '/modules/jquery/**.js',
    '/modules/vendor/**.js',
    '/modules/common/**.js'
  ]
});
```
设置完pack后，FIS默认只会进行文件打包，不会对页面中的静态资源引用进行替换，我们可以引入fis-postpackager-simple进行资源引用替换。
```bash
fis.config.set('modules.postpackager','simple')
```
如果要同时使用
##### 三种语言能力
###### 资源定位
资源定位其实就是指开发路径和部署路径分离，你可以通过配置来决定产出后静态资源的路径。
![uri.png](/images/20170118/1.png)
##### 内容嵌入
内容嵌入可以为工程师提供诸如图片base64嵌入到css、js里，前端模板编译到js文件中，将js、css、html拆分成几个文件最后合并到一起的能力。有了这项能力，可以有效的减少http请求数，提升工程的可维护性。[(图片base64为什么能减少http请求？)](http://www.tuicool.com/articles/IbYJvin)
##### 依赖声明
我们可以通过在html、css、js文件中声明对其他资源的依赖，然后fis在编译的过程中会扫描这些声明，建立一张静态资源关系表，从而建立一张**map.json**文件，使用fis作为编译工具的项目，可以将这张表提交给后端或者前端框架去运行时根据组件使用情况来 **按需加载资源或者资源所在的包**，从而提升前端页面运行性能。
##### 配置api
虽然fis的基本功能就基本满足了大部分前端开发的要求，但是还是需要进行插件配置来满足不同项目的需求。在学习如何配置之前，要先理解一下单文件编译原理和打包原理。

![fis编译流程.png](/images/20170118/2.png)
从图中我们可以看出，在单文件编译过程中有7个可扩展的处理过程，打包过程中有4个可扩展的处理过程，我们就在这些地方进行配置。
###### 使用配置文件
在项目目录下新建一个 **fis-conf.js** 文件，我们可以对fis的编译系统做各种定制化配置。配置fis系统的接口是：
```bash
  fis.config.set('key',value);
  \\或者
  fis.config.merge({});
```
配置一共分为六类，项目配置、插件配置、插件运行配置、目录规范与域名配置、部署配置、打包配置。因为每项配置都有各种插件，所以用代码＋注释来总结。
###### 项目配置
```bash
//项目配置 配置项project
fis.config.merge({
	project：{
		charset : 'utf8',	//字符编码设置
		md5Length : 8,		//md5戳长度设置
		md5Connector : '.', //md5与文件的连接符设置
		include : 'src/**', //命中include的文件才会视为源码
        //排除命中文件，如果同时设置include则指排出命中include中的文件
		exclude : /^\/_build\//i,
		fileType:{
			text : 'tpl,js,css', //追加文本后缀列表
			image : 'swf,cur,ico'//追加图片类二进制文件后缀列表
		}
	}
})
//解释：设置项目源码监听时不监听的文件列表。
fis.config.set('project.watch.exclude', 'node_modules');
//设置项目源码监听的方式，true为轮询方式，false为用系统api检查
fis.config.set('project.watch.usePolling', true);
```
###### 插件配置
```bash
//插件配置 配置项modules
fis.config.merge({
	modules : {
		parser : { //配置编译器插件，可以根据 文件后缀 将某种语言编译成标准的js、css、html语言。
			less : ['less'],
			md : 'marked'
		},
		preprocessor : { //配置标准化预处理器插件，可以根据文件后缀对文件进行预处理。
			css : 'image-set'
		},
		postprocessor : {//在fis对静态资源进行语言能力扩展之后调用的插件配置，可以根据文件后缀对文件进行后处理。
			js : 'jswrapper'
		},
		lint : {//配置代码检查插件
			js : 'jshint' //js后缀文件会经过fis-lint-jshint插件的代码校验检查
		},
		test : {//配置自动测试插件
			js : 'phantomjs'
		},
		optimizer : {//配置文件优化插件
			js : 'uglify-js'
		},
		prepackager : 'xx',//打包预处理插件
		packager : 'packager',//打包插件
		spriter : 'spriter',//打包后处理csssprite插件
		postpackager : 'postpackager'//打包后处理插件
	}
})
```
###### 插件运行配置
```bash
//插件运行配置 配置项settings
fis.config.merge({
    settings : {
        optimizer : {
            //fis-optimizer-uglify-js插件的配置数据
            'uglify-js' : {
                output : {
                    max_line_len : 500
                }
            },
            //fis-optimizer-clean-css插件的配置数据
            'clean-css' : {
                keepBreaks : true
            }
        }
    }
});
```
还有个内置插件运行配置，其实就是对fis中内置的插件进行详细的配置。
###### 目录规范与域名配置
这部分我觉得是比较重要的，roadmap.path负责设置项目文件属性，与fis的三种语言能力都有关系，roadmap.ext指定后缀名与标准化语言的映射关系，roadmap.domain负责设置静态资源的域名前缀。
```bash
//目录规范与域名配置 配置项roadmap
fis.config.merge({
    roadmap : {
        path : [
            {
                //所有widget目录下的js文件
                reg : 'widget/**.js',
                //是模块化的js文件（标记为这种值的文件，会进行amd或者闭包包装）
                isMod : true,
                //默认依赖lib.js
                requires : [ 'lib.js' ],
                //向产出的map.json文件里附加一些信息
                extras : { say : '123' },
                //编译后产出到 /static/widget/xxx 目录下
                release : '/static$&'
            },
            {
                //所有的js文件
                reg : '**.js',
                //发布到/static/js/xxx目录下
                release : '/static/js$&'
            },
            {
                //所有的ico文件
                reg : '**.ico',
                //发布的时候即使加了--md5参数也不要生成带md5戳的文件
                useHash : false,
                //发布到/static/xxx目录下
                release : '/static$&'
            },
            {
                //所有image目录下的.png，.gif文件
                reg : /^\/images\/(.*\.(?:png|gif))/i,
                //访问这些图片的url是 '/m/xxxx?log_id=123'
                url : '/m/$1?log_id=123',
                //发布到/static/pic/xxx目录下
                release : '/static/pic/$1'
            },
            {
                //所有template目录下的.php文件
                reg : /^\/template\/(.*\.php)/i,
                //是类html文件，会进行html语言能力扩展
                isHtmlLike : true,
                //发布为gbk编码文件
                charset : 'gbk',
                //发布到/php/template/xxx目录下
                release : '/php/template/$1'
            },
            {
                //前面规则未匹配到的其他文件
                reg : /.*/,
                //编译的时候不要产出了
                release : false
            }
        ]，
        ext : {
            //less后缀的文件将输出为css后缀
            //并且在parser之后的其他处理流程中被当做css文件处理
            less : 'css',
            //coffee后缀的文件将输出为js文件
            //并且在parser之后的其他处理流程中被当做js文件处理
            coffee : 'js',
            //md后缀的文件将输出为html文件
            //并且在parser之后的其他处理流程中被当做html文件处理
            md : 'html'
        }，
        domain : {
            //widget目录下的所有css文件使用 http://css1.example.com 作为域名
            'widget/**.css' : 'http://css1.example.com',
            //所有的js文件使用 http://js1.example.com 或者  http://js2.example.com 作为域名
            '**.js' : ['http://js1.example.com', 'http://js2.example.com']，
            'image' : ['http://img1.example.com']//设置图片域名前缀
        }

    }
});
```
###### 部署配置
deploy设置项目的发布方式，可以发布到本地也可以发布到服务器。
```bash
//部署配置 配置项deploy
fis.config.merge({
    deploy : {
        //使用fis release --dest remote来使用这个配置
        remote : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://www.example.com/path/to/receiver.php',
            //从产出的结果的static目录下找文件
            from : '/static',
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to : '/home/fis/www/',
            //通配或正则过滤文件，表示只上传所有的js文件
            include : '**.js',
            //widget目录下的那些文件就不要发布了
            exclude : /\/widget\//i,
            //支持对文件进行字符串替换
            replace : {
                from : 'http://www.online.com',
                to : 'http://www.offline.com'
            }
        },
        //名字随便取的，没有特殊含义
        local : {
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to : '../output'
        },
        //也可以是一个数组
        remote2 : [
            {
                //将static目录上传到/home/fis/www/webroot下
                //上传文件路径为/home/fis/www/webroot/static/xxxx
                receiver : 'http://www.example.com/path/to/receiver.php',
                from : '/static',
                to : '/home/fis/www/webroot'
            },
            {
                //将template目录内的文件（不包括template一级）
                //上传到/home/fis/www/tpl下
                //上传文件路径为/home/fis/www/tpl/xxxx
                receiver : 'http://www.example.com/path/to/receiver.php',
                from : '/template',
                to : '/home/fis/www/tpl',
                subOnly : true
            }
        ]
    }
});
```
###### 打包配置
这个就比较熟悉了，在前面的资源合并中也有提到。
```bash
//打包配置
fis.config.merge({
    pack : {
        //打包所有的demo.js, script.js文件
        //将内容输出为static/pkg/aio.js文件
        'pkg/aio.js' : ['**/demo.js', /\/script\.js$/i],
        //打包所有的css文件
        //将内容输出为static/pkg/aio.css文件
        'pkg/aio.css' : '**.css'
    }
});
```

##### 总结
fis是一个前端工具框架，我们可以通过相应的配置来满足不同的项目需求，尤其是三种语言能力，为前端开发的我们解决了很多不必要的麻烦，除此之外，我觉得难点重点主要在对fis.config.js的配置上，所以要重点看配置api这一部分。
其实学习fis的时间不长，加起来应该不到三天，只在fis官方文档提供的fis-quickstart-demo中进行了练习，心得可能稍微有点浅，等以后实际应用了再来完善。
参考文档：
[《fis官方文档》](http://fex.baidu.com/fis-site/docs/beginning/getting-started.html)
[《fis运行原理》](https://github.com/fex-team/fis/wiki/%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86)
