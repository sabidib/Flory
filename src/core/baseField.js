/**
 * @author sabidib http://github.com/sabidib
 */

Flory.baseField = function(){
	Flory.Entity.call(this);
	this.data['field'] = [];
	this.field = this.data['field'];
};


Flory.baseField.prototype = Object.create(Flory.Entity.prototype);


Flory.baseField.prototype.constructor = Flory.baseField;


//TODO: OPTIMIZE THIS... it is currently O(n)
/**
 * Returns the force at the given position
 * by finding the closest point to the given position and returning
 * the associated vector
 * 
 * @param  {baseVector} position 
 * @return {baseVector}		The force at the given position          
 */
Flory.baseField.prototype.getForce = function(position,data){
	var closest = 0;
	var index_of_closest = 0;
	for( var i = 0, len = this.field.length; i < len ; i++){
		var cur_dist = this.field[i].position.distanceToSq(position);
		if(cur_dist <= closest){
			index_of_closest = i;
			closest = cur_dist;
		}
	}
	return this.field[index_of_closest].vector;
};

Flory.baseField.prototype.scale = function(num){
		for( var i =0, len = this.field.length; i < len; i++){
			this.field.vector.scale(num);
		}
	};