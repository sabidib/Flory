


settings = {
	visualization : {
		frames_per_second : 60,
		ticks_per_frame : 100
	},
	experiment : {
		number_of_monomers : 1000,
		radius_of_monomers : 1,
		mass_of_monomers : 1,
		charge_of_monomers :0,
		step_size : 1,
		start_at_position : [0,0,0],
		starting_max_x : 50,
		starting_max_y : 50,
		starting_max_z : 50
	}
}

var random = new Flory.RandomGen();
var monomers = [];
var randomWalk = new Flory.RandomWalk(1);


var exp = settings.experiment;

for(var i = 0; i < exp.number_of_monomers;i++){
	if(exp.start_at_position == undefined){
		monomers.push(
				getNonOverlappingMonomer(monomers,
										exp.radius_of_monomers,
										exp.mass_of_monomers,
										exp.charge_of_monomers,
										exp.min_starting_distance_apart,
										exp.starting_max_x,
										exp.starting_max_y,
										exp.starting_max_z)
				);

	} else {
		
		var pos = new Flory.Vector(exp.start_at_position);

		monomers.push(new Flory.Monomer(exp.radius_of_monomers,exp.charge_of_monomers,exp.mass_of_monomers,{position : pos }) );
	}

	randomWalk.add(monomers[i]);
}


randomWalk.enableVisualization({segments : 20, color : 0x00FF00});

var k = 0;
var fps = 0;
var viz = settings.visualization;
setInterval(function(){randomWalk.update({ "number_of_steps" : viz.ticks_per_frame});k++},1000/viz.frames_per_second);
setInterval(function(){fps = k;k=0;},1000);
