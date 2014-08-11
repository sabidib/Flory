/**
 * @author sabidib
 */

/** @constructor */
Flory.Environment = function(){
	this.entities = [];
}


Flory.Environment.prototype = {

	constuctor : Flory.Environment,

	add : function(entity){
		if(this.id == entity.id ){
			console.log("Flory: Can't add an entity to itself.");
		} else {
			for(var i = 0, len = this.entities.length; i  < len ; i++){
				if(this.entities[i].id === entity.id){
					console.log("Flory : Can't add an entity twice to the same enviroment.");
					return undefined;
				}
			}
			this.entities.push(entity);	
		}
		return this;
	},
	update : function(data){

	}
}




