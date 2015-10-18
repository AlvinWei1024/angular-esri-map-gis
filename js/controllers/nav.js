/**
/**
/**
 * Created by ALVIN on 2015/6/18.
 */
angular.module("app")
    .controller('navCtrl',["$scope","$http",function($scope,$http){
        var treeViewData=[{
        }];
        $http.get('js/data/menuItems.json').success(function(result) {
            treeViewData=result;
            $scope.navData=treeViewData;
        });
        $scope.navData=treeViewData;
        $scope.getResult=function (event) {
            console.log(event);
        }
        $scope.doNothing=function(){
            //do nothing
        }
        $scope.emitData=function(data){
            $http.get('js/data/dataSetList.json').success(function(result) {
                var emit_data={
                    showState:true,
                    title:data.name,
                    req_data:result
                }
                $scope.$emit("nav-to-main-showState", emit_data);
            });
        }

    }]);
