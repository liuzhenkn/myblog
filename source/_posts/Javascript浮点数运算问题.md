---
title: Javascript浮点数运算问题
tags:
- javascript
---

### 浮点数精确计算

Javascript的浮点数运算，总是有些奇怪的结果，所以就在网上查了一下发现了原因:
由于有些小数用二进制表示时是无穷的，故有些精确度丢失是无法避免的。
如：0.2+0.1的的运算结果实际上是：0.30000000000000004
![](/images/20151110/example.png)

<!-- more -->

还有:
```
var i = 0.07;
var r = i*100;
alert(r);
```
结果是7.0000000000000001，但这明显不是我们想要的结果。
在JavsScript中，变量在存储时并不区分number和float类型，而是统一按float存储。而javascript使用IEEE 754-2008 标准定义的64bit浮点格式存储number，按照IEEE 754的定义： http://en.wikipedia.org/wiki/IEEE_754-2008
decimal64对应的整形部分长度为10,小数部分长度为16，所以默认的计算结果为“7.0000000000000001”，如最后一个小数为0，则取1作为有效数字标志。
类似地，我们可以想像，1/3的结果应该是0.3333333333333333。
为了得到我们想要的结果，我们需要校正这个值。

### 解决方法

通过Math.pow(x,y)函数，返回x的y次幂。
如果结果是虚数或负数，则该方法将返回 NaN。如果由于指数过大而引起浮点溢出，则该方法将返回 Infinity。

```
//除法函数，用来得到精确的除法结果     
//调用：division(arg1,arg2)      
//返回值：arg1除以arg2的精确结果   
function division(arg1,arg2){   
    var t1=0,t2=0,r1,r2;   
    try{t1=arg1.toString().split(".")[1].length}catch(e){}   
    try{t2=arg2.toString().split(".")[1].length}catch(e){}   
    with(Math){   
        r1=Number(arg1.toString().replace(".",""));   
        r2=Number(arg2.toString().replace(".",""));    
        return (r1/r2)*pow(10,t2-t1);   
    }   
}   

//乘法函数，用来得到精确的乘法结果       
//调用：multiply(arg1,arg2)      
//返回值：arg1乘以arg2的精确结果      
function multiply(arg1,arg2){   
    arg1=String(arg1);var i=arg1.length-arg1.indexOf(".")-1;i=(i>=arg1.length)?0:i;   
    arg2=String(arg2);var j=arg2.length-arg2.indexOf(".")-1;j=(j>=arg2.length)?0:j;   
    return arg1.replace(".","")*arg2.replace(".","")/Math.pow(10,i+j);   
}    

//加法函数，用来得到精确的加法结果            
//调用：add(arg1,arg2)      
//返回值：arg1加上arg2的精确结果      
function add(arg1,arg2){   
    var r1,r2,m;   
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}   
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}   
    m=Math.pow(10,Math.max(r1,r2));   
    return (arg1*m+arg2*m)/m;   
}
```
最后可以给Number类型增加相应的计算方法来方便调用。
这样如果你要计算 0.7 * 0.8，只需（0.7）.mul(0.8)，调用 mul 方法就可以得到准确的结果了。

### 总结

尽量不要用 js 进行复杂的运算，特别是浮点数的运算。
如果一定要进行浮点数运算，先将浮点数转化为整型，再运算。
