/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/

'use strict';
Flory.Newtonian2D = function () {
    Flory.Environment.call(this);
};
Flory.Newtonian2D.prototype = Object.create(Flory.Environment.prototype);
Flory.Newtonian2D.constructor = Flory.Newtonian2D;
Flory.Newtonian2D.prototype.update = function () {
    var i, j, entity, tmp, entity2, field;
    var len = this.entities.length;
    for (i = 0; i < len; i += 1) {
        entity = this.entities[i];
        tmp = new Flory.Vector2();
        if (entity instanceof Flory.Monomer2D) {
            for (j = 0; j < len; j += 1) {
                entity2 = this.entities[j];
                if (entity2 instanceof Flory.Field2D) {
                    field = entity2;
                    tmp.add(field.getForce(entity.position));
                }
            }
            entity.force = tmp.clone();
        }
    }
    for (i = 0; i < len; i += 1) {
        entity = this.entities[i];
        if (entity instanceof Flory.Monomer2D) {
            entity.acceleration = entity.force.mult(1 / entity.mass);
            entity.velocity.add(entity.acceleration.mult(Flory.timestep));
            entity.position.add(entity.velocity.mult(Flory.timestep * 0.5));
            if (this.visualization) {
                this.renderer.updateRenderablePosition(this.entities[i]);
            }
        }
    }
    if (this.visualization) {
        this.renderer.render();
    }
    return this;
};
