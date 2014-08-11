/**
 * @author sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @constructor
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field2D = function(data){
	Flory.Entity.call(this);

	this.data = [];
	for( var i = 0, len = data.length; i < len;i++){
		this.data[i] = {}

		if(data[i].position == undefined){
			this.data[i].position = new Flory.Vector2(data[i][0][0],data[i][0][1]); 		
		} else if(data[i].position instanceof Array){
			this.data[i].position = new Flory.Vector2(data[i].position[0] , data[i].position[1]);
		} else if(data[i].position.x != undefined && data[i].position.y != undefined){
			this.data[i].position = data[i].position.clone();
		}

		if(data[i].vector == undefined){
			this.data[i].vector = new Flory.Vector2(data[i][1][0],data[i][1][1]); 		
		} else if(data[i].vector instanceof Array){
			this.data[i].vector = new Flory.Vector2(data[i].vector[0] , data[i].vector[1]);
		} else if(data[i].vector.x != undefined && data[i].vector.y != undefined){
			this.data[i].vector = data[i].vector.clone();
		}

	}
};


Flory.Field2D.prototype = Object.create(Flory.Entity.prototype);


Flory.Field2D.prototype.constructor = Flory.Field2D;


	//TODO: OPTIMIZE THIS... it is currently O(n)
	/**
	 * Returns the force at the given position
	 * by finding the closest point to the given position and returning
	 * the associated vector
	 * 
	 * @param  {Vector2} position 
	 * @return {Vector2}		The force at the given position          
	 */
Flory.Field2D.prototype.getForce = function(position,data){
		var closest = 0;
		var index_of_closest = 0;
		for( var i = 0, len = this.data.length; i < len ; i++){
			var cur_dist = this.data[i].position.distanceToSq(position);
			if(cur_dist <= closest){
				index_of_closest = i;
				closest = cur_dist;
			}
		}
		return this.data[index_of_closest].vector;
	};


/**
 * Combines @field with the object. This is done by merging the
 * data and summing the vectors at points in common.
 * @param  {Field2D} field 
 * @return {this}
 */
Flory.Field2D.prototype.combine = function(field){
	





}


Flory.Field2D.prototype.scale = function(num){
		for( var i =0, len = this.data.length; i < len; i++){
			this.data[i].vector.scale(num);
		}
	};

Flory.Field2D.prototype.clone = function(){
		return new Flory.Field2D(this.data);
	}