
settings = {
	visualization : {
		frames_per_second : 60,
		ticks_per_frame : 1
	},
	experiment : {
		number_of_monomers : 100,
		radius_of_monomers : 0.1,
		mass_of_monomers : 1,
		charge_of_monomers :0,
		min_starting_distance_apart : 3,
		starting_max_x : 1000,
		starting_max_y : 1000,
		starting_max_z : 1000,
		field : [
				{position: [0,0] , vector : [0,1]}
			]
	}
}


var random = new Flory.RandomGen();

var monomers = [];


var exp  = settings.experiment;

var newton = new Flory.Newtonian();
var field = new Flory.Field(exp.field);

for(var i = 0; i < exp.number_of_monomers;i++){
	monomers.push(
			Flory.getNonOverlappingMonomer(monomers,
									exp.radius_of_monomers,
									exp.mass_of_monomers,
									exp.charge_of_monomers,
									exp.min_starting_distance_apart,
									exp.starting_max_x,
									exp.starting_max_y,
									exp.starting_max_z)
			);
	newton.add(monomers[i]);
}

newton.add(field);


newton.enableVisualization();

var k = 0;
var fps = 0;
setInterval(function(){newton.update();k++},0);
setInterval(function(){fps = k;k=0;},1000);
