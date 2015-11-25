/**
/**
/**
 * Created by ALVIN on 2015/6/18.
 */
angular.module("app")
    .controller('navCtrl',["$scope","$http",function($scope,$http){
        var treeViewData=[{}];
        var menu_items_url='js/data/menuItems.json';
        $http.get(menu_items_url).success(function(result) {
            treeViewData=result;
            $scope.navData=treeViewData;
        })
        .error(function(e){
                console.error('request is failed:数据请求失败url:('+menu_items_url+')');
            });
        $scope.navData=treeViewData;
        $scope.getResult=function (event) {
            console.log(event);
        }
        $scope.doNothing=function(){
            //do nothing
        }
        $scope.emitData=function(data){
            console.log(data.id)
            var url='js/data/getDataSetList/'+data.id+'.json';
            $http.get(url).success(function(result) {
                var emit_data={
                    showState:true,
                    title:data.name,
                    req_data:result
                }
                $scope.$emit("nav-to-main-showState", emit_data);
            })
            .error(function(e){
                console.error('request is failed:数据请求失败url:('+url+')');
            });
        }

    }]);
