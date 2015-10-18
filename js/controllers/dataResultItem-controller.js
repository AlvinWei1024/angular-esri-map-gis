app.controller('dataResultItemCtrl',['$scope',"$http",function ($scope,$http) {
    $scope.dataItem={};
    $scope.dataInfo={};
	$scope.resultItemShowState="hide";
	$scope.resultItemShow=false;

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
        if($scope.resultItemShow){
            $scope.resultItemShowState="fadeInLeft";
        }
        else{
            $scope.resultItemShowState="fadeOutLeft hide";
        }
    })
    $scope.$on("main-to-resultItem-showState",function(event,res){
        $scope.resultItemShow=res.showState;
        $scope.title=res.data.name;
        $scope.dataItem=res.data.name;
        $scope.dataInfo=res.info;
    });
    


}])