/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/

'use strict';
Flory.Renderable = function () {
    Flory.baseEntity.call(this);
    this.mesh = undefined;
    this.geometry = undefined;
    this.material = undefined;
    this.updateGeometry = true;
};
Flory.Renderable.prototype = Object.create(Flory.baseEntity.prototype);
Flory.Renderable.prototype.constructor = Flory.Renderable;
Flory.Renderable.prototype.destroy = function () {
    if (this.mesh.geometry !== undefined) {
        this.mesh.geometry.dispose();
    }
    if (this.mesh.material !== undefined) {
        this.mesh.material.dispose();
    }
    this.mesh = undefined;
    if (this.geometry !== undefined) {
        this.geometry.dispose();
        this.geometry = undefined;
    }
    if (this.material !== undefined) {
        this.material.dispose();
        this.material = undefined;
    }
};
