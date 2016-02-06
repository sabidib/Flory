/**
 * @author sabidib http://github.com/sabidib
 */
/**
 * Creates a 2D Monomer
 * @constructor
 * @param {[Float]} radius     [The radius of the Monomer]
 * @param {[Float]} charge     [The charge of the Monomer, default 0]
 * @param {[Float]} mass       [The mass of the Monomer, default 0]
 * @param {[Object]} [kinematics] [An object with propeties : position , velocity, acceleration, force]
 * @param  {String} [name]        [The name of the entity]
 * @param   {Object} [renderableSettings] [An object containing any of the following keys 'segments'(float),
 * 'color'(hex) or 'material'(THREE.mesh). This is completely optional]
 */
/*global Flory,THREE*/
/*jslint white*/

'use strict';
Flory.Monomer2D = function (options) {
    var name = options.name;
    Flory.Particle.call(this, name);
    var radius = options.radius;
    var charge = options.charge;
    var mass = options.mass;
    var kinematics = options.kinematics;
    var renderableSettings = options.renderableSettings;
    var position = options.position;
    var velocity = options.velocity;
    var acceleration = options.acceleration;
    var force = options.force;
    this.dimension = 2;
    if (kinematics !== undefined) {
        position = position === undefined ? kinematics.position : position;
        velocity = velocity === undefined ? kinematics.velocity : velocity;
        acceleration = acceleration === undefined ? kinematics.acceleration : acceleration;
        force = force === undefined ? kinematics.force : force;
    }
    this.radius = radius !== undefined ? radius : Flory.Monomer2D.defaultRadius;
    this.charge = charge !== undefined ? charge : 0;
    this.mass = mass !== undefined ? mass : 0;
    if (position === undefined) {
        this.position = new Flory.Vector2(0, 0);
    } else if (position instanceof Array) {
        this.position = new Flory.Vector2(position[0], position[1]);
    } else if (position.x !== undefined || position.y !== undefined) {
        this.position = new Flory.Vector2(position.x, position.y);
    } else {
        if (!(position instanceof Flory.baseVector)) {
            console.log('Flory: position is not a valid Flory.baseVector .');
            return undefined;
        }
        if (position instanceof Flory.Vector3) {
            this.position = new Flory.Vector2(position.x, position.y);
        } else if (position instanceof Flory.Vector) {
            this.position = new Flory.Vector2(position.components[0], position.components[1]);
        } else {
            this.position = position.clone();
        }
    }
    if (velocity === undefined) {
        this.velocity = new Flory.Vector2(0, 0);
    } else if (velocity instanceof Array) {
        this.velocity = new Flory.Vector2(velocity[0], velocity[1]);
    } else if (velocity.x !== undefined || velocity.y !== undefined) {
        this.velocity = new Flory.Vector2(velocity.x, velocity.y);
    } else {
        if (!(velocity instanceof Flory.baseVector)) {
            console.log('Flory: velocity is not a valid Flory.baseVector .');
            return undefined;
        }
        if (velocity instanceof Flory.Vector3) {
            this.velocity = new Flory.Vector2(velocity.x, velocity.y);
        } else if (velocity instanceof Flory.Vector) {
            this.velocity = new Flory.Vector2(velocity.components[0], velocity.components[1]);
        } else {
            this.velocity = velocity.clone();
        }
    }
    if (acceleration === undefined) {
        this.acceleration = new Flory.Vector2(0, 0);
    } else if (acceleration instanceof Array) {
        this.acceleration = new Flory.Vector2(acceleration[0], acceleration[1]);
    } else if (acceleration.x !== undefined || acceleration.y !== undefined) {
        this.acceleration = new Flory.Vector2(acceleration.x, acceleration.y);
    } else {
        if (!(acceleration instanceof Flory.baseVector)) {
            console.log('Flory: acceleration is not a valid Flory.baseVector .');
            return undefined;
        }
        if (acceleration instanceof Flory.Vector3) {
            this.acceleration = new Flory.Vector2(acceleration.x, acceleration.y);
        } else if (acceleration instanceof Flory.Vector) {
            this.acceleration = new Flory.Vector2(acceleration.components[0], acceleration.components[1]);
        } else {
            this.acceleration = acceleration.clone();
        }
    }
    if (force === undefined) {
        this.force = new Flory.Vector2(0, 0);
    } else if (force instanceof Array) {
        this.force = new Flory.Vector2(force[0], force[1]);
    } else if (force.x !== undefined || force.y !== undefined) {
        this.force = new Flory.Vector2(force.x, force.y);
    } else {
        if (!(force instanceof Flory.baseVector)) {
            console.log('Flory: force is not a valid Flory.baseVector .');
            return undefined;
        }
        if (force instanceof Flory.Vector3) {
            this.force = new Flory.Vector2(force.x, force.y);
        } else if (force instanceof Flory.Vector) {
            this.force = new Flory.Vector2(force.components[0], force.components[1]);
        } else {
            this.force = force.clone();
        }
    }
    this.setDefaultMesh(renderableSettings);
    return this
};
Flory.Monomer2D.prototype = Object.create(Flory.Particle.prototype);
Flory.Monomer2D.prototype.setDefaultMesh = function (settings) {
    var material = {};
    var geometry = {};
    var segments = settings !== undefined && typeof settings.segments === 'number' ? settings.segments : 20;
    var dim = this.position.dimension();
    geometry = new THREE.SphereGeometry(this.radius, segments, segments);
    var color_of_mesh = settings !== undefined && typeof settings.color === 'number' ? settings.color : 16711680;
    if (settings === undefined) {
        material = new THREE.MeshBasicMaterial({ color: color_of_mesh });
    } else if (settings.material !== undefined && settings.material instanceof THREE.Material) {
        material = settings.material;
    } else {
        material = new THREE.MeshBasicMaterial({ color: color_of_mesh });
    }
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(geometry, material);
    return this;
};
Flory.Monomer2D.prototype.incrementX = function (amount) {
    this.position.x += amount;
    return this;
};
Flory.Monomer2D.prototype.incrementY = function (amount) {
    this.position.y += amount;
    return this;
};
Flory.Monomer2D.prototype.distanceTo = function (a) {
    return this.position.distanceTo(a.position);
};
Flory.Monomer2D.prototype.distanceToSq = function (a) {
    return this.position.distanceToSq(a.position);
};
Flory.Monomer2D.prototype.clone = function () {
    return new Flory.Monomer2D(this.radius, this.position);
};
Flory.Monomer2D.defaultRadius = 1;
