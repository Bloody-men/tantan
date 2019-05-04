
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