    // <script type="text/javascript">
    	var myDiv = $(".tool");
		$(function() {
		    $(".btn").click(function(event) {
		        showDiv();//调用显示DIV方法
		        // $(myDiv).toggle();
		        $(document).one("click",
		        function() { //对document绑定一个影藏Div方法
		            $(myDiv).hide();
		        });

		        event.stopPropagation(); //阻止事件向上冒泡
		    });
		    $(myDiv).click(function(event) {

		        event.stopPropagation(); //阻止事件向上冒泡
		    });
		});　　　　
		function showDiv() {
		    $(myDiv).fadeIn();
		}
    // </script>




var menu = {};
var slide = {};
$(function(){
	slide.originX = $(document).width() / 2;
	slide.originY = -640;
	
	$(".header-menubtn").click(function(e) {
		if($('.page').hasClass("menu-open")){
			$('.page, .menu').removeClass("menu-open");
			$(this).html('<a href="#" class="header-menubtn"><span class="icon iconfont" style="font-size: 26px;color: #fff;">&#xe605;</span></a>')
		}else{
			$(this).html('<a href="#" class="header-menubtn"><span class="icon iconfont" style="font-size: 26px;color: #fff;">&#xe611;</span></a>')
			$('.page, .menu').addClass("menu-open");
		}
    });

	$('.evaluate').mousedown(function(event) {
		event.touches = [{pageX: 0 , pageY: 0}];
		event.touches[0].pageX = event.pageX;
		event.touches[0].pageY = event.pageY;
        touchstartfun(event);
    });
	
	$('body').mousemove(function(event) {
		event.touches = [{pageX: 0 , pageY: 0}];
		event.touches[0].pageX = event.pageX;
		event.touches[0].pageY = event.pageY;
        touchmovefun(event);
    });
	
	$('.evaluate').mouseup(function(event) {
		event.touches = [{pageX: 0 , pageY: 0}];
		event.touches[0].pageX = event.pageX;
		event.touches[0].pageY = event.pageY;
        touchendfun(event);
    });

	$('.evaluate')[0].addEventListener('touchstart', touchstartfun, false);
	$('body')[0].addEventListener('touchmove', touchmovefun, false);
	$('.evaluate')[0].addEventListener('touchend', touchendfun, false);
	
	function touchstartfun(event) {
        slide.mousedown = true;
		slide.startX = event.touches[0].pageX;
		slide.startY = event.touches[0].pageY;
		slide.startLength = Math.sqrt(Math.pow(slide.startX - slide.originX,2) + Math.pow(slide.startY - slide.originY,2));
		slide.startAngle = Math.atan((slide.originX - slide.startX) / (slide.startY - slide.originY)) / Math.PI * 180;
		/^(?:INPUT|TEXTAREA|A)$/.test(event.target.tagName)||event.preventDefault();
    };
	
	function touchmovefun(event) {
		if(slide.mousedown){
			slide.endX = event.touches[0].pageX;
			slide.endY = event.touches[0].pageY;
			
		}
    };
	function touchendfun(event) {
		if(slide.mousedown){
			slide.endLength = Math.sqrt(Math.pow(slide.endX - slide.originX,2) + Math.pow(slide.endY - slide.originY,2));
			slide.endAngle = Math.atan((slide.originX - slide.endX) / (slide.endY - slide.originY)) / Math.PI * 180;
			
			slide.diffLength = slide.startLength - slide.endLength;
			slide.offX = (slide.diffLength / slide.startLength) * (slide.originX - slide.startX);
			slide.offY = -(slide.diffLength / slide.startLength) * (slide.startY - slide.originY);
			slide.offAngle = -(slide.startAngle - slide.endAngle);

			slide.mousedown = false;
			if(slide.offAngle < -2){
				if(slide.run)return;
				slide.run = true;
				$('.evaluate li:nth-last-child(1)')[0].addEventListener("webkitTransitionEnd", function(e){
					removeLastEvaluate();
				}, false);
				$('.evaluate li:nth-last-child(1)').addClass("transition").css("-webkit-transform","translate(0px, 0px) rotate(-45deg)");
				$('.evaluate li:nth-last-child(2)').css("-webkit-transform","scale(1,1)");
				$('.evaluate li:nth-last-child(3)').css("-webkit-transform","scale(0.95,0.95) translateY(16px)");
			}else if(slide.offAngle > 2){
				if(slide.run)return;
				slide.run = true;
				$('.evaluate li:nth-last-child(1)')[0].addEventListener("webkitTransitionEnd", function(e){
					removeLastEvaluate();
				}, false);
				$('.evaluate li:nth-last-child(1)').addClass("transition").css("-webkit-transform","translate(0px, 0px) rotate(45deg)");
				$('.evaluate li:nth-last-child(2)').css("-webkit-transform","scale(1,1)");
				$('.evaluate li:nth-last-child(3)').css("-webkit-transform","scale(0.95,0.95) translateY(16px)");
			}else{
				$('.evaluate li:nth-last-child(1)').addClass("transition").css("-webkit-transform","translate(0px, 0px) rotate(0deg)");
				setTimeout(function() {$('.evaluate li:nth-last-child(1)').removeClass("transition")}, 500);
			}
		}
    };
	
});

function removeLastEvaluate(){
	$('.evaluate li:nth-last-child(1)').remove();
	slide.run = false;
	if(!$('.evaluate li').length){
		$('#content-evaluate').hide();
		$("#content-rader").show().css("opacity", "1");
		startDrawRader();
	}
}

	  // 奖品列表
    var _content = []; //临时存储li循环内容
  var moreload = {
    _default:5, //默认显示图片个数
    _loading:2,  //每次点击按钮后加载的个数
    init:function(){
      var lis = $(".moreload .hidden li");
      $(".moreload ul.lists").html("");
      for(var n=0;n<moreload._default;n++){
        lis.eq(n).appendTo(".moreload ul.lists");
      }
      for(var i=moreload._default;i<lis.length;i++){
        _content.push(lis.eq(i));
      }
      $(".moreload .hidden").html("");
    },
    loadMore:function(){
      var mLis = $(".moreload ul.lists li").length;
      for(var i =0;i<moreload._loading;i++){
        var target = _content.shift();
        if(!target){
          $('.moreload .more').html("<p>全部加载完毕...</p>");
          break;
        }
        $(".moreload ul.lists").append(target);
        $(".moreload ul.lists img").eq(mLis+i).each(function(){
          $(this).attr('src',$(this).attr('realSrc'));
        });
      }
    }
  }
  moreload.init();
  // --end--



