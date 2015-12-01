
    app.controller('dataResultCtrl',["$scope","$http","_global",function($scope,$http,Global){
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
            obj.selected=!obj.selected;
            if(obj.selected===true){
                var emit_data={
                    showState:true,
                    data:obj
                };
                Global.dataResultItem.push(obj);
                $scope.$emit("resultAddInLegendFromDataResult", emit_data);//向父级发消息传送添加数据给legend
            }
            else{
                Global.dataResultItem.deleteById(obj.id);
                $scope.$emit("resultDelInLegendFromDataResult", obj);//向父级发消息传送删除数据给legend
            }
            
        };
        $scope.itemExist=function(id){
            return Global.dataResultItem.containItemById(id);
        }
        //from legend to delete dataresult
        $scope.$on("resultDelInDataResultFromMain",function(event,data){
            if(data){
                for(i=0;i<$scope.dataList.length;i++){
                    if($scope.dataList[i].id ==data){
                        $scope.dataList[i].selected = false;
                        break;
                    }
                }
            }
        });

        
    }]);