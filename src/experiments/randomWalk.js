/**
 * @author sabidib
 */


Flory.RandomWalk = function(seed,step_size){
	Flory.Environment.call(this);
	this.randomGen = new Flory.RandomGen(seed);
	this.step_size = (step_size != undefined) ? step_size : 1;
}


Flory.RandomWalk.prototype = Object.create(Flory.Environment.prototype);

Flory.RandomWalk.prototype.constructor = Flory.RandomWalk;

Flory.RandomWalk.prototype.update = function(additional){
	for( var i = 0, len = this.entities.length;i<len;i++){
		var entity = this.entities[i];
		if(entity instanceof Flory.Monomer){
			var number_of_dimensions = entity.position.dimension();
			var dimension_increment = (1.0/number_of_dimensions);
			var dimension_to_choose = 0;
			var rnum = this.randomGen.random();
			rnum -= dimension_increment;
			while(rnum > 0){
				rnum -= dimension_increment;
				dimension_to_choose++;
			}
			//Choose the direction of movement in the dimension
			rnum = this.randomGen.random();
			if(rnum < 0.5){
				entity.position.components[dimension_to_choose]++;
			} else {
				entity.position.components[dimension_to_choose]--;
			} 
		}
	}
	return this;
}

