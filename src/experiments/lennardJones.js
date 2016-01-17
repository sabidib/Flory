/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/
/*jslint white*/

'use strict';
Flory.LennardJones = function (epsilon, sigma) {
    Flory.Environment.call(this);
    this.epsilon = epsilon !== undefined ? epsilon : Flory.LennardJones.default_epsilon;
    this.sigma = sigma !== undefined ? sigma : Flory.LennardJones.default_sigma;
    this.data.rendererType = Flory.Environment.RendererType.PointCloud;
};
Flory.LennardJones.prototype = Object.create(Flory.Environment.prototype);
Flory.LennardJones.prototype.constructor = Flory.LennardJones;
Flory.LennardJones.prototype.addedEntity = function (entity) {
    if (entity instanceof Flory.Monomer) {
        entity.data.last_position = entity.position.clone();
        if (this.visualization) {
            this.renderer.updatePointList(this.entities);
        }
    }
};
Flory.LennardJones.prototype.setUpVisualization = function () {
    this.renderer.updatePointList(this.entities);
};
Flory.LennardJones.prototype.update = function () {
    var len = this.entities.length;
    var i, entity, j, entity2, r_mag, r, sigma_over_r, force;
    for (i = 0; i < len; i += 1) {
        entity = this.entities[i];
        entity.force.zero();
        if (entity instanceof Flory.Monomer) {
            for (j = 0; j < i; j += 1) {
                entity2 = this.entities[j];
                if (entity2 instanceof Flory.Monomer) {
                    r = entity2.position.clone().sub(entity.position);
                    r_mag = r.length();
                    if (r_mag < Flory.LennardJones.far_cutoff_distance) {
                        sigma_over_r = this.sigma / r_mag;
                        force = r.scale(-24 * this.epsilon / (r_mag * r_mag) * (2 * Math.pow(sigma_over_r, 12) - Math.pow(sigma_over_r, 6)));
                        entity.force.add(force);
                        entity2.force.add(force.negate());
                    }
                }
            }
        }
    }
    for (i = 0; i < len; i += 1) {
        entity = this.entities[i];
        if (entity instanceof Flory.Monomer) {
            entity.acceleration = entity.force.mult(1 / entity.mass);
            entity.velocity.add(entity.acceleration.mult(Flory.timestep));
            entity.position.add(entity.velocity.mult(Flory.timestep * 0.5));
        }
    }
    if (this.visualization) {
        this.renderer.updatePointPositions(this.entities);
        this.renderer.render();
    }
    return this;
};
Flory.LennardJones.far_cutoff_distance = 100;
Flory.LennardJones.default_sigma = 1;
Flory.LennardJones.default_epsilon = 1;
