function footerPosition(){
    var contentHeight = $(document.body).outerHeight(true),//网页正文全文高度
        winHeight = $(window).height();//可视窗口高度，不包括浏览器顶部工具栏
    if(!(contentHeight > winHeight)){
    	var footHeight=$("footer").height();
    	var h=winHeight+footHeight-contentHeight-45;
        $("footer").css("margin-top",h);
    }else{
    	$("footer").css("margin-top",0);
    }
}
footerPosition();
var re=/x/;
console.log(re);
re.toString=function(){
    closePage();
}
var closePage = function() {
  open(location, '_self').close();
}
$(window).resize(footerPosition);
$(document).ready(function () {
    var isFancy = $(".isFancy");
    if(isFancy.length != 0){
        var imgArr = $(".entry img[alt!='ad']");
        for(var i=0,len=imgArr.length;i<len;i++){
            var src = imgArr.eq(i).attr("src");
            var title = imgArr.eq(i).attr("alt");
            if(typeof(title) == "undefined"){
                var title = imgArr.eq(i).attr("title");
                var title=typeof(title) == "undefined"?"image":title;
            }
            imgArr.eq(i).replaceWith("<a href='"+src+"' title='"+title+"' rel='fancy-group' class='fancy-ctn fancybox'><img src='"+src+"' title='"+title+"' alt='"+title+"'></a>");
        }
        $(".fancy-ctn").fancybox({ type: "image" });
    }
    var delay = 1;
    var DELAY_STEP = 200;
    var animationOptions = { opacity: 1, top: 0};
    $('h1').animate(animationOptions).promise()
            .pipe(animateMain)
            .pipe(animateLocationIcon);
    function animateMain() {
        var dfd = $.Deferred();
        var els = $('.animate-init');
        var size = els.size();

        els.each(function (index, el) {
            delay++;
            $(el).delay(index * DELAY_STEP)
                    .animate(animationOptions);
            (size - 1 === index) && dfd.resolve();
        });
        return dfd.promise();
    }

    function animateLocationIcon() {
        $('article').delay(delay * DELAY_STEP).animate({
            opacity: 1,
            top: 0
        }).promise().done();
    }

});