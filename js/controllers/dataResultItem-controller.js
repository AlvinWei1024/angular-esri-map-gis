app.controller('dataResultItemCtrl',['$scope',function ($scope) {
	$scope.resultItemShowState="hide";

	$scope.resultItemShow=false;
    $scope.resultShowState="hide";
    $scope.resultItemShowStateChange=function(){
        $scope.resultItemShow=!$scope.resultItemShow;
        if($scope.resultItemShow){
        	var data={showState:true};
            $scope.$emit("dataResult-to-main-showState",data);
        }
        else{
        	var data={showState:false};
            $scope.$emit("dataResult-to-main-showState",data);
        }
    };
    $scope.$watch('resultItemShow',function(){
        // $scope.resultShowState=$scope.resultShow?"fadeInRight":"fadeOutRight hide";
        if($scope.resultItemShow){
            $scope.resultItemShowState="fadeInLeft";
            // var data={showState:true};
            // $scope.$emit("dataResult-to-main-showState",{});
            // $scope.$emit("dataResult-to-main-showState", true);
        }
        else{
        	// var data={showState:false};
        	// $scope.$emit("dataResult-to-main-showState",{});
            $scope.resultItemShowState="fadeOutLeft hide";
            // $scope.$emit("resultPenalStateChanged", false);
        }
    })
    $scope.$on("main-to-resultItem-showState",function(event,res){
        $scope.resultItemShow=res.showState;
        console.log("recieve",res);
    });

}])