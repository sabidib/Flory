

settings = {

	visualization : {
		frames_per_second : 100,	
		ticks_per_frame : 1,
		number_of_steps : 100000000
	},

	experiment : {
		number_of_monomers : 200,
		radius_of_monomers : 1,
		mass_of_monomers : 1,
		charge_of_monomers :0,
		step_size : 1,
		start_at_position : [0,0,0],
		starting_max_x : 50,
		starting_max_y : 50,
		starting_max_z : 50
	},
	options : [
		{
			name : "Time step",
			type : "float",
			value : 1.0,
			editable : true,
   	      	min : 0.1 ,
   	       	max : 10,
   	       	slider : true,
           	has_text_box : true,
           	step : 0.01
		},
		{
			name : "Run Simulation",
			type : "checkbox",
			value : true,
			editable : true,
		},
		{
			name : "",
			type : "button",
			value : "Restart simulation",
			callback : function(){
				location.reload();
			}
		}
	] 
}


var random_walk_options = new Flory.Options(settings,"options");


var random = new Flory.RandomGen();
var calculator = new Flory.DataProcessor();
var monomers = [];
var randomWalk = new Flory.Environment();

randomWalk.addHandler(
{"update" : 
	function(entities){
	var len = entities.length;
	var entity;
	var number_of_dimensions;
	var dimension_increment;
	var dimension_to_choose;
	var rnum;
	var number_of_steps = 1;
	var prob_right = 0.5;

	for(var k = 0; k < number_of_steps;k++){
		for( var i = 0;i<len;i++){
			entity = entities[i];
			if(entity instanceof Flory.Particle){
				number_of_dimensions = entity.position.dimension();
				dimension_increment = (1.0/number_of_dimensions);
				dimension_to_choose = 0;
				//Choose which dimension to move in 
				rnum = random.random();
				rnum -= dimension_increment;
				while(rnum > 0){
					rnum -= dimension_increment;
					dimension_to_choose++;
				}
				//Choose the direction of movement in the dimension
				rnum = random.random();
				if(rnum < prob_right){
					entity.position.components[dimension_to_choose]++;
				} else {
					entity.position.components[dimension_to_choose]--;
				} 

			}
		}
	}
}


});


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

		monomers.push(new Flory.Monomer(
		{
			"radius":exp.radius_of_monomers,
			"charge":exp.charge_of_monomers,
			"mass":exp.mass_of_monomers,
			"kinematics":{"position" : pos }
		}
		) );
	}

	randomWalk.add(monomers[i]);
}


randomWalk.enableVisualization("mycanvas",{segments : 20, color : 0x00FF00});

var k = 0;
var fps = 0;
var msd = 0;
var total_steps = 0;
var viz = settings.visualization;



var displays = 
{
	display :
	[
		{
			name : "MSD",
			label : "Mean^2 Displacement",
			value : function(){
				return calculator.meanSquareMonomerDisplacement(monomers);
			}
		},
		{
			name : "timesteps",
			label : "Timestepping",
			value : function(){
				return total_steps;
			}
		},
		{
			name : "MD",
			label : "Mean Displacement",
			value : function(){
				return calculator.meanMonomerDisplacement(monomers);
			}
		},
		{
			name : "MP",
			label : "Mean Position",
			value : function(){
				return calculator.meanMonomerPosition(monomers);
			}
		},
		{
			name : "FPS",
			label : "fps",
			value : function(){
				return fps;
			}
		}
	]
}


var random_walk_display = new Flory.Display(displays,"stats")




var m = setInterval(
	function(){

		random_walk_display.updateValues();

		if(random_walk_options.getValue("Run Simulation")){
			randomWalk.advance({
				 "number_of_steps" : random_walk_options.getValue("Time step")
				});
			total_steps++;
			k++;

		} else {
			randomWalk.render();
		}

	}
	,
	1000/viz.frames_per_second);


setInterval(function(){fps = k;k=0;},1000);
