/**
 * Created by alvinWei on 15/5/13.
 */
app.controller('MapController', ['$scope','esri_map',function ($scope,esri_map) {
        // var mq= $q.defer();
        var mapHeight=document.body.clientHeight-50;//minus header's height 50
        $scope.mapHeight=mapHeight;
        $scope.mapStyle={height:$scope.mapHeight+"px"};
        $(window).resize(function(){
            mapHeight=document.body.clientHeight-50;
            $scope.mapHeight=mapHeight;
            $scope.mapStyle={height:$scope.mapHeight+"px"};
        });
    }
]);
