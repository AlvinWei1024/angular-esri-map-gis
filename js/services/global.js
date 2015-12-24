angular.module('global',[]).service('_global', ['$q', function($q){
	var content=this;
	var http_server="http://localhost:3000/";
	http_server="http://192.168.66.198:3000/";
	this.http_server=http_server;
	this.dataResultItem=[];
	this.reset=function(){
		this.dataResultItem=[];
		this.itemShowState=[];
	}
	this.itemShowState=[];
	var ArcGISType=["arcgisimagelayer","arcgistilelayer","arcgisdynamiclyaer","arcgisfeaturelayer"];
	// var firstProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
	// var secondProjection = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
	// //I'm not going to redefine those two in latter examples.
	// proj4(firstProjection,secondProjection,[2,5]);
	// // [-2690666.2977344505, 3662659.885459918]

	//'Mercator';//South,North

	this.Projection={
		'Mercator':'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',
		'102100':'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',
		'South':'PROJCS["South_Pole_Stereographic",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Stereographic"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",-90.0],UNIT["Meter",1.0]]',
		'102021':'PROJCS["South_Pole_Stereographic",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Stereographic"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",-90.0],UNIT["Meter",1.0]]',
		'North':'PROJCS["North_Pole_Stereographic",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Stereographic_North_Pole"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["standard_parallel_1",71.0],UNIT["Meter",1.0]]'
	};
	// require(['proj4'],function(a){
	// 	console.log(a)
	// })
	this.wkidObj={
            102021:{id:"South",name:"南极"},

            102018:{id:"North",name:"北极"},
            5936:{id:"North",name:"北极"},

            102100:{id:"Mercator",name:"墨卡托"},
            4326:{id:"Mercator",name:"墨卡托"}
        }
	var package_path = "../../../../../vendor/proj4js/proj4.js";
	require([package_path],function(proj4){
		// var point=proj4(Projection['Mercator'],Projection['South'],[67.8,-76]);
		content.proj4=proj4;
	})

	this.isArcGISLayer=function(type){
		var res=false;
		var tempType=type.toLowerCase();
		for(var i in ArcGISType){
			if(ArcGISType[i]==tempType){
				res = true;
				break;
			}
		}
		return res;
	}
	this.setItemShowState=function(id,option){
		for (var i = this.dataResultItem.length - 1; i >= 0; i--) {
			if(this.dataResultItem[i].id===id){
				this.dataResultItem[i].showState=option;
				break;
			}
		};
	}
	this.cloneObj = function(obj){
	    var str, newobj = obj.constructor === Array ? [] : {};
	    if(typeof obj !== 'object'){
	        return;
	    } else if(window.JSON){
	        str = JSON.stringify(obj), //系列化对象
	        newobj = JSON.parse(str); //还原
	    } else {
	        for(var i in obj){
	            newobj[i] = typeof obj[i] === 'object' ? 
	            cloneObj(obj[i]) : obj[i]; 
	        }
	    }
	    return newobj;
	};
	Array.prototype.deleteById=function(id){
		// console.log(this.dataResultItem);
		for(var i in this){
			if(this[i].id===id){
				this.splice(i,1);
			}
		}
		// console.log(this.dataResultItem);
	}
	Array.prototype.containItemById=function(itemId){
		for(var i in this){
			if(itemId===this[i].id){
				return true;
			}
		}
		return false;
	}
}]);