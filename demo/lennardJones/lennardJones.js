/**
 * @author sabidib
 */

/**
 * A demo for experiment/lennardJones.js .
 * 
 * Generates a cube made of monomers with a given side length.
 * 
 * The interaction between the monomers is given by the lennard jones potential
 * and its parameters \sigma and \epsilon.
 * 
 */



var random = new Flory.RandomGen();

settings = {
	visualization : {
		frames_per_second : 60,
		ticks_per_frame : 1
	},
	experiment : {
		side_length_of_cube : 6,
		hollow : false,
		radius_of_monomers : 5,
		min_starting_distance_apart : 2,
		starting_max_x : 50,
		starting_max_y : 50,
		starting_max_z : 50,
		sigma : Math.pow(0.5,(1.0/6.0)),
		epsilon : 1
	}
}

var number_of_monomers = side_length_of_cube*side_length_of_cube*side_length_of_cube;
var monomers = [];

var lennard = new Flory.LennardJones(settings.experiment.epsilon,settings.experiment.sigma);




for(var i = 0; i < side_length_of_cube;i++){
	for(var j = 0; j < side_length_of_cube;j++){
		for(var k = 0; k < side_length_of_cube;k++){
			monomers.push(new Flory.Monomer(radius, 0, 1, {position : [i*min_starting_distance_apart,j*min_starting_distance_apart,k*min_starting_distance_apart]}));	
		}
	}		
}


for(var i = 0; i < number_of_monomers;i++){
	lennard.add(monomers[i]);	
}



lennard.enableVisualization();

var k = 0;
var fps = 0;
setInterval(function(){lennard.update();k++},0);
setInterval(function(){fps = k;k=0;},1000);
