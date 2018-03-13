---
title: Vue学习记录整理
date: 2017-04-19 00:00:00
tags:
- 总结
---

#### 前言
![logo.png](/images/20170327/logo.png)
自己学习Vue也是有一段时间了，但是一直没有总结也没什么实战经验，所以忍痛破费跟着学习了一波仿饿了么app，因为这个教程当时是用Vue1.0开发的，所以我顺道把2.0的教程撸了一遍，照着学的时候顺便使用2.0来做，接下来就主要总结一下我关注的点吧。

<!-- more -->
#### 总述
以前学习的都是按文档，外部引入js文件来使用vue,模仿开发的时候使用vue-cli来初始化vue项目，学习的时候也顺便简单的学习了下webpack(以前使用过fis，在简单的配置上感觉类似，但是原理应该大有不同吧，没研究过那么深)。因为自己要做毕业设计，决定使用vue+elementUI+express+mongoDB来完成整站开发，自己也捣鼓了一下如果进行前后端目录的安放。

#### 关注点
基础的我就不说了，大家可以自己去官方文档中查看,我只目前关注的点。

##### 计算属性
开始时分不清computed与methods的区别，不知道何时用哪个。但是既然设计了计算属性，那必然就有他的道理。
困惑例如:
```
<div id="test">
  {{message.split('').reverse().join('')}}//我们可以这样写，但是会使模版难以维护(很乱)
</div>
```
所以我们使用计算属性:
```
<div id="test">
  {{reverseMessage}}
</div>

var vm = new Vue({
  el: '#test',
  data: {
    message: 'Hello'
  },
  computed: {
    reverseMessage: function(){
      return this.message.split('').reverse().join('');
    }
  }
})
```
然而我们发现用method也可以达到相同的效果:
```
<div id="test">
  {{reverseMessage()}}
</div>

var vm = new Vue({
  el: '#test',
  data: {
    message: 'Hello'
  },
  methods : {
    reverseMessage: function(){
      return this.message.split('').reverse().join('');
    }
  }
})
```
但是区别是，每当重新渲染时，method总会调用执行函数，但是计算属性是基于依赖缓存的，只要message没立刻返回上次的执行结果。
其实还有watch可以达到相应的效果，但是watch是你要指定监听的数据，然后执行回调函数，写起来比较麻烦且重复(官网这么说的啊)。

##### 生命周期
生命周期指的是一个vue实例的生命周期，对应相应的钩子函数。(图好长可以保存下来放大看)
![lifecycle.png](/images/20170327/lifecycle.png)
每个钩子函数指进行到这里时执行钩子函数。说到这我还有个bug没解决，我从父组件传向子组件的数据，在mounted的时候竟然还没到，所以我用watch监听了数据，发生变化再执行一次，但是还是不好用。。。待再解决。

##### 组件
组件要注意的是，首先我需要引入组件文件，然后声明组件。例如：
```
import goods from '../good/goods.vue';

export defalut({
    ...
    components: {
      goods : goods
    }
})
```
另外组件中的data必须是函数。 这是为什么呢？ 因为我们都知道基本类型和引用类型，如果我们的data不是函数返回一个新对象，那么所有组件的实现都会共用一个data对象。

##### 组件通信
父组件通过props来给子组件传数据，而子组件通过events给父组件发送消息。(因为我还没学vuex)
我们只需要在子组件的实现上添加一个属性，然后在自组件中定义props接收即可:
```
//父组件中
<child :message="parentMsg"></child>

//子组件中
export defalut({
    props: ['message'],
    template: '<span>{{message}}</span>'
})
```
要注意的是prop是单向绑定的，父组件中属性变化会传给子组件，但是反过来不行，子组件改变prop会发出警告。

父组件监听子组件触发的事件是通过$on和$emit,子组件$emit一个事件，父组件$on这个事件，如果触发则执行对应函数。
```
<div id="test">
  <p>{{total}}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>

Vue.component('button-counter',{
    template: '<button v-on:click="increment">{{counter}}</button>',
    data: function(){
      return {
        counter: 0
      };
    },
    methods: {
      increment: function() {
        this.counter++;
        this.$emit('increment');
      }
    }
})

new Vue({
    el: '#test',
    data: {
      total: 0
    },
    methods: {
      incrementTotal: function() {
        this.total++;
      }
    }
})
```
点击按钮时，子组件抛出事件increment,父组件监听到这个事件后执行incrementTotal。
兄弟组件的通信我自己没实践过，使用一个空的Vue实例作为中央事件总线。

##### vue-router
先放着，等我再看看再回来总结。
