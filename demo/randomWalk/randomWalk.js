function getRandomVector(max_x,max_y,max_z){
		var x = random.random()*max_x*(0.5 - random.random());
		var y = random.random()*max_y*(0.5 - random.random());
		if(max_z != undefined){
			var z = random.random()*max_z*(0.5 - random.random());
			return new Flory.Vector([x,y,z]);
		} else {
			return new Flory.Vector([x,y]);			
		}
	}



var number_of_monomers = 1000;
var spread = 0.5;
var radius = 0.5;
var random = new Flory.RandomGen();

var max_x = 50;
var max_y = 50;
var max_z = 50


var frames_per_second = 60;
var ticks_per_frame = 1;

var monomers = [];


var randomWalk = new Flory.RandomWalk(1);

function getNonOverlappingMonomer(monomersGiven){
	return new Flory.Monomer(radius, 0, 1, {position : [0,0,0]});
}

for(var i = 0; i < number_of_monomers;i++){
	monomers.push(getNonOverlappingMonomer(monomers));
	randomWalk.add(monomers[i]);
}


randomWalk.enableVisualization({segments : 20, color : 0x00FF00});

var k = 0;
var fps = 0;
setInterval(function(){randomWalk.update();k++},1000/30);
setInterval(function(){fps = k;k=0;},1000);
