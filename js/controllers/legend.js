angular.module("app").controller('legendCtl',['esri_map','_global','$scope',"$http",function (esriMap,Global,$scope,$http){
	// body...
	
	// var arcgisType=["arcgislayer","arcgistilelayer","arcgisdynamiclayer","arcgisfeaturelayer"];
	// Array.prototype.contain=function(search){
	// 	var res=null;
	// 	for(var i in this){
	//         if(this[i]==search.toLowerCase()){
	//             res= this[i];
	//             break;
	//         }
	//     }
	//     return res;
	// }
	// var itemData =[];
	var itemData=Global.dataResultItem;
	$scope.itemData=itemData;
	
	
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
	
	$scope.delItem =function(item){
		// if(index>itemData.length-1){
		// 	return;
		// }
		console.log(item)
		try{
			//删除地图中的图层
			esriMap.removeLayer(item.type+item.id);
		}
		catch(e){
			//
		}
		finally{
			//删除图层对象数组中的图层对象
			Global.dataResultItem.deleteById(item.id);
		}
		
	};
	var setItemShowState=function(index,state){
		itemData=Global.dataResultItem.map(function(val,i){
			if(i===index){
				val.showState=state;
			}
			else {
				val.showState=!state;
			}
			return val;
		});
	}

	//提供Eye图标变换接口
	$scope.viewEyesClick = function(index,item){
		console.log(index,item)
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
		return Global.isArcGISLayer(item.type);
	};
	//Zoom
	$scope.centerZoom =function(item){
		if(Global.isArcGISLayer(item.type)){
            try{
            	esriMap.map.setExtent(esriMap.map.getLayer(item.type+item.id).fullExtent);
            }
            catch(e){
            	//...
            }
        }
        else{// 如不是arcgis图层
            //to do ...
        }
		// esriMap.centerAtZoom(item.longitude,item.latitude,5);
	};

	var showDetails=function(obj){
        var emit_data={
            showState:true,
            data:obj
        };
        $scope.$emit("resultItem-to-main-showState", emit_data);
        if(Global.isArcGISLayer(obj.type)){
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