/**
* @author sabidib http://github.com/sabidib
*/
/** @constructor */
/*global Flory*/

'use strict';
Flory.Environment = function (handler) {
    Flory.CoreEnvironment.call(this);
    if (handler !== undefined) {
        this.addHandler(handler);
    }
};
Flory.Environment.prototype = Object.create(Flory.CoreEnvironment.prototype);
Flory.Environment.prototype.constructor = Flory.Environment;
Flory.Environment.prototype.addHandler = function (handler) {
    if (handler !== undefined) {
        this.handlers.push(handler);
    }
};
Flory.Environment.prototype.removedEntity = function (entity, id, index) {
    if (this.visualization && entity instanceof Flory.Renderable) {
        this.renderer.removeRenderable(id);
    }
    return this;
};
Flory.Environment.prototype.addedEntity = function (entity) {
    if (this.visualization && entity instanceof Flory.Renderable) {
        this.renderer.addRenderable(entity);
    }
    return this;
};
Flory.Environment.prototype.update = function (data) {
    var i;
    var len = this.handlers.length;
    for (i = 0; i < len; i += 1) {
        this.handlers[i].update(this.entities, data);
    }
};
Flory.Environment.prototype.setUpVisualization = function (data) {
    this.data.visualization_data = data;
    var i;
    var len = this.entities.length;
    for (i = 0; i < len; i += 1) {
        if (this.entities[i] instanceof Flory.Renderable) {
            this.renderer.addRenderable(this.entities[i]);
        }
    }
};
Flory.Environment.prototype.disabledVisualization = function () {
    var i;
    var len = this.entities.length;
    for (i = 0; i < len; i += 1) {
        if (this.entities[i] instanceof Flory.Renderable) {
            this.renderer.removeRenderable(this.entity[i]);
        }
    }
    this.data.visualization_data = undefined;
    delete this.data.visualization_data;
};
Flory.Environment.prototype.resetEnvironment = function () {
};
