/**
 * @author sabidib http://github.com/sabidib
 */
/**
 * A demo for experiment/newtonian.js .
 */
/*global Flory*/
/*jslint white*/
(function () {
    'use strict';
    var outer_radius = 50;
    var settings = {
        visualization: {
            frames_per_second: 100,
            ticks_per_frame: 1
        },
        experiment: {
            number_of_monomers: 10,
            radius_of_monomers: 0.2,
            mass_of_monomers: 1,
            charge_of_monomers: 0,
            min_starting_distance_apart: 1,
            starting_point: [
                outer_radius,
                0,
                0
            ],
            outer_radius_of_toroid: outer_radius,
            inner_radius_of_toroid: 10
        }
    };
    var random = new Flory.RandomGen();
    var exp = settings.experiment;
    var newton = new Flory.Newtonian();
    // var field = new Flory.Field(exp.field);
    var fuzzyNess = 5;
    var i = 0;
    var number_of_monomers = exp.number_of_monomers;
    var fuzzZ;
    var fuzzY;
    var fuzzX;
    for (i = 0; i < number_of_monomers; i += 1) {
        fuzzZ = random.random() * fuzzyNess;
        fuzzY = random.random() * fuzzyNess;
        fuzzX = random.random() * fuzzyNess;
        newton.add(new Flory.Monomer({
            radius: exp.radius,
            mass: 1,
            position: [
                exp.starting_point[0] + fuzzX,
                exp.starting_point[1] + fuzzY,
                exp.starting_point[2] + fuzzZ
            ]
        }));
    }
    var field = new Flory.ContinuousField(function (position) {
        return position.clone().cross(new Flory.Vector3(0, 0, 1)).normalize().mult(2);
    });
    var field2 = new Flory.ContinuousField(function (position) {
        var mult = outer_radius / position.length() - 1;
        if (mult === 0) {
            return new Flory.Vector3(0, 0, 0);
        }
        var currentCenter = new Flory.Vector3(position.components[0] * mult, position.components[1] * mult, -position.components[2]);
        return currentCenter.mult(10);
    });
    newton.add(field);
    newton.add(field2);
    newton.enableVisualization('mycanvas', {
        clearColor: 16777215,
        grid: true,
        axis: true,
        axisSize: 10,
        gridPlane: 'xy',
        gridSize: 100,
        cameraPosition: [
            80,
            80,
            70
        ]
    });
    var k = 0;
    var fps = 0;
    setInterval(function () {
        newton.advance();
        k += 1;
    }, 1000.0/settings.visualization.frames_per_second);
    setInterval(function () {
        fps = k;
        console.log(fps);
        k = 0;
    }, 1000);
}());