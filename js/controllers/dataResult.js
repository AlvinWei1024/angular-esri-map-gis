
    app.controller('dataResultCtrl',["$scope","$http",function($scope,$http){
        $scope.title="";
        $scope.resultShow=false;
        $scope.resultShowState="hide";
        $scope.dataList=[];


        $scope.resultShowStateChange=function(){
            $scope.resultShow=!$scope.resultShow;
        };
        
        $scope.$on("main-to-result-showState",function(event,res){
            $scope.title=res.title;
            $scope.resultShow=res.showState;
            $scope.dataList=res.req_data;
        });
        $scope.$watch('resultShow',function(){
            console.log("change");
            if($scope.resultShow){

                $scope.resultShowState="fadeInLeft";
                $scope.$emit("result-to-main-stateChanged", true);
            }
            else{
                $scope.resultShowState="fadeOutLeft hide";
                $scope.$emit("result-to-main-stateChanged", false);
            }
        });

        

        
        $scope.addData=function(obj){
            obj.selected=!obj.selected;
            if(obj.selected===true){
                console.log(obj.id);
              
                //getDataInfo by  dataSetId

                $http.get('js/data/dataItemList.json').success(function(result) {
                    var emit_data={
                        showState:true,
                        data:obj,
                        info:result
                    }
                    $scope.$emit("resultItem-to-main-showState", emit_data);
                    $scope.$emit("resultAddInLegendFromDataResult", emit_data);//向父级发消息传送添加数据给legend
                    //console.log(emit_data)

                }).error(function(e){
                    console.error('request is failed')
                })
                
            }
            else{
                console.log('remove');
                $scope.$emit("resultDelInLegendFromDataResult", obj);//向父级发消息传送删除数据给legend
            }
            
        };
        //from legend to delete dataresult
           $scope.$on("resultDelInDataResultFromMain",function(event,data){
            if(data){
                for(i=0;i<$scope.dataList.length;i++){
                    if($scope.dataList[i].id ==data){
                        console.log(1);
                        $scope.dataList[i].selected = false;
                        break;
                    }
                }
            }
        });

        $scope.showDetails=function(obj){
            var data={showState:true};
            

            if(obj.selected===true){
                console.log("加载数据： id为： ");
                // var req_url='js/data/'+child_val.id+'.json';
                // $http.get(req_url).success(function(data){
                //     if(data){
                //         if(data.type){
                //             if(data.type=='GIS'){
                //                 console.log(this);
                //                 console.log("esriMap",esriMap)
                //                 console.log(esriMap.addLayer(data.url,data.subType,{id:child_val.id}));
                //             }
                //             else{
                                
                //             }
                //         }
                //     }
                // });
            }
            else{
                console.log('remove');
                // esriMap.removeLayer(child_val.id)
            }
            
        }
    }]);