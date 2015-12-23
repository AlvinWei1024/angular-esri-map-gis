/**
/**
/**
 * Created by ALVIN on 2015/6/18.
 */
angular.module("app")
    .controller('navCtrl',["$scope","$http","_global",function($scope,$http,_config){
        var treeViewData=[{}];

        // 地址 
        var menu_items_url=_config.http_server+'menus'; 

        //to fixed
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
        $scope.doNothing=function(a){
            //do nothing
        }
        $scope.emitData=function(data){
            var url=_config.http_server+'dataSets/menu/'+data.id;
            // var url='js/data/getDataSetList/'+data.id+'.json';
            $http.get(url).success(function(result) {
                console.log(result)
                var emit_data={
                    showState:true,
                    title:data.name,
                    req_data:result.datas
                }
                $scope.$emit("nav-to-main-showState", emit_data);
            })
            .error(function(e){
                console.error('request is failed:数据请求失败url:('+url+')');
            });
        }

    }]);
