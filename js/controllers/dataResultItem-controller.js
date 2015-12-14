app.controller('dataResultItemCtrl',['$scope',"$http","$timeout","_global",'esri_map',function ($scope,$http,$timeout,Global,esriMap) {
    
	$scope.resultItemShowState="hide";
	$scope.resultItemShow=false;
    $scope.expand=false;
    $scope.firstInit=0;
    $scope.images=[];
    $scope.titles=[];
    $scope.dataGrid=[];
    $scope.dataInfo={};
    $scope.item={};
// .
    $scope.fullExtent=function(){
        $scope.expand=!$scope.expand;
        angular.element(window).resize();
        
    };
    $scope.resultItemShowStateChange=function(){
        $scope.resultItemShow=!$scope.resultItemShow;
        if($scope.resultItemShow){
            Global.setItemShowState($scope.item.id,true);
        	var data={showState:true};
            $scope.$emit("resultItem-to-main-showState",data);
        }
        else{
            Global.setItemShowState($scope.item.id,false);
        	var data={showState:false};
            $scope.$emit("resultItem-to-main-showState",data);
        }
    };
    $scope.$watch('resultItemShow',function(){
        if(!$scope.firstInit++){
            return;
        }
        if($scope.resultItemShow){
            $scope.resultItemShowState="fadeInLeft";
        }
        else{
            $scope.resultItemShowState="fadeOutLeft";
            setTimeout(function(){
                $scope.$apply(function () {
                 　　$scope.resultItemShowState="hide";
                });
            },500);
            
        }
    });

    $scope.$on("main-to-resultItem-showState",function(event,res){
        $scope.resultItemShow=res.showState;
        if($scope.resultItemShow){
            $scope.item=res.data;
            
            // $scope.dataItem=res.data.name;

            //getDataInfo by  dataSetId
            console.log(res.data.id);
            //数据id
            //元数据信息
            var url="js/data/dataItemList/"+res.data.id+".json";
            $http.get(url).success(function(result) {
                $scope.dataInfo=result.dataInfo;
                console.log()
                $scope.dataGrid=result.dataGrid;
                $scope.titles=getTitles($scope.dataGrid);
                $scope.images=result.dataImage;
                

            }).error(function(e){
                console.error('request is failed:数据请求失败url:('+url+')');
            });
            // 属性数据表
            // 成果图集
        }
        else{
            reSetPenal();
        }
    });
    $scope.$on("main-to-resultItem-isGalleryOpen",function(event,res){
        $scope.expand=res;
    });
    

    // $scope.tabs = [
    //   { title:'Dynamic Title 1', content:'Dynamic content 1' },
    //   { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    // ];
    
    // $scope.addData=function(obj){
    //     obj.selected=!obj.selected;
    //     if(obj.selected===true){
    //         var emit_data={
    //             showState:true,
    //             data:obj
    //         };
    //         $scope.$emit("resultAddInLegendFromDataResult", emit_data);//向父级发消息传送添加数据给legend
    //     }
    //     else{
    //         console.log('remove');
    //         $scope.$emit("resultDelInLegendFromDataResult", obj);//向父级发消息传送删除数据给legend
    //     }
        
    // };
    $scope.addData=function(obj){
        // 添加数据项
        if(!Global.dataResultItem.containItemById(obj.id)){
            obj.showState=true;
            Global.dataResultItem.push(obj);
            // 若为arcgisgis图层
            if(Global.isArcGISLayer(obj.type)){
            //get data by id
                var req_url='js/data/'+obj.type+'.json';
                $http.get(req_url).success(function(res){
                    if(res){
                        if(res.type){
                            if(res.type=='GIS'){
                                esriMap.addLayer(res.url,res.subType,{id:obj.type});
                            }
                            else{
                                
                            }
                        }
                    }
                });
            }
            else{// 如不是arcgis图层
                //to do ...
            }
        }
        else{// 删除数据项
            //删除地图中的图层
            try{
                esriMap.removeLayer(obj.type);
            }
            catch(e){
                // console.error("");
            }
            finally{
                //删除图层对象数组中的图层对象
                Global.dataResultItem.deleteById(obj.id);
            }
            // esriMap.removeLayer(obj.type);
            // //删除图层对象数组中的图层对象
            // Global.dataResultItem.deleteById(obj.id);
        }
        
    };



    function getTitles(arr){
        if(!arr||!arr.length||typeof arr[0]!="object"){
            console.error("datatype for grid should be object, but found "+(typeof arr[0]));
            return null;
        }
        var title=[];
        for(var key in arr[0]){
            title.push(key);
        }
        return title;
    }

    $scope.locationTo=function(data){
        console.log(data);
        //to do...
    }
    $scope.itemExist=function(id){
            return Global.dataResultItem.containItemById(id);
        }
    function reSetPenal(){
        $scope.images=[];
        $scope.titles=[];
        $scope.dataGrid=[];
        $scope.dataInfo={};
        
    }


}])