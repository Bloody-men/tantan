
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



