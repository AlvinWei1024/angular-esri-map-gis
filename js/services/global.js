angular.module('global',[]).service('_global', ['$q', function($q){
	var content=this;
	this.dataResultItem=[];
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