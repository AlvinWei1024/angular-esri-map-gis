app.controller('dataResultItemCtrl',['$scope',"$http","$timeout",function ($scope,$http,$timeout) {
    
	$scope.resultItemShowState="hide";
	$scope.resultItemShow=false;
    $scope.expand=false;
    $scope.firstInit=0;
    $scope.images=[];
    $scope.titles=[];
    $scope.dataGrid=[];
    $scope.dataInfo={};

    $scope.fullExtent=function(){
        $scope.expand=!$scope.expand;
        angular.element(window).resize();
        
    };
    $scope.resultItemShowStateChange=function(){
        $scope.resultItemShow=!$scope.resultItemShow;
        if($scope.resultItemShow){
        	var data={showState:true};
            $scope.$emit("resultItem-to-main-showState",data);
        }
        else{
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
            $scope.title=res.data.name;
            // $scope.dataItem=res.data.name;

            //getDataInfo by  dataSetId
            console.log(res.data.id);
            //数据id
            //元数据信息
            var url="js/data/dataItemList/"+res.data.id+".json";
            $http.get(url).success(function(result) {
                $scope.dataInfo=result.dataInfo;
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
    function reSetPenal(){
        $scope.images=[];
        $scope.titles=[];
        $scope.dataGrid=[];
        $scope.dataInfo={};
    }


}])