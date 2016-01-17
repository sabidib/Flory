/**
 * @author sabidib http://github.com/sabidib
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
/*global Flory*/
(function () {
    'use strict';
    var settings = {
        visualization: {
            frames_per_second: 60,
            ticks_per_frame: 1
        },
        experiment: {
            side_length_of_cube: 3,
            radius_of_monomers: 1,
            mass_of_monomers: 1,
            min_starting_distance_apart: 1,
            starting_max_x: 50,
            starting_max_y: 50,
            starting_max_z: 50,
            sigma: Math.pow(0.5, 1 / 6),
            epsilon: 1
        }
    };
    var exp = settings.experiment;
    var number_of_monomers = exp.side_length_of_cube * exp.side_length_of_cube * exp.side_length_of_cube;
    var monomers = [];
    var lennard = new Flory.LennardJones(exp.epsilon, exp.sigma);
    var i, j, k;
    var sideLen = exp.side_length_of_cube;
    for (i = 0; i < sideLen; i += 1) {
        for (j = 0; j < sideLen; j += 1) {
            for (k = 0; k < sideLen; k += 1) {
                monomers.push(new Flory.Monomer({
                    radius: exp.radius_of_monomers,
                    charge: 0,
                    mass: exp.mass_of_monomers,
                    kinematics: {
                        position: [
                            i * exp.min_starting_distance_apart,
                            j * exp.min_starting_distance_apart,
                            k * exp.min_starting_distance_apart
                        ]
                    }
                }));
            }
        }
    }
    for (i = 0; i < number_of_monomers; i += 1) {
        lennard.add(monomers[i]);
    }
    lennard.enableVisualization('mycanvas');
    var fps = 0;

    setInterval(function () {
        lennard.advance();
        k += 1;
    }, 0);
    setInterval(function () {
        fps = k;
        console.log(fps);
        k = 0;
    }, 1000);
}());