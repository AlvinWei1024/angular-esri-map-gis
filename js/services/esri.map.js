/**
 * Created by ALVIN on 2015/7/9.
 */

angular.module('esri',[]).service('esri_map',function($timeout,$q){
    var projectionServerURL='http://10.200.21.35:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer';
    var self=this;
    this.map;
    this.mapDerfer= $q.defer();
    this.addLayerDerfer= $q.defer();
    this.wkid='Mercator';//South,North

    //var mapDeferred = $q.defer();
    var navToolbar;
    require(["esri/dijit/BasemapGallery","esri/dijit/Basemap","esri/dijit/BasemapLayer"], function (BasemapGallery,Basemap,BasemapLayer){
        self.setBaseMapGallery=function(object,eleId){
            if(!object.length){
                throw new Error('basemaps is null');
            }
            else{
                var basemaps = [];
                angular.forEach(object,function(value){
                    var baseLayers=[];
                    angular.forEach(value.layers,function(layerUrl){
                        var basmapLayer=new BasemapLayer({
                            url:layerUrl
                            //isReference:true
                        });
                        baseLayers.push(basmapLayer);
                    });
                    var tempBasemap = new Basemap({
                        layers: baseLayers,
                        title: value.title,
                        thumbnailUrl: value.thumbnailUrl
                    });
                    basemaps.push(tempBasemap);
                });
                self.basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: false,
                    map: self.map,
                    basemaps:basemaps
                }, eleId);
            }
        }
    });

    //new map
    var mapDIV_id;
    require(['esri/map'], function(Map){
        self.createMap=function(eleID,mapOptions){
            if(self.map){
                throw new Error('The map has been created, you can not create another map. The map id is "'+this.map.id+'"');
            }
            else{
                if(!angular.element("#"+eleID)[0]){
                    throw new Error('You must provide a element with id: "'+eleID+'"');
                }
                else{
                    $timeout(function(){
                        self.map=new Map(eleID,mapOptions);
                        self.mapDerfer.resolve(self.map);
                    },0);
                }
            }
        }
    });

    //self.changeMap
    var currentProjection=null;
    self.changeMap=null;
    require(['esri/basemaps',"esri/map","dojo/domReady!"], function(esriBasemaps,Map){
        self.changeMap=function(option){
            if(option){
                esriBasemaps.base_map = {
                  baseMapLayers: [{url: option.layers[0]}],
                  thumbnailUrl: option.thumbnailUrl,
                  title: option.title
                };
                if(currentProjection===option.projection){

                    self.map.setBasemap("base_map");
                }
                else{
                    angular.element("#map").empty();
                    self.map = new Map("map", {
                      basemap: "base_map",
                      zoom: option.zoom,
                      logo:false
                    });
                    self.mapDerfer.resolve(self.map);
                    resetMap(self.map)
                    currentProjection=option.projection;
                    self.wkid=currentProjection;
                }
            }
            else{
                throw new Error("You must offer an option of the mapLayer");
            }
        }
    });

    this.navToolbar;
    this.measurement;
    this.centerAt;
    this.addLayer;
    this.mapDerfer.promise.then(function(map){
        resetMap(map);
    });

    function resetMap(map){
        require(['esri/toolbars/navigation'], function(Navigation){
            if(map){
                self.navToolbar=new Navigation(map);
                self.navToolbar.on("ExtentHistoryChange", extentHistoryChangeHandler);
                function extentHistoryChangeHandler() {
                    //alert(1)
                    //$("#map_zoomprev").disabled = self.navToolbar.isFirstExtent();
                    //$("#map_zoomnext").disabled = self.navToolbar.isLastExtent();
                }
                self.navToolbar.activateOption=function(option){

                    if(typeof option=='string'){
                        switch (option.toLowerCase()){
                            case 'zoom_in':{
                                self.navToolbar.activate(Navigation.ZOOM_IN);
                                return;
                            }
                            case 'zoom_out':{
                                self.navToolbar.activate(Navigation.ZOOM_OUT);
                                return;
                            }
                            case 'pan':{
                                self.navToolbar.activate(Navigation.PAN);
                                return;
                            }
                            case 'full_extent':{
                                map.centerAndZoom(esri.geometry.Point(120, 31.5),5);
                                return;
                            }
                            default:{
                                throw new Error("The option should be ZOOM_IN, ZOOM_OUT or PAN")
                            }
                        }
                    }
                    else{
                        throw new Error('activateOption must be a string');
                    }
                }
                // console.log(self)
            }
            else{
                throw new Error('the map is undefined');
            }
        });

        require(["esri/dijit/Measurement","esri/units"],function(Measurement,Units){
            self.createMeasurement=function(measureId){
                //console.log(angular.element("#"+measureId));
                if(!angular.element("#"+measureId)[0]){
                    throw new Error('You must provide a element with id: "'+measureId+'"');
                }
                else {
                    if(!angular.element("#"+measureId)[0].childNodes[0]){
                        angular.element("#measurement_dijit").html('<div></div>')
                    }
                    self.measurement = new Measurement({
                        map: self.map,
                        defaultAreaUnit: Units.SQUARE_MILES,
                        defaultLengthUnit: Units.KILOMETERS
                    }, angular.element("#"+measureId)[0].childNodes[0]);
                    self.measurement.startup()
                }
            }
        });
        require(["esri/toolbars/draw", "esri/graphic","esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol"],
            function(Draw,Graphic,SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol){
                self.toolbar = new Draw(map);
                self.toolbar.on("draw-end", addToMap);
                function addToMap(evt) {
                    var symbol;
                    self.toolbar.deactivate();
                    map.showZoomSlider();
                    switch (evt.geometry.type) {
                        case "point":
                        case "multipoint":
                            symbol = new SimpleMarkerSymbol();
                            break;
                        case "polyline":
                            symbol = new SimpleLineSymbol();
                            break;
                        default:
                            symbol = new SimpleFillSymbol();
                            break;
                    }
                    var graphic = new Graphic(evt.geometry, symbol);
                    map.graphics.add(graphic);
                }
                self.toolbar.activeTool=function(type){
                    if(typeof type!='string'){
                        throw new Error("Draw type should be a string");
                    }
                    switch (type.toUpperCase()){
                        case 'POLYLINE':{
                            self.toolbar.activate(Draw.POLYLINE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'POLYGON':{
                            self.toolbar.activate(Draw.POLYGON);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'CIRCLE':{
                            self.toolbar.activate(Draw.CIRCLE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'RECTANGLE':{
                            self.toolbar.activate(Draw.RECTANGLE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'ELLIPSE':{
                            self.toolbar.activate(Draw.ELLIPSE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'ARROW':{
                            self.toolbar.activate(Draw.ARROW);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'GRAGHICS_CLEAR':{
                            try {
                                map.graphics.clear();
                            }
                            catch (e) {
                                console.log(e)
                            }
                            finally{
                                break;
                            }
                        }
                        default:
                            throw new Error("Draw type should be a string: POLYLINE, POLYGON, CIRCLE, RECTANGLE, ELLIPSE, ARROW, GRAGHICS_CLEAR");
                    }
                }
            }
        );
        require(["esri/geometry/Point","esri/symbols/PictureMarkerSymbol",
            "esri/Color", "esri/InfoTemplate", "esri/graphic","esri/SpatialReference", "esri/tasks/GeometryService", "esri/tasks/ProjectParameters"],function(Point,PictureMarkerSymbol,Color,InfoTemplate,Graphic,SpatialReference,GeometryService,ProjectParameters){

            var graphic = '';
           self.centerAt=function(lot,lat,wkid){
                if(graphic != ''){
                    map.graphics.remove(graphic);
                }
                    var point =  new Point(lot,lat,new SpatialReference({wkid:4326}));
                    //此处进行经纬->投影坐标转换 利用geometry service
                    var gsvc = new GeometryService(projectionServerURL);//geometry service 地址
                    var params = new ProjectParameters();
                    params.geometries = [point];
                    params.outSR = new SpatialReference({wkid:wkid});
                    params.transformation = '';
                    params.format = 'JSON';
                    gsvc.project(params);
                    gsvc.on("project-complete", function(result){
                         mapPoint = result.geometries[0];
                        //定位
                        map.centerAt(mapPoint);
                        graphic = new Graphic(mapPoint,pictureMarkerSymbol);
                        map.graphics.add(graphic);
                });
                var pictureMarkerSymbol = new PictureMarkerSymbol('img/mksymbol.png',29,42);
            }
            self.centerAtRm=function(){
                if(graphic != ''){
                    map.graphics.remove(graphic);
                }
            }
        });
        self.getWkid=function(){
                       // console.log(map.spatialReference.wkid);
                          return map.spatialReference.wkid;
                    };
        require(["esri/layers/ArcGISTiledMapServiceLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer"],
        function(ArcGISTiledMapServiceLayer,ArcGISDynamicMapServiceLayer,ArcGISImageServiceLayer,FeatureLayer){
            self.addLayer=function(url,type,option){
                if(url){
                    if(type){
                        var maplayer;
                        switch (type){
                            case 'ArcGISTiledMapServiceLayer':{
                                maplayer = new ArcGISTiledMapServiceLayer(url,option);
                                break;
                            }
                            case 'ArcGISDynamicMapServiceLayer':{
                                maplayer = new ArcGISDynamicMapServiceLayer(url,option);
                                break;
                            }
                            case 'ArcGISImageServiceLayer':{
                                maplayer = new ArcGISImageServiceLayer(url,option);
                                break;
                            }
                            case 'FeatureLayer':{
                                maplayer = new FeatureLayer(url,option);
                                break;
                            }
                            default :{
                                throw new Error(type+" is not available");
                            }
                        }
                        map.addLayer(maplayer);
                        maplayer.on('load',function(){
                            map.setExtent(maplayer.fullExtent)
                        });
                        return maplayer.id;
                    }
                    else{
                        throw new Error("You must define a type of the mapLayer");
                    }
                }
                else{
                    throw new Error("You must offer a url of the mapLayer");
                }
            }
            self.addLayerDerfer.resolve('ok');
            self.removeLayer=function(layerID){
                self.map.removeLayer(self.map.getLayer(layerID));
            }
        })
//
    }


});
