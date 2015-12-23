angular.module('imageListViewer',[])
.directive("imageListViewer",["$timeout","_global",function($timeout,_config){
	return {
        restrict: 'AE',
        scope: {
        	imageSet:'='
        },
        templateUrl: 'tpl/viewer-tpl.html',
        replace: true,
        link: function (scope, element, attr, controller) {
            scope.http_server=_config.http_server;
            scope.$watch('imageSet',function(n,o){
                scope.selectIndex=0;
                scope.currentImg=scope.imageSet[scope.selectIndex];
            });
        	if(!scope.imageSet){
        		console.error('doesn\' offer \"image-set\" attribute');
        		scope.imageSet=[];
        	}
            else{
                scope.selectIndex=0;
                scope.currentImg=scope.imageSet[scope.selectIndex];
                
            }
            scope.selectImg=function(index){
                scope.selectIndex=index;
                scope.currentImg=scope.imageSet[index];
            }
            scope.preImg=function(){
                if(scope.selectIndex===0){
                    scope.selectIndex=scope.imageSet.length-1;
                }
                else{
                    scope.selectIndex--;
                }
                scope.currentImg=scope.imageSet[scope.selectIndex];
            }
            scope.nextImg=function(){
                if(scope.selectIndex===scope.imageSet.length-1){
                    scope.selectIndex=0;
                }
                else{
                    scope.selectIndex++;
                }
                scope.currentImg=scope.imageSet[scope.selectIndex];
            }
        }
    }
}]);