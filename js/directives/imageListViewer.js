angular.module('imageListViewer',[])
.directive("imageListViewer",["$timeout","_global","esri_map",function($timeout,_config,esriMap){
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
            scope.zoomTo=function(imageObj){

                esriMap.map.graphics.clear();
                
                var station=imageObj.stations;

                var point=_config.proj4(_config.Projection[esriMap.getWkid()]).forward(station);

                var attr={image:scope.http_server+'images/'+imageObj.id};
                var templateString='';

                if(imageObj.execorg){
                    attr.execorg=imageObj.execorg;
                    templateString+="观测单位: ${execorg} <br/>";
                }
                if(imageObj.instrument) {
                    attr.instrument=imageObj.instrument;
                    templateString+="观测仪器: ${instrument} <br/>";
                }
                if(imageObj.type) {
                    attr.type=imageObj.type;
                    templateString+="观测类型: ${type} <br/>";
                }
                if(imageObj.startDateTime) {
                    attr.startDateTime=imageObj.startDateTime;
                    templateString+="开始时间: ${startDateTime} <br/>"
                }
                if(imageObj.endDateTime) {
                    attr.endDateTime=imageObj.endDateTime;
                    templateString+="结束时间: ${endDateTime} <br/>"
                }
                templateString+="<img style='width:100%;' src='${image}'/> <br/>"
                console.log(attr,templateString)
                var title=imageObj.fileName;
                esriMap.addPoint(point,{id:title+imageObj.id},attr,templateString,title);
            }
        }
    }
}]);