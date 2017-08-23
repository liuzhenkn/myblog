---
title: Backbone.js入门整理
date: 2017-01-24 00:00:00
tags:
- Backbone.js
- 总结
---

### Backbone有什么优缺点？  
优点  
1、轻量、入门上手简单。  
2、MVC架构清晰，很容易就能把各层分离出来。   
不足   
1、View层实现的比较简单，没有操作DOM的方法，如果要做复杂操作需要依赖其他库。  
2、感觉资料比较少、优秀的文章少。  
(个人通过学习的感觉)  
<!-- more -->
### 基础  
#### Model、Collection、View、Router。  
Model是数据模型，里面存在基础数据以及围绕着数据的转换、验证、计算以及请求等逻辑。  

![model.png](/images/20170118/7.png)

Collection是Model对象的有序集合。其中就有增删、获取长度、排序、比较等工具方法。  

![collection.png](/images/20170118/8.png)

View中把Model中的数据展现出来，同时监听Model中的数据变化以及绑定DOM事件。  

![view.png](/images/20170118/9.png)

Router是路由的意思，可以通过不同的url来建立不同的视图等。(理解的比较少)  
(在网上找到的图感觉记录的比较全面，里面也有很多自己没使用过的东西，自己也没有整理过每个部分的api等，就不自己画了。)  
#### 各模块间的关系

![关系.png](/images/20170118/10.png)
Model中保存着数据，Collection是同一个Model的集合，View可以监听Model中的数据变化，也可以监听Collection中Model的变化，在View层中绑定事件，事件可能会触发Model或Collection的变化，触发监听的回调事件。如果发生URL变化Router就会根据URL判断View的建立和销毁问题这样就可以在一个页面中通过View的建立销毁实现单页面应用(Router没自己用过，暂时这么理解)。  
### TODOList  

![todolist.png](/images/20170118/11.png)

#### 功能分析  
TODOList是记录任务的一个功能。  
1、添加任务  
2、完成任务  
3、删除任务  
4、全部完成  
#### 实现  
样式直接使用官网提供Demo的默认样式，只是重写了JS部分。  
Model:  
一条Task就应该是一个Model，记录当前任务的内容以及完成状态，defaluts是给新建的对象的默认值，另外需要修改状态的方法，因为是修改数据的方法，所以写在Model中，如果需要修改内容，直接在Model中定义相应方法即可。代码如下：

![modelCode.png](/images/20170118/12.png)
Collection:  
TasksCollection就是每一个Task的集合，首先指定是哪个Model的集合，接下来获取localStroage中的数据或者新建一个，然后提供两个方法来把集合中的Task分为已完成和未完成的。

![collectionCode.png](/images/20170118/13.png)
View:  
写的时候就在想，为什么把View分为两个，如果写成一个会有问题吗？  
自己的理解就是一个Task是一个Model对应一个View，而总体的Collection也需要一个View去监听变化，好像也没办法写在一起，会导致逻辑混乱，可见如何划分View也是应该好好去思考的。  
TaskView是每个任务的视图，首先设定一个标签li指定为根元素，即产生的DOM元素的根元素就是li，template使用的是underscore.js中自带的方法，自己没看使用方法，但确实是用起来比artTemplate麻烦多了，然后进行事件绑定，我们需要的只有两种，一种是点击checkbox切换任务状态，另一种是删除当前的任务。  
initalize是初始化时自动调用的，在初始化时绑定监听，监听当前View对应的Model的变化——状态变化、删除。  
render是渲染该条数据到页面中。其他两个方法都是调用Model中的方法。

![taskView.png](/images/20170118/14.png)
AppView监听的是Collection的变化，首先指定el，指定视图DOM元素，然后指定模版，绑定事件与相应方法，具体就不写了，和TaskView的形式类似。最后需要创建AppView实例。

![appView1.png](/images/20170118/15.png)

![appview2.png](/images/20170118/16.png)
### 总结  
自己也只是进行了快速的浏览和简单的做了一个简单的DEMO，算是一个快速的上手，以前没有使用过MVC框架，通过学习其实也对MVC的思想有了一定的理解（Controller的概念还是有点模糊），另外api的使用不太熟悉，还是需要上网查，自己对View的划分也没有实际做过，做的这个TODOList是一种多Model多View的形式，上次鸣旭的CodeReview是一种单Model多View的形式(用不到Collection)，本次学习只是一个快速上手，自己还是需要以后继续学习，一方面自己文档熟悉api(自己业余时间学习)，另一方面先通过view其他同学的代码来思考别人的做法等。
