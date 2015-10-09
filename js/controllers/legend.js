angular.module("app").controller('legendCtl',['$scope',function ($scope){
	// body...
	$scope.explored=true;
	$scope.legendItems=[
		{

		},
		{

		}
	];
	

	
}]);
$(document).ready(function() {
	$("#legend-content").mousedown(function(e){
		$(this).css("cursor", "move"); //改变鼠标指针的形状 

		var offset = $(this).offset(); //DIV在页面的位置 
		var x = e.pageX - offset.left; //获得鼠标指针离DIV元素左边界的距离 
		var y = e.pageY - offset.top; //获得鼠标指针离DIV元素上边界的距离 
		$(document).bind("mousemove", function(ev){
			$("#legend-content").stop(); //加上这个之后 

			var _x = ev.pageX - x; //获得X轴方向移动的值 
			var _y = ev.pageY - y; //获得Y轴方向移动的值 

			$("#legend-content").animate({
				left: _x + "px",
				top: _y + "px"
			}, 10);
		});
	});

	$(document).mouseup(function() {
		$("#legend-content").css("cursor", "default");
		$(this).unbind("mousemove");
	})
});