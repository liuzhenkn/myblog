---
title: 再读《JavaScript高级程序设计》(3)
date: 2017-02-22 00:00:00
tags:
- JavaScript
- 读书笔记
---

### 前言
本次的篇幅长一些，因为这两章将第六涉及到初学时比较难懂的一些概念 ———— 原型、继承等，开始时确实不太能理解，但是随着看过的相关文章的增多，再次回头看书的时候终于发现了新的天地、有了自己的理解，这次的笔记就结合书上的内容讲自己的理解。

<!-- more -->

### 第六章 面向对象的程序设计

#### 创建对象
我们都知道可以使用Object构造函数和对象字面量方法来创建一个对象，但是如果我们想创建大量类似的对象该怎么办呢？

##### 工厂模式
这种模式抽象了创建具体对象的过程，因为在ECMAScript中是没有类的概念的(ES6有了我记得，没使用过)，所以我们就发明了一种函数，在函数中来设置创建特定对象的细节(就像一个工厂一样，生产对象)。
```
function createPerson(name,age){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function(){
    console.log(this.name);
  };
  return o;
}
var person1 = createPerson("Gray",30);
var person2 = createPerson("HaHa",29);
```
工厂模式接收相应参数返回包涵相应信息的对象，解决了创建大量类似对象的问题，但是我们无法知道这个对象的类型(对象识别问题，我理解为实际所有工厂生产的对象都是new Object，无法区分)，那又该怎么解决呢？

##### 构造函数模式
通过创建自定义的构造函数，定义自定义对象的属性和方法。
```
function Person(name,age){
  this.name = name;
  this.age = age;
  this.sayName = function(){
    console.log(this.name);
  };
}
var person1 = new Person("Gray",30);
var person2 = new Person("HaHa",29);
```
可以看到和工厂模式相比：
- 没有显式的创建对象
- 直接将属性和方法给this对象
- 没有return语句
创建一个新的Person实例就会经历以下步骤：
- 创建一个新对象
- 将构造函数的作用域赋给新对象，即this指向新对象
- 执行构造函数中的代码
- 返回新对象
为什么说解决了对象识别问题？因为我们可以通过instanceof操作符来进行验证对象来源：
```
person1 instanceof Object // true
person1 instanceof Person // true 工厂模式做不到
```
构造函数模式的问题：每个方法都要在每个实例上重新创建一遍，例如person1 和 person2 中的 sayName方法实际上都重新创建了一遍。
```
 person1.sayName == person2.sayName // false
```
```
 //我们可以这样解决
 function Person(name,age){
   this.name = name;
   this.age = age;
   this.sayName = sayName;
 }
 function sayName(){
   console.log(this.name);
 }
 var person1 = new Person("Gray",30);
 var person2 = new Person("HaHa",29);
 person1.sayName == person2.sayName // true
```
但是让sayName函数作为一个全局函数实在是不妥，所以我们通过原型模式来解决。

##### 原型模式
我们知道创建的每一个函数都有一个prototype属性，这个属性是一个指针指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。这样我们就可以解决上面的问题。
```
function Person(){};
Person.prototype.name = "Gray"
Person.prototype.sayName = function(){
  console.log(this.name);
};
var person1 = new Person();
var person2 = new Person();

person1.sayName == person2.sayName // true
```
只要创建一个新函数就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象，在默认情况下所有原型对象都会自动获得一个constructor属性，这个属性包含一个指向prototype属性所在函数的指针。
![](/images/20170213/1.jpg)
这样之间就可以互相访问了。
##### 组合使用构造函数模式和原型模式
```
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype = {
  sayName: function(){
    console.log(this.name);
  }
}
var person1 = new Person("Gray",30);
var person2 = new Person("HaHa",29);

person1.sayName == person2.sayName // true
```
就不多赘述了，这样我们就可以自定义也可以保证共用方法。

##### 其他模式
动态原型模式、寄生构造函数模式、稳妥构造函数模式，我没使用过，理解也仅限于书上的就不说了。

#### 继承
说到面向对象编程，那么肯定离不开继承这个重要的概念，许多OO语言都支持两种集成方式：接口继承和实现继承，由于ECMAScript中函数没有签名(不懂签名是什么)，所以只支持实现继承，而在继承的主要依靠就是 **原型链**。

##### 原型链继承
基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。前面我们也讲过了原型、函数、实例之间的关系：每个构造函数都有一个原型对象，原型对象含有一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针，这样我们让一个构造函数的原型对象等于另一个类型的实例，这样一环一环形成一条链，即原型链。
```
function SuperType(){
  this.property = true;
}

SuperType.prototype.getSuperValue = function(){
  return this.property;
};

function SubType(){
  this.subProperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubType = function(){
  return this.property;
};

var instance = new SubType();
instance.getSuperValue(); // true
```
在上述例子中 SUbType的prototype指向了一个SuperType的实例，从而能够访问其实例中的属性和方法，继承了SuperType。
我们没有使用SUbType默认提供的原型(Object)，而是换成SuperType的实例，新原型不仅具有作为一个SuperType的所有属性和方法，其内部还有一个指针指向了SuperType的原型。其最终结果就是instance指向SubType的原型，SubType的原型由指向SuperTyoe的原型。
**注意**：使用对象字面量创建原型方法会重写原型链。(我理解原型属性就是一个指向对象的指针，用对象字面量方式就改变指针指向了。)
**原型链的问题**：包含引用类型的值的原型，引用类型值的原型属性会被所有实例共享。
```
function SuperType(){
  this.colors = ["red","blue"];
}

function SubType(){
}

SubType.prototype = new SuperType(); //继承自同一个SuperType实例
var instance1 = new SubType();
instance1.colors.push("green"); //red blue green

var instance2 = new SubType();
instance2.colors // red blue green
```
另一个问题是创建子类型实例的时候不能在不影响所有对象实例的情况下向超类型的构造函数中传递参数。

##### 借用构造函数继承
即在子类型构造函数内部调用超类型构造函数。
```
function SuperType(){
  this.colors = ["red","blue"];
}
function SubType(){
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("green"); //red blue green

var instance2 = new SubType();
instance2.colors // red blue
```
我们在新创建的SubType实例的环境下调用了SuperType构造函数，这样会在新SubType对象执行SuperType函数中定义的所有对象初始化代码。(这样实际上也就是每一个SubType实例继承一个SuperType实例(实际只是把SuperType的代码在SubType的环境中执行了一遍)。)
传递参数：
```
function SuperType(name){
  this.name = name;
}
function SubType(){
  SuperType.call(this,"Gray");
  this.age = 29;
}
var instance1 = new SubType();
instance1.name //"Gray"
```
**问题**： 方法都在构造函数中定义因此函数复用就不存在了即原型链的好处没了。

##### 组合继承(伪经典继承)
思路是使用原型链实现对原型属性和方法的继承，通过构造函数来实现对实例属性的继承。
```
function SuperType(name){
  this.name = name;
  this.colors = ["red","blue"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name,age){
  SuperType.call(this,name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType; //因为重写了原型对象，现在constructor指向SuperType，所以需要指回来。
SubType.prototype.sayAge = function(){
  console.log(this.age);
};
var instance1 = new SubType("Gray","30");
instance1.colors.push("green");//red blue green

var instance2 = new SubType("HaHa","29");
instance2.colors // red blue
```
融合了两种继承方式的优点，解决了缺点。
##### 其他继承方式
原型式继承、寄生式继承、寄生组合式继承。暂时保留，等以后理解了再补充。
