/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory,THREE*/

'use strict';
Flory.PointCloudRenderer = function (canvas, data) {
    Flory.Renderer.call(this, canvas, data);
    this.data.particles = new THREE.Geometry();
    this.data.pMaterial = new THREE.PointCloudMaterial({
        color: 16711680,
        size: 2
    });
    this.data.particle_system = new THREE.PointCloud(this.data.particles, this.data.pMaterial);
};
Flory.PointCloudRenderer.prototype = Object.create(Flory.Renderer.prototype);
Flory.PointCloudRenderer.prototype.updatePointPositions = function (entities) {
    if (entities !== undefined) {
        var i;
        var len = entities.length;
        for (i = 0; i < len; i += 1) {
            this.data.particles.vertices[i] = new THREE.Vector3(entities[i].position.components[0], entities[i].position.components[1], entities[i].position.components[2]);
        }
        this.data.particle_system.geometry.verticesNeedUpdate = true;
    }
    return this;
};
Flory.PointCloudRenderer.prototype.updatePointList = function (entities) {
    if (entities === undefined) {
        return this;
    }
    this.data.particles = new THREE.Geometry();
    this.data.pMaterial = new THREE.PointCloudMaterial({
        color: 16711680,
        size: 2
    });
    var i;
    var len = entities.length;
    for (i = 0; i < len; i += 1) {
        if (entities[i] instanceof Flory.Monomer) {
            this.data.particles.vertices.push(new THREE.Vector3(entities[i].position.components[0], entities[i].position.components[1], entities[i].position.components[2]));
        }
    }
    this.scene.remove(this.data.particle_system);
    var keys = Object.keys(this.renderables);
    var l = keys.length;
    for (i = 0; i < l; i += 1) {
        if (this.renderables[keys[i]].id === this.data.particle_system.id) {
            this.renderables[keys[i]] = undefined;
            delete this.renderables[keys[i]];
            break;
        }
    }
    this.data.particle_system = new THREE.PointCloud(this.data.particles, this.data.pMaterial);
    this.scene.add(this.data.particle_system);
    this.renderables[this.data.particle_system.id] = this.data.particle_system;
    return this;
};
