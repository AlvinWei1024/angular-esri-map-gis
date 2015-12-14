
    app.controller('dataResultCtrl',["$scope","$http","_global",'esri_map',function($scope,$http,Global,esriMap){
        $scope.title="";
        $scope.resultShow=false;
        $scope.resultShowState="hide";
        $scope.dataList=[];

        console.log(Global)
        $scope.resultShowStateChange=function(){
            $scope.resultShow=!$scope.resultShow;
        };
        
        $scope.$on("main-to-result-showState",function(event,res){
            $scope.title=res.title;
            $scope.resultShow=res.showState;
            $scope.dataList=res.req_data;
        });

        $scope.$watch('resultShow',function(){
            if($scope.resultShow){
                $scope.resultShowState="fadeInLeft";
                $scope.$emit("result-to-main-stateChanged", true);
            }
            else{
                $scope.resultShowState="fadeOutLeft hide";
                $scope.$emit("result-to-main-stateChanged", false);
            }
        });

        
        $scope.showDetails=function(obj){
            var emit_data={
                showState:true,
                data:obj
                // ,info:result
            };
            $scope.$emit("resultItem-to-main-showState", emit_data);
        };


        $scope.addData=function(obj){
            // 添加数据项
            if(!Global.dataResultItem.containItemById(obj.id)){
                obj.showState=false;
                Global.dataResultItem.push(obj);
                console.log(Global.dataResultItem)
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
            }
            
        };
        $scope.itemExist=function(id){
            return Global.dataResultItem.containItemById(id);
        }
        

        
    }]);