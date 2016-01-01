/**
 * @author sabidib http://github.com/sabidib
*/

Flory._random = new Flory.RandomGen();


/**
 * Provides various utility functions for demos.
 */




/**
 * Function
 * Returns a random number (0,1).
 * @return {[Float]} a random number (0,1)
 */
Flory.rand = Flory._random.random;


/**
 * Provides a Flory.Vector object with the dimension equal
 * to the number of defined parameters.
 * 
 * The returned vector is always has components with ranges [-max , +max]
 * @param  {[Float]} max_x 
 * @param  {[Float]} max_y 
 * @param  {[Float]} max_z 
 * @return {[Flory.Vector]}    
 */
Flory.getRandomVector = function(max_x,max_y,max_z){

	var x = Flory._random.random()*max_x*(0.5 - random.random());
	var y = Flory._random.random()*max_y*(0.5 - random.random());
	var z = Flory._random.random()*max_z*(0.5 - random.random());

	if(isNaN(x)){
		return new Flory.Vector([]);
	} else if(isNaN(y)){
		return new Flory.Vector([x]);
	} else if(isNaN(z)){
		return new Flory.Vector([x,y]);
	} else {
		return new Flory.Vector([x,y,z]);
	}

}

/**
 * Given an array of monomers, the function will return
 * a Flory.Monomer object in the same dimension as the max dimensions given
 * that does not overlap with another monomer based on the radius of the monomers.
 * @param  {[Flory.Monomer*]} monomersGiven     [An array of monomer to be checked for overlaps.]
 * @param  {[Float]} radius             		[The radius of the new monomer to be created.]
 * @param  {[Float]} mass 						[The mass of the monomer]
 * @param  {[Float]} charge 					[The charge of the monomer]
 * @param  {[Float]} min_distance_apart 		[The minimum distance between surface of monomers.]
 * @param  {[Float]} max_x_dim          		[]
 * @param  {[Float]} max_y_dim          		[]
 * @param  {[Float]} max_z_dim          		[]
 * @return {[Flory.Monomer]}                    []
 */
Flory.getNonOverlappingMonomer = function(monomersGiven,radius,mass,charge,min_distance_apart,max_x_dim,max_y_dim,max_z_dim){
	var vec = {};
	var count = 0;
	while(count < 1000000){
		var position_overlaps = false;
		var vec = Flory.getRandomVector(max_x_dim,max_y_dim,max_z_dim);
		for(var j = 0; j < monomersGiven.length;j++){
			var total_min_distance_apart = (radius+monomersGiven[j].radius+min_distance_apart)*(radius+monomersGiven[j].radius+min_distance_apart);
			if(monomersGiven[j].position.distanceToSq(vec) <= total_min_distance_apart){
				position_overlaps = true;
				break;
			}
		}
		if(!position_overlaps){
			break;
		}
		//If count goes over 1million there probably is not enough room....
		count++;
	}
	if(count > (1000000-5) ){
		console.log("Flory: can't place a monomer that does not overlap with another. Tried 1 million times...")
		return undefined;
	}
	return new Flory.Monomer({"radius" : radius , "charge" : charge , "mass" : mass ,"position" : vec});
}


Flory.generateGUID = function() {
  
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }

  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  
  
}
