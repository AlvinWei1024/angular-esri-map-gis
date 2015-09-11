/**
/**
/**
 * Created by ALVIN on 2015/6/18.
 */
angular.module("app")
    .controller('navCtrl',["$scope","$http","esri_map",function($scope,$http,esriMap){
        var treeViewData=[{
        }];
        $http.get('js/data/treeView.json').success(function(result) {
            treeViewData=result;
            $scope.navData=treeViewData;
            watch_bind();
        });
        $scope.navData=treeViewData;

        //function watch_bind(){
        //    $scope.$watch('navData',function(new_value,old_vale){
        //        if(new_value===old_vale){return;}
        //        var selectCount=0;
        //        $.each($scope.navData,function(i,parent_val){
        //            if(parent_val.child!=null){
        //                $.each(parent_val.child,function(j,val){
        //                    if(val.child!=null){
        //                        $.each(val.child,function(k,child_val){
        //                            selectCount++;
        //                            if(child_val.selected){
        //                            }
        //                            else{
        //                                selectCount--;
        //                            }
        //                            console.log("hasSelected: "+selectCount);
        //                        });
        //                    }
        //                });
        //            }
        //        });
        //        if(selectCount){
        //            $scope.$emit("resultPenalShowFromNav", true);
        //        }
        //        else{
        //            $scope.$emit("resultPenalShowFromNav", false);
        //        }
        //    },true);
        //}
        var hasSelected=0;
        var selectCount=0;
        function watch_bind(){
            if($scope.navData!=null){
                $.each($scope.navData,function(i,parent_val){
                    if(parent_val.child!=null){
                        $.each(parent_val.child,function(j,val){
                            if(val.child!=null){
                                $.each(val.child,function(k,child_val){
                                    selectCount--;
                                    if(!child_val.selected){
                                        hasSelected++;
                                    }
                                    $scope.$watch(function(){return child_val.selected},function(){
                                        selectCount++;
                                        if(child_val.selected){
                                            hasSelected++;
                                            console.log("加载数据： id为： "+child_val.id);
                                            var req_url='js/data/'+child_val.id+'.json';
                                            $http.get(req_url).success(function(data){
                                                if(data){
                                                    if(data.type){
                                                        if(data.type=='GIS'){
                                                            console.log(this);
                                                            console.log("esriMap",esriMap)
                                                            console.log(esriMap.addLayer(data.url,data.subType,{id:child_val.id}));
                                                        }
                                                        else{
                                                            
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                        else{
                                            hasSelected--;
                                            if(selectCount>0){
                                                esriMap.removeLayer(child_val.id)
                                            }
                                            
                                        }
                                        if(selectCount>=0){//dataIterms have selected above 0，result Penal Show in，avoid $watch first time init
                                            if(hasSelected>0){
                                                console.log(hasSelected+ " selected is exist")
                                                $scope.$emit("resultPenalShowFromNav", true);
                                            }
                                            else{
                                                console.log(hasSelected+ " unselected")
                                                $scope.$emit("resultPenalShowFromNav", false);
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        }
    }]);

angular.module("app")
    .controller('dataResultCtrl',["$scope",function($scope){
        $scope.resultShow=false;
        $scope.resultShowState="hide";
        $scope.resultShowStateChange=function(){
            $scope.resultShow=!$scope.resultShow;
        };
        $scope.$watch('resultShow',function(){
            console.log("change")
            $scope.resultShowState=$scope.resultShow?"fadeInRight":"fadeOutRight hide";

        })
        $scope.$on("resultPenalShowFromMain",function(event,msg){
            $scope.resultShow=msg;
        });

        var dataList=[
            {
                imgUrl:'http://localhost:8000/img/dataItems/1.png',
                title:"ABC站",
                details:"其地理坐标为南纬69度 22分24秒、东经76度22分40秒",
                viewNum:12542,
                downNum:5234,
                lastTime:"15.9.11",
                selected:true
            },
            {
                imgUrl:'//tiles-b.data-cdn.linz.govt.nz/services/tiles/v4/thumbnail/layer=804.20231,style=auto/150x100.png',
                title:"中山站CTD",
                details:"其地理坐标为南纬69度 22分24秒与北京的方位角度30分50秒",
                viewNum:12542,
                downNum:5234,
                lastTime:"15.9.11",
                selected:false
            },
            {
                imgUrl:'//tiles-b.data-cdn.linz.govt.nz/services/tiles/v4/thumbnail/layer=804.20231,style=auto/150x100.png',
                title:"中山站CTD",
                details:"东经76度22分40秒，距离北京12553.160千方位角为32度30分50秒",
                viewNum:12542,
                downNum:5234,
                lastTime:"15.9.11",
                selected:false
            }
        ]
        $scope.dataList=dataList;
        $scope.addData=function(index){
            console.log(index)
            console.log($scope.dataList)
            index.selected=true;
        }
        $scope.removeData=function(index){
            index=false;
        }

    }]);
