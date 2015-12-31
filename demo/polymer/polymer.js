
var random = new Flory.RandomGen();
var calculator = new Flory.DataProcessor();
var monomers = [];
var polymer = new Flory.Polymer(1,1,1,0.001,Math.pow(0.5,(1.0/6.0))*0.001,2 );


polymer.enableVisualization("mycanvas",{segments : 20, color : 0x00FF00});


var k = 0;
var fps = 0;
var msd = 0;
var total_steps = 0;

monomers = [];
monomers.push(new Flory.Monomer(0.5,0,2,{"position":new Flory.Vector([0,0,0])}))
monomers.push(new Flory.Monomer(0.5,0,2,{"position":new Flory.Vector([0,-2,0])}))
monomers.push(new Flory.Monomer(0.5,0,2,{"position":new Flory.Vector([0,2,0])}))

for ( var i =0; i < monomers.length;i++){
	polymer.add(monomers[i]);
}
polymer.createBondBetweenEntities(monomers[0],monomers[1],2)
polymer.createBondBetweenEntities(monomers[1],monomers[2],2)


var m = setInterval(
	function(){
		console.log("One");
		polymer.update({
			 "number_of_steps" : 1
			});
		polymer.renderer.render();

	}
	,
	1000/60);


setInterval(function(){fps = k;k=0;},1000);
