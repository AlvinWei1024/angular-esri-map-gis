app.controller('dataResultItemCtrl',['$scope',"$http","$timeout","_global",'esri_map',function ($scope,$http,$timeout,_config,esriMap) {
    
	$scope.resultItemShowState="hide";
	$scope.resultItemShow=false;
    $scope.expand=false;
    $scope.firstInit=0;
    $scope.images=[];
    $scope.titles=[];
    $scope.dataGrid=[];
    $scope.dataInfo={};
    $scope.item={};
    
    $scope.http_server=_config.http_server;

    var hideTitle=["id","station"];
    
    $scope.titleContain=function(title){
        return arrayContain(hideTitle,title).length;
    };
// .
    $scope.fullExtent=function(){
        $scope.expand=!$scope.expand;
        angular.element(window).resize();
        
    };
    $scope.resultItemShowStateChange=function(){
        $scope.resultItemShow=!$scope.resultItemShow;
        if($scope.resultItemShow){
            _config.setItemShowState($scope.item.id,true);
        	var data={showState:true};
            $scope.$emit("resultItem-to-main-showState",data);
        }
        else{
            _config.setItemShowState($scope.item.id,false);
        	var data={showState:false};
            $scope.$emit("resultItem-to-main-showState",data);
            esriMap.map.graphics.clear();
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
            var url_info=_config.http_server+'dataSets/'+res.data.id;
            //"js/data/dataItemList/"+res.data.id+".json";
            console.log("url_info",url_info)
            $http.get(url_info).success(function(result) {
                $scope.dataInfo=result;
                console.log(result)

            }).error(function(e){
                console.error('request is failed:数据请求失败url:('+url_info+')');
            });

            // 属性数据表
            var url_grid=_config.http_server+'rdatas/'+res.data.id;
            $http.get(url_grid).success(function(result) {
                var rgrid=_config.cloneObj(result);
                $scope.dataGrid=rgrid.filter(function(val){
                    if(val.id) delete val.id;
                    if(val.station) delete val.station;
                    return val;
                });
                // $scope.dataGrid=rgrid;
                $scope.titles=getTitles($scope.dataGrid);

            }).error(function(e){
                console.error('request is failed:数据请求失败url:('+url_grid+')');
            });
            
            // 成果图集
            var url_image=_config.http_server+'gains/dataSet/'+res.data.id;
            $http.get(url_image).success(function(result) {
                console.log(result.datas)
                $scope.images=result.datas;

            }).error(function(e){
                console.error('request is failed:数据请求失败url:('+url_image+')');
            });
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
        if(!_config.dataResultItem.containItemById(obj.id)){
            // obj.showState=true;
            // _config.dataResultItem.push(obj);
            // // 若为arcgisgis图层
            // if(_config.isArcGISLayer(obj.type)){
            // //get data by id
            //     var req_url=_config.http_server+'geoServices/'+obj.id;
            //     // var req_url='js/data/'+obj.type+'.json';
            //     $http.get(req_url).success(function(res){
            //         if(res){
            //             if(res.url){
            //                 esriMap.addLayer(res.url,res.subType,{id:obj.type+obj.id});
            //             }
            //         }
            //     });
            // }
            // else{// 如不是arcgis图层
            //     //to do ...
            // }
            // 若为arcgisgis图层
            if(_config.isArcGISLayer(obj.type)){
            //get data by id
                var req_url=_config.http_server+'geoServices/'+obj.id;
                // var req_url='js/data/'+obj.type+'.json';
                $http.get(req_url).success(function(res){
                    if(res){
                        if(res.url){
                            
                            esriMap.wkidCheck(res.url,res.subType);
                            esriMap.wkidDeffer.promise.then(function(wkid){

                                //当底图的wkid与欲加图层wkid一致再添加图层
                                if(_config.wkidObj[wkid].id==_config.wkidObj[esriMap.map.spatialReference.wkid].id){
                                    esriMap.addLayer(res.url,res.subType,{id:obj.type+obj.id},res.popupTemplate);
                                    
                                    obj.showState=false;
                                    _config.dataResultItem.push(obj);
                                }
                                else{
                                    alert("请把底图切换到  "+_config.wkidObj[wkid].name+"  投影的底图！")
                                }
                            });
                        }
                    }
                });
            }
            else{// 如不是arcgis图层
                //to do ...
                obj.showState=false;
                _config.dataResultItem.push(obj);
            }
        }
        else{// 删除数据项
            //删除地图中的图层
            try{
                esriMap.removeLayer(obj.type+obj.id);
            }
            catch(e){
                // console.error("");
            }
            finally{
                //删除图层对象数组中的图层对象
                _config.dataResultItem.deleteById(obj.id);
            }
            // esriMap.removeLayer(obj.type);
            // //删除图层对象数组中的图层对象
            // _config.dataResultItem.deleteById(obj.id);
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
        console.log(title)
        return title;
    }


    $scope.locationTo=function(data){
        console.log(data);
        //to do...
    }
    $scope.itemExist=function(id){
            return _config.dataResultItem.containItemById(id);
        }
    function reSetPenal(){
        $scope.images=[];
        $scope.titles=[];
        $scope.dataGrid=[];
        $scope.dataInfo={};
        
    }
    function arrayContain(arr,string){
        var a=arr.filter(function(val){
            return val===string;
            
        });
        return a;
    };

}])