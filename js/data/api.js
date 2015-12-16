//极地专项 WEBGIS前端API接口说明以及数据返回格式

// 树形菜单接口定义
// 
url: ..../menuItems; 
method: GET;
result: 数组对象
返回参数详解：id:id, name:数据项显示名称, parent:父级id, selected:默认false, icon:图标获取的className, submenu:子项，数组
sample:
[
	{	
		"id":"1",
		"name":"基础地理",
		"parent":null,
		"selected":false,
		"icon":"glyphicon-stats text-primary-dker",
		"submenu":[
			{	
				"id":"11",
				"name":"南极遥感",
				"parent":"1",
				"selected":false,
				"icon":"",
				"submenu":[
					{	"id":"111",
						"name":" 南极周边",
						"parent":"11",
						"selected":false,
						"icon":"",
						"submenu":[]
					}
				]
			},
			{	"id":"12",
				"name":"标本样品",
				"parent":"1",
				"selected":false,
				"icon":"",
				"submenu":[]
			}
		]
	},
	{	
		"id":"2",
		"name":"专题数据",
		"parent":null,
		"selected":false,
		"icon":"glyphicon-calendar text-info-dker",
		"submenu":[
			{	"id":"2-1",
				"name":"南极遥感",
				"parent":"2",
				"selected":false,
				"icon":"url",
				"submenu":[]
			}
		]
	}
]

// 根据树形菜单id获取该数据分类的所有数据项目
// 
url: ..../getDataSetList/{id}; 
method: GET;
result: 数组对象

返回参数详解：
id:id, name:数据名称, menuItemId:树形菜单的id, viewTimes:浏览次数,
downloadTimes:下载次数, updateTime:最后更新时间,
description:数据描述, image:数据项显示图片, 
type:数据类型 arcgisFeatureLayer arcgisdynamicLayer grid image titleLayer imageLayer
author:数据单位

sample:
[
	{
		"id":123,
		"name":"A海域数据(FeatureLayer)",
		"menuItemId":2,
		"viewTimes":12202,
		"downloadTimes":5233,
		"updateTime":"2015-09-09",
		"description":"其地理坐标为南纬69度 22分24秒、东经76度22分40秒其地理坐标为南纬69度 22分24秒、东经76度22分40秒其地理坐标为南纬69度 22分24秒、东经76度22分40秒其地理坐标为南纬69度 22分24秒、东经76度22分40秒",
		"image":"http://localhost:8000/img/dataItems/1.png",
		"type":"arcgisFeatureLayer",
		"author":"",
		"lic":""
	},
	{
		"id":126,
		"name":"B海域数据(dynamicLayer)",
		"menuItemId":2,
		"viewTimes":12202,
		"downloadTimes":5233,
		"updateTime":"2015-09-09",
		"description":"http://localhost:8000/img/dataItems/1.png",
		"image":"http://localhost:8000/img/dataItems/1.png",
		"type":"arcgisdynamicLayer",
		"author":"",
		"lic":""
	},
	{
		"id":124,
		"name":"grid",
		"menuItemId":2,
		"viewTimes":12202,
		"downloadTimes":5233,
		"updateTime":"2015-09-09",
		"description":"http://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.png",
		"image":"http://localhost:8000/img/dataItems/1.png",
		"type":"grid",
		"author":"",
		"lic":""
	},
	{
		"id":125,
		"name":"image",
		"menuItemId":2,
		"viewTimes":12202,
		"downloadTimes":5233,
		"updateTime":"2015-09-09",
		"description":"http://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.png",
		"image":"http://localhost:8000/img/dataItems/1.png",
		"type":"image",
		"author":"",
		"lic":""
	},
	{
		"id":127,
		"name":"titleLayer",
		"menuItemId":2,
		"viewTimes":12202,
		"downloadTimes":5233,
		"updateTime":"2015-09-09",
		"description":"http://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.png",
		"image":"http://localhost:8000/img/dataItems/1.png",
		"type":"titleLayer",
		"author":"",
		"lic":""
	},
	{
		"id":128,
		"name":"imageLayer",
		"menuItemId":2,
		"viewTimes":12202,
		"downloadTimes":5233,
		"updateTime":"2015-09-09",
		"description":"http://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.pnghttp://localhost:8000/img/dataItems/1.png",
		"image":"http://localhost:8000/img/dataItems/1.png",
		"type":"imageLayer",
		"author":"",
		"lic":""
	}
]

// 根据数据项id获取该详细数据
// 
url: ..../dataItemList/{id};

method: GET;
result: 对象

返回参数详解：
dataInfo:数据详细信息，对象{}
dataGrid:数据信息表 数组[]
dataImage:图集 数组[]

sample:	
{
	"id":2,
    "type":"arcgisFeatureLayer",
    "name":"arcgisFeatureLayer",
	"stationId":"xbt3",//站点
	"author":"海洋二所",
	"date":"2007-11-1",//数据创建时间
	"monitor":"ADCP",//数据采集器
	"dataSetId":123,//数据项id
    "viewTimes":12202,
    "downloadTimes":5233,
    "updateTime":"2015-09-09",
    "description":"其地理坐标为南纬69度 22分24秒、东经76度22分40秒其地理坐标为南纬69度 22分24秒、东经76度22分40秒其地理坐标为南纬69度 22分24秒、东经76度22分40秒其地理坐标为南纬69度 22分24秒、东经76度22分40秒",
    "image":"http://localhost:8000/img/dataItems/1.png",
    "downloadUrl":"",
    "lic":""
}


// 根据数据项id获取数据表
// 
url: ..../dataItemList/{id}/grid?size=&start=;

sample:
[
    {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
    {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
    {"站点": "泰山站", "温度": 27, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
    {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44}
]

// 根据数据项id获取图集
// 
url: ..../dataItemList/{id}/images?size=&start=;

sample:
[
    {
        "src":"img/imgs/1.jpg",
        "discription":"这是描述这是描述这是描述这是描述这这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
        "position":[
        	{lat:"",lot:""}
    	]
    },
    {
        "src":"img/imgs/10.jpg",
        "discription":"这是描述这是描述这是描述这是描述这是述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
        "position":[
        	{lat:"",lot:""}
    	]
    }
]




//
//缩略图：img
 "img/imgs/1.jpg"

//
//
//



//大图：img
 "img/imgs/hd/1.jpg"








// 根据数据项id获取arcgis图层信息
// 
url: ..../arcgisLayer/{id}; 
method: GET;
result: 对象

返回参数详解：
type:"GIS", 
subType: ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, ArcGISImageServiceLayer, FeatureLayer
url:
fields:字段


sample:
{
  "id":"2",
  "type":"GIS",
  "subType":"ArcGISDynamicMapServiceLayer",
  "url":"http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Petroleum/KGS_OilGasFields_Kansas/MapServer",
  "popupTemplate":"id:{{id}} /br name:{{name}}"
}



// 全局搜索
// 
url: ..../globalSearch?keyword=12e1e;
method: GET;
result: 数组

与
// 根据树形菜单id获取该数据分类的所有数据项目
相同
