/**
 * @author sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field = function(data){
	Flory.Entity.call(this);
	this.data = [];
	for( var i = 0, len = data.length; i < len;i++){
		this.data[i] = {}

		if(data[i].position == undefined){
			this.data[i].position = new Flory.Vector(data[i][0]); 		
		} else if(data[i].position instanceof Array){
			this.data[i].position = new Flory.Vector(data[i].position);
		} else if(data[i].position.components != undefined){
			this.data[i].position = data[i].position.clone();
		}



		if(data[i].vector == undefined){
			this.data[i].vector = new Flory.Vector(data[i][1]); 		
		} else if(data[i].vector instanceof Array){
			this.data[i].vector = new Flory.Vector(data[i].vector);
		} else if(data[i].vector.components != undefined){
			this.data[i].vector = data[i].vector.clone();
		}


	}
};

Flory.Field.prototype = Object.create(Flory.Entity.prototype);


Flory.Field.prototype.constructor = Flory.Field;

	//TODO: OPTIMIZE THIS... it is currently O(n)
	/**
	 * Returns the force at the given position
	 * by finding the closest point to the given position and returning
	 * the associated vector
	 * 
	 * @param  {Vector} position 
	 * @param  {Object} data  General data to be passed and used by sub classes.
	 * @return {Vector}		The force at the given position          
	 */

Flory.Field.prototype.getForce = function(position,data){
		var closest = Infinity;
		var index_of_closest = 0;
		for( var i = 0, len = this.data.length; i < len ; i++){
			var cur_dist = this.data[i].position.distanceToSq(position);
			if(cur_dist <= closest ){
				index_of_closest = i;
				closest = cur_dist;
			}
		}
		return this.data[index_of_closest].vector;
	};

/**
 * Combines @field with the object. This is done by merging the
 * data and summing the vectors at points in common.
 * @param  {Field} field 
 * @return {this}
 */
Flory.Field.prototype.combine = function(field){






}

Flory.Field.prototype.scale = function(num){
		for( var i =0, len = this.data.length; i < len; i++){
			this.data[i].vector.scale(num);
		}
	};

Flory.Field.prototype.clone = function(){
		return new Flory.Field(this.data);
	}
