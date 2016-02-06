/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/

'use strict';
Flory.Newtonian2D = function (handler) {
    Flory.Environment.call(this,handler);
    this.meshes = [];
    this.field_entities = [];
    this.pairwise_field_entities = [];
    this.particle_entities = [];

};
Flory.Newtonian2D.prototype = Object.create(Flory.Environment.prototype);
Flory.Newtonian2D.constructor = Flory.Newtonian2D;

Flory.Newtonian2D.prototype.addedEntity = function (entity) {
    if (entity instanceof Flory.Particle) {
        this.particle_entities.push(entity);
    } else if (entity instanceof Flory.PairWiseField) {
        this.pairwise_field_entities.push(entity);
    } else if (entity instanceof Flory.baseField) {
        this.field_entities.push(entity);
    }
};

Flory.Newtonian2D.prototype.update = function () {
    var particles_length = this.particle_entities.length;
    var field_length = this.field_entities.length;
    var pairwise_length = this.pairwise_field_entities.length;
    var i, tmp, j, k, m, n;
    var handler_length = this.handlers.length;
    var particle;

    for (i = 0; i < particles_length; i += 1) {
        particle = this.particle_entities[i];
        tmp = new Flory.Vector2();
        for (k = 0; k < handler_length; k += 1) {
            tmp.add(this.handlers[k].update(particle));
        }
        for (m = 0; m < particles_length; m += 1) {
            for (j = 0; j < pairwise_length; j += 1) {
                if(i == m){
                    continue;
                }
                tmp.add(this.pairwise_field_entities[j].getForce(particle,this.particle_entities[m]))
            };  
        };          
        for (n = 0; n < field_length; n += 1) {
            tmp.add(this.field_entities[n].getForce(particle));
        };
        particle.force = tmp.clone();
    };


    for (i = 0; i < particles_length; i += 1) {
        particle = this.particle_entities[i];
        particle.acceleration = particle.force.mult(1 / particle.mass);
        particle.velocity.add(particle.acceleration.mult(Flory.timestep));
        particle.position.add(particle.velocity.mult(Flory.timestep * 0.5));
    };
    return this;
};
