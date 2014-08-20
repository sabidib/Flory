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
		radius_of_monomers : 5,
		mass_of_monomers : 1,
		min_starting_distance_apart : 3,
		starting_max_x : 50,
		starting_max_y : 50,
		starting_max_z : 50,
		sigma : Math.pow(0.5,(1.0/6.0)),
		epsilon : 1
	}
}



var exp = settings.experiment;

var number_of_monomers = exp.side_length_of_cube*exp.side_length_of_cube*exp.side_length_of_cube;
var monomers = [];

var lennard = new Flory.LennardJones(exp.epsilon,exp.sigma);




for(var i = 0; i < exp.side_length_of_cube;i++){
	for(var j = 0; j < exp.side_length_of_cube;j++){
		for(var k = 0; k < exp.side_length_of_cube;k++){
			monomers.push(new Flory.Monomer(exp.radius_of_monomers, 0, exp.mass_of_monomers, {position : [i*exp.min_starting_distance_apart,j*exp.min_starting_distance_apart,k*exp.min_starting_distance_apart]}));	
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
