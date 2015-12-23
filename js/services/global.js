angular.module('global',[]).service('_global', ['$q', function($q){
	var content=this;
	var http_server="http://localhost:3000/";
	this.http_server=http_server;
	this.dataResultItem=[];
	this.itemShowState=[];
	var ArcGISType=["arcgislayer","arcgistilelayer","arcgisdynamiclayer","arcgisfeaturelayer"];
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