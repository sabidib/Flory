/**
 * @author sabidib
 */

Flory.Entity = function(){
	this.id = Flory.Entity.entityIDCount++;
	this.name = '';
}

Flory.Entity.prototype = {
	update : function(data){
		return undefined;
	}
}


Flory.Entity.entityIDCount = 0;


