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



var number_of_monomers = 500;
var spread = 0.5;
var radius = 0.5;
var random = new Flory.RandomGen();

var max_x = 50;
var max_y = 50;
var max_z = 50;


var frames_per_second = 60;
var ticks_per_frame = 1;

var monomers = [];


var newton = new Flory.Newtonian();
var field = new Flory.Field([  { position : [0,0] , vector : [0,1] } ]);

function getNonOverlappingMonomer(monomersGiven){
	var vec = getRandomVector(max_z,max_y,max_z);
	for(var j = 0; j < monomersGiven.length;j++){
		if(monomersGiven[j].position.distanceToSq(vec) <= (radius*radius+4)){
			getNonOverlappingMonomer(monomersGiven);
		}
	}
	return new Flory.Monomer(radius, 0, 1, {position : vec});
}

for(var i = 0; i < number_of_monomers;i++){
	monomers.push(getNonOverlappingMonomer(monomers));
	newton.add(monomers[i]);
}

newton.add(field);


newton.enableVisualization();

var k = 0;
var fps = 0;
setInterval(function(){newton.update();k++},0);
setInterval(function(){fps = k;k=0;},1000);
