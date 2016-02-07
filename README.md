![Build status](https://travis-ci.org/sabidib/Flory.svg)
[Flory](https://http://sabidib.github.io/Flory)
====

[Flory](https://http://sabidib.github.io/Flory) lets both educators and students show simple and beautiful molecular dynamics simulations directly in a browser.

Demo
------------
Checkout the [website](https://http://sabidib.github.io/Flory) or alternatively open your trusty terminal to install try out the demo:
```sh
git clone https://github.com/sabidib/Flory.git
cd Flory
```
Start a local webserver to access the demos, a python webserver will do:
```sh
python -m SimpleHTTPServer 8888
```
Check it out:
```
http://127.0.0.1:8888/demo/
```
=======
To modify the demos open up the `demo/` folder and modify the .js files, then rebuild the app.

##Installation
Download the [minified library](https://raw.githubusercontent.com/sabidib/Flory/master/build/flory.min.js) and include it in your html.
Alternatively, [build it yourself](https://http://sabidib.github.io/Flory).

##  Getting Started
The goal of Flory is to provide a simple framework for designing educational molecular dynamic simulations in browser. At its base, Flory provides an `Flory.Environment` class that defines basic events that occur during a simulation and visualization.

```Javascript
var env = new Flory.Environment()
var monomer = new Flory.Monomer({"radius":1,"charge":0,"mass":1,"position":[0,0,0],"name" : "atom"})
env.add(monomer)
//...
//add more monomers
//...
env.enableVisualization("mycanvas")

var numberOfSteps = 10000
for(var i = 0; i < numberOfSteps;i++){
    //This will update the positions of the particles
    //and render any thing that is renderable that was called with
    //env.add
    env.advance();
}
```
`Flory.Environment` is an empty class that does not define any physical simulations. In order to create you own simulation you need to inherit from `Flory.Environment` and define your own `update()` function. On each call to `Flory.Environment.advance` your subclassed `update()` function is called.  For example, the `Flory.RandomWalk` is implemented as :

``` Javascript
//flory/src/experiments/randomWalk.js
...
...
Flory.RandomWalk.prototype.update = function(additional){
	var len = this.entities.length;
	var entity;
	var number_of_dimensions;
	var dimension_increment;
	var dimension_to_choose;
	var rnum;
	var number_of_steps = 1;

	if(additional.number_of_steps != undefined){
		number_of_steps = additional.number_of_steps;
	}

	for(var k = 0; k < number_of_steps;k++){
		for( var i = 0;i<len;i++){
			entity = this.entities[i];
			if(entity instanceof Flory.Monomer){
				prob_right = 0.5;
				number_of_dimensions = entity.position.dimension();
				dimension_increment = (1.0/number_of_dimensions);
				dimension_to_choose = 0;
                                //Choose the dimension to move in
				rnum = this.randomGen.random();
				rnum -= dimension_increment;
				while(rnum > 0){
					rnum -= dimension_increment;
					dimension_to_choose++;
				}
				//Choose the direction of movement in the dimension
				rnum = this.randomGen.random();
				if(rnum < prob_right){
					entity.position.components[dimension_to_choose]++;
				} else {
					entity.position.components[dimension_to_choose]--;
				}

			}
		}
	}
	return this;
}
...
```
A demo with this example simulation can be found in `flory/demo/randomWalk/randomWalk.js`. Some basic experiments are already subclassed for you such as :

* `Flory.RandomWalk`
* `Float.LennardJones`
* `Flory.Newtonian`
* `Flory.Newtonian2D`

The idea behind an environment is that `Flory.Entities` objects can be added to the scenes.Almost all classes are descendants from `Flory.Entities`. If an object is also a descendant of `Flory.Renderable` ( a descendant of `Flory.Entity`), then it can be rendered by the Environment.

For example, a set of `Flory.Particles`( a descendant of `Flory.Renderable`) particles can be added to a `Flory.Newtonian` environment along with a different `Flory.ContinuousField`. On each call to `Flory.Newtonian.advance()`, the positions of the particles will be updated in accordance with forces applied by the various `Flory.ContinuousField`.





##Build Usage
`usage: grunt [-h] [--include INCLUDE] [--externs EXTERNS [--minify] [--output OUTPUT] [--sourcemaps]`


Optional arguments:
  `-h, --help         Show this help message and exit.`
  `--include INCLUDE`
  `--externs EXTERNS`
  `--amd`
  `--minify`
  `--output OUTPUT`
  `--sourcemaps`

