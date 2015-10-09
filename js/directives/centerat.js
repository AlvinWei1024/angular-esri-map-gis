/**
 * Created by db on 2015/7/10.
 */
app.directive('centerAt', ['esri_map', function (esri_map) {
    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'tpl/centerat.tool.html',

        replace: true,
        link: function (scope, element, attr, controller) {
            scope.lat = '';
            scope.lot = '';
            scope.lotError = false;
            scope.latError = false;
            scope.btnDisable = false;
            scope.isOpen = false;
            scope.errorMessage = "";
            //设置北极纬度范围
            scope.northLeftLimitLat = 0;
            scope.northRightLimitLat = 90;
            scope.southLeftLimitLat = -90;
            scope.southRightLimitLat = 0;
            scope.open = function () {
                scope.isOpen = !scope.isOpen;
                if(!scope.isOpen ){
                    scope.lat = '';
                    scope.lot = '';
                    esri_map.centerAtRm();

                }
            };
           scope.submitClick = function () {
                scope.wkid =  esri_map.getWkid();
                esri_map.centerAt(scope.lot, scope.lat, scope.wkid);
            };
            scope.deleteClick = function () {

                scope.lat = '';
                scope.lot = '';
                esri_map.centerAtRm();
            };
             scope.$on("resultChangeMapMessageFromMain",function(event,msg){
                if(msg==true){
                    scope.deleteClick();
                }
            });
            scope.$watch('lot', function (newValue, oldValue) {
                if (!scope.lot) {
                    scope.btnDisable = true;
                    scope.lotError = false;
                }
                else {
                    if (!isNaN(scope.lot) && -180 <= scope.lot && scope.lot <= 180) {
                        scope.lotError = false;
                        if (scope.latError == false) {
                            scope.btnDisable = false;
                        }
                    }
                    else {
                        scope.lotError = true;
                        scope.btnDisable = true;
                    }

                }

            });
             scope.$watch('lat', function (newValue, oldValue) {
                    if (!scope.lat) {
                        scope.btnDisable = true;
                        scope.latError = false;
                    }
                    else {
                        if(esri_map.wkid =='Mercator'){//mok
                            if (!isNaN(scope.lat) && -90 <= scope.lat && scope.lat <= 90) {
                                scope.latError = false;
                                if (scope.lotError == false) {
                                    scope.btnDisable = false;
                                }
                            }
                            else {
                                scope.latError = true;
                                scope.errorMessage = '，纬度应在-90～90度范围内！';
                                scope.btnDisable = true;
                            }
                         }
                        else if(esri_map.wkid =='South'){//南极
                            if (!isNaN(scope.lat) &&  scope.southLeftLimitLat <= scope.lat && scope.lat <= scope.southRightLimitLat) {
                                scope.latError = false;
                                if (scope.lotError == false) {
                                    scope.btnDisable = false;
                                }
                            }
                            else {
                                scope.latError = true;
                                scope.errorMessage = '，纬度应在'+scope.southLeftLimitLat+'～'+scope.southRightLimitLat+'度范围内！';
                                scope.btnDisable = true;
                            }
                        }
                        else if(esri_map.wkid =='North'){//北极
                            if (!isNaN(scope.lat) && scope.northLeftLimitLat <= scope.lat && scope.lat <= scope.northRightLimitLat) {
                                scope.latError = false;
                                if (scope.lotError == false) {
                                    scope.btnDisable = false;
                                }
                            }
                            else {
                                scope.latError = true;
                                scope.errorMessage = '，纬度应在'+scope.northLeftLimitLat+'～'+scope.northRightLimitLat+'度范围内！';
                                scope.btnDisable = true;
                            }
                        }
                    }
                })

        }
    }
}])