/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/

'use strict';
Flory.Newtonian = function () {
    Flory.Environment.call(this);
    this.meshes = [];
};
Flory.Newtonian.prototype = Object.create(Flory.Environment.prototype);
Flory.Newtonian.constructor = Flory.Newtonian;
Flory.Newtonian.prototype.update = function () {
    var len = this.entities.length;
    var i, entity, entity2, tmp, j;
    for (i = 0; i < len; i += 1) {
        entity = this.entities[i];
        tmp = new Flory.Vector();
        if (entity instanceof Flory.Particle) {
            for (j = 0; j < len; j += 1) {
                entity2 = this.entities[j];
                if (entity2 instanceof Flory.baseField) {
                    tmp.add(entity2.getForce(entity.position));
                }
            }
            entity.force = tmp.clone();
            entity.acceleration = entity.force.mult(1 / entity.mass);
            entity.velocity.add(entity.acceleration.mult(Flory.timestep));
            entity.position.add(entity.velocity.mult(Flory.timestep * 0.5));
        }
    }
    return this;
};
