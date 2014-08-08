/**
 * @author sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field3D = function(data){
	Flory.Entity.call(this);
	
	this.data = [];
	for( var i = 0 ,len = data.length; i < len;i++){
		this.data[i] = {}

		if(data[i].position == undefined){
			this.data[i].position = new Flory.Vector3(data[i][0][0],data[i][0][1],data[i][0][2]); 		
		} else if(data[i].position instanceof Array){
			this.data[i].position = new Flory.Vector3(data[i].position[0] , data[i].position[1],data[i].position[2]);
		} else if(data[i].position.x != undefined && data[i].position.y != undefined && data[i].position.z != undefined){
			this.data[i].position = data[i].position.clone();
		}

		if(data[i].vector == undefined){
			this.data[i].vector = new Flory.Vector3(data[i][1][0],data[i][1][1],data[i][1][2]); 		
		} else if(data[i].vector instanceof Array){
			this.data[i].vector = new Flory.Vector3(data[i].vector[0] , data[i].vector[1],data[i].vector[2]);
		} else if(data[i].vector.x != undefined && data[i].vector.y != undefined && data[i].postiion.z != undefined){
			this.data[i].vector = data[i].vector.clone();
		}

	}
};


Flory.Field3D.prototype = Object.create(Flory.Entity.prototype);

Flory.Field3D.prototype.constructor = Flory.Field3D;


	//TODO: OPTIMIZE THIS... it is currently O(n)
	/**
	 * Returns the force at the given position
	 * by finding the closest point to the given position and returning
	 * the associated vector
	 * 
	 * @param  {Vector3} position 
	 * @return {Vector3}		The force at the given position          
	 */
Flory.Field3D.prototype.getForce = function(position,data){
		var closest = 0;
		var index_of_closest = 0;
		for( var i = 0, len = this.data.length; i < len ; i++){
			var cur_dist = this.data[i].position.distanceToSq(position);
			if(cur_dist < closest){
				index_of_closest = i;
				closest = cur_dist;
			}
		}
		return this.data[index_of_closest].vector;
	};


Flory.Field3D.prototype.scale = function(num){
		for( var i =0, len = this.data.length; i < len; i++){
			this.data[i].vector.scale(num);
		}
	};

Flory.Field3D.prototype.clone = function(){
		return new Flory.Field3D(this.data);
	};
