function getRandomVector(max_x,max_y){
		var x = random.random()*max_x*(0.5 - random.random());
		var y = random.random()*max_y*(0.5 - random.random());
		return  new Flory.Vector([x,y]);
	}



var number_of_monomers = 5;
var spread = 0.5;
var radius = 5;
var random = new Flory.RandomGen();

var max_x = 50;
var max_y = 50;

var frames_per_second = 60;
var ticks_per_frame = 1;

var monomers = [];

var sigma = Math.pow(0.5,(1.0/6.0));
var epsilon  = 1;

var lennard = new Flory.LennardJones(epsilon,sigma);


function getNonOverlappingMonomer(monomersGiven){
	var vec = getRandomVector(100,100);
	for(var j = 0; j < monomersGiven.length;j++){
		if(monomersGiven[j].position.distanceToSq(vec) <= (radius*radius+4)){
			getNonOverlappingMonomer(monomersGiven);
		}
	}
	return new Flory.Monomer(radius, 0, 1, {position : vec});
}



for(var i = 0; i < number_of_monomers;i++){
	for(var j = 0; j < number_of_monomers;j++){
		for(var k = 0; k < number_of_monomers;k++){
			monomers.push(new Flory.Monomer(radius, 0, 1, {position : [i,j,k]}));	
		}
	}		
}

for(var i = 0; i < number_of_monomers*number_of_monomers*number_of_monomers;i++){
	//monomers.push(getNonOverlappingMonomer(monomers));
	lennard.add(monomers[i]);	
}



lennard.enableVisualization();

var k = 0;
var fps = 0;
setInterval(function(){lennard.update();k++},0);
setInterval(function(){fps = k;k=0;},1000);
