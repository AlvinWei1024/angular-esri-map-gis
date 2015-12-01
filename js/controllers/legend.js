angular.module("app").controller('legendCtl',['esri_map','_global','$scope',"$http",function (esriMap,g,$scope,$http){
	// body...
	console.log(g)
	var arcgisType=["arcgislayer","arcgistilelayer","arcgisdynamiclayer","arcgisfeaturelayer"];
	Array.prototype.contain=function(search){
		var res=null;
		for(var i in this){
	        if(this[i]==search.toLowerCase()){
	            res= this[i];
	            break;
	        }
	    }
	    return res;
	}
	var itemData =[];
	//与DataResule交互消息
	$scope.$on("resultAddInLegendFromMain",function(event,msg){
		
		if(msg){
			$scope.addItem(msg.data.name,msg.data.type,msg.data.id);
			//add layer
			console.log(msg);
			if(arcgisType.contain(msg.data.type)){
				//get data by id
				var req_url='js/data/'+msg.data.type+'.json';
				$http.get(req_url).success(function(res){
					if(res){
	                    if(res.type){
	                        if(res.type=='GIS'){
	                            esriMap.addLayer(res.url,res.subType,{id:msg.data.type});
	                        }
	                        else{
	                            
	                        }
	                    }
	                }
				});
			}
		}

	});
	$scope.$on("resultDelInLegendFromMain",function(event,data){
		console.log(data)
		if(data){
			for(i=0;i<$scope.itemData.length;i++){
				if($scope.itemData[i].id ==data.id){
					$scope.delItem(i);
					
					break;
				}
			}
		}
	});

	$scope.itemData=itemData;
	// for(var i=0;i<$scope.itemData.length;i++){
	// 	$scope.itemData[i].showState="fa-eye";
	// 	console.log($scope.itemData);
	// }
	$scope.explored=true;
	$scope.legendItems=[
		{

		},
		{

		}
	];
	//提供Legend添加接口
	$scope.addItem =function(name,type,id){
		var item ={
			name:name,
			type:type,
			showState:false,
			id:id,
			longitude:130,
			latitude:30
		};
		//加入增加图层
		$scope.itemData.push(item);
	};

	//提供Legend删除接口
	$scope.delItem =function(index){
		if(index>$scope.itemData.length-1){
			return;
		}
		//else if(confirm("确认删除？")){
			//加入删除图层
			console.log(itemData[i])
			//remove layer

			esriMap.removeLayer(itemData[i].type)
			$scope.$emit("resultDelInDataResultFromLegend", $scope.itemData[index].id);//向父级发消息删除数据给DataResult
			$scope.itemData.splice(index,1);
		//}

	};
	var setItemShowState=function(index,state){
		$scope.itemData=$scope.itemData.map(function(val,i){
			if(i===index){
				val.showState=state;
			}
			else {
				console.log(i,index)
				val.showState=!state;
			}
			return val;
		});
	}

	//提供Eye图标变换接口
	$scope.viewEyesClick = function(index,item){
		
		if(item.showState === false){
			setItemShowState(index,true);
			showDetails(item);
		}
		else if(item.showState === true){
			item.showState=false;
			hideDetails(item);
			
		}
	};

	

	
	$scope.isGISType =function(item){
		return arcgisType.contain(item.type);
	};
	//Zoom
	$scope.centerZoom =function(item){
		esriMap.centerAtZoom(item.longitude,item.latitude,5);
	};

	var showDetails=function(obj){
        var emit_data={
            showState:true,
            data:obj
        };
        $scope.$emit("resultItem-to-main-showState", emit_data);
        if(arcgisType.contain(obj.type)){
        	// esriMap. show layer with id 
        }
    };
    var hideDetails=function(obj){
        var emit_data={
            showState:false,
            data:obj
        };
        $scope.$emit("resultItem-to-main-showState", emit_data);
    };

	

	
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