app.directive('featureTable',['esri_map',function(esriMap){
    return{
        restrict:'EA',
        scope:{
            optionConfig:'='
        },
        template:'<div></div>',
        replace:true,
        compile:function($element,$attrs){
            if(!$element.attr('id')){
                throw new Error('You must set id with directive featureTable');
            }
            $element.removeAttr('id');
            var elementString='<div id=' + $attrs.id + '></div>';
            $($element[0]).append(elementString);
            return function(scope,element,attr){

                
                scope.$watch('optionConfig',function(n,o){
                    if(esriMap.featureTbale)
                    esriMap.featureTbale($attrs.id,scope.optionConfig.url,[])
                });
                
                        // esri_map.createMeasurement(attr.id); 
            };
            
        }
    }
}]);
