/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/

'use strict';
Flory.Newtonian = function (handler) {
    Flory.Environment.call(this, handler);
    this.meshes = [];
};
Flory.Newtonian.prototype = Object.create(Flory.Environment.prototype);
Flory.Newtonian.constructor = Flory.Newtonian;
Flory.Newtonian.prototype.update = function () {
    var len = this.entities.length;
    var i, entity, entity2, tmp, j, k, m, entity_backlog_len;
    var handler_length = this.handlers.length;
    for (i = 0; i < len; i += 1) {
        entity = this.entities[i];
        tmp = new Flory.Vector();
        for (k = 0; k < handler_length; k += 1) {
            tmp.add(this.handlers[k].update(entity));
        }
        var entity_backlog = []
        if (entity instanceof Flory.Particle) {
            for (j = 0; j < len; j += 1) {
                entity2 = this.entities[j];
                if(entity.id != entity2.id){
                    continue;
                }

                entity_backlog_len = entity_backlog.length;
                if (entity2 instanceof Flory.baseField) {
                    if(entity2 instanceof Flory.PairWiseField){
                        for (var m = 0; m < entity_backlog.length; m++) {
                            entity2.getForce(entity.position,entity_backlog);
                        };                            
                        entity_backlog = [];
                    }    
                    tmp.add(entity2.getForce(entity.position));
                } else {
                    entity_backlog.push(entity2);
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
