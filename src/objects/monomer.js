/**
 * @author sabidib http://github.com/sabidib
 */


/**
 * Creates  an arbitrary dimension Monomer. The dimension is defined by the
 * number of components in kinematics.position.
 * @constructor
 * @param {[Float]} radius     [The radius of the Monomer]
 * @param {[Float]} charge     [The charge of the Monomer, default 0]
 * @param {[Float]} mass       [The mass of the Monomer, default 0]
 * @param {[Object]} kinematics [An object with vector properties : position , velocity, acceleration, force]
 * @param  {String} name        [The name of the entity]
 * @param   {Object} [renderableSettings] [An object containing any of the following keys 'segments'(float), 
 * 'color'(hex) or 'material'(THREE.mesh). This is completely optional]
 */

Flory.Monomer = function(options) {
    var name = options.name;
    if (options.kinematics == undefined && options.position === undefined) {
        console.log("Flory: Flory.Monomer needs at least the position to know what the dimension of the monomer is.");
        return undefined;
    }
    if (options.kinematics !== undefined && options.kinematics.position === undefined) {
        console.log("Flory: Flory.Monomer needs at least the position to know what the dimension of the monomer is.");
        return undefined;
    }

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

    if (kinematics != undefined) {
        position = (position === undefined ? kinematics.position : position);
        velocity = (velocity === undefined ? kinematics.velocity : velocity);
        acceleration = (acceleration === undefined ? kinematics.acceleration : acceleration);
        force = (force === undefined ? kinematics.force : force);
    }

    this.radius = (radius != undefined ? radius : Flory.Monomer.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);
    this.mass = (mass != undefined ? mass : 0);

    if (position.components == undefined && position instanceof Array) {
        this.position = new Flory.Vector(position);
    } else if (position instanceof Flory.baseVector) {
        if (position instanceof Flory.Vector2 || position instanceof Flory.Vector3) {
            this.position = new Flory.Vector(velocity.components);
        } else {
            this.position = position.clone();
        }
    } else {
        console.log("Flory: position is not an array or descendant of Flory.baseVector ")
    }

    if (velocity == undefined) {
        this.velocity = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    } else if (velocity.components == undefined && velocity instanceof Array) {
        this.velocity = new Flory.Vector(velocity);
    } else if (velocity instanceof Flory.baseVector) {
        if (velocity instanceof Flory.Vector2 || velocity instanceof Flory.Vector3) {
            this.velocity = new Flory.Vector(velocity.components);
        } else {
            this.velocity = velocity.clone();
        }
    } else {
        console.log("Flory: velocity is not an array or descendant of Flory.baseVector ")
    }

    if (acceleration == undefined) {
        this.acceleration = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    } else if (acceleration.components == undefined && acceleration instanceof Array) {
        this.acceleration = new Flory.Vector(acceleration);
    } else if (acceleration instanceof Flory.baseVector) {
        if (acceleration instanceof Flory.Vector2 || acceleration instanceof Flory.Vector3) {
            this.acceleration = new Flory.Vector(velocity.components);
        } else {
            this.acceleration = acceleration.clone();
        }
    } else {
        console.log("Flory: acceleration is not an array or descendant of Flory.baseVector ")
    }

    if (force == undefined) {
        this.force = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    } else if (force.components == undefined && force instanceof Array) {
        this.force = new Flory.Vector(force);
    } else if (force instanceof Flory.baseVector) {
        if (force instanceof Flory.Vector2 || force instanceof Flory.Vector3) {
            this.force = new Flory.Vector(velocity.components);
        } else {
            this.force = force.clone();
        }
    } else {
        console.log("Flory: force is not an array or descendant of Flory.baseVector ")
    }

    this.setDefaultMesh(renderableSettings);
}


Flory.Monomer.prototype = Object.create(Flory.Particle.prototype);


Flory.Monomer.prototype.setDefaultMesh = function(settings) {
    var material = {};
    var geometry = {};

    var segments = (settings != undefined && typeof settings.segments == "number") ? settings.segments : 20;

    var dim = this.position.dimension();
    if (dim >= 3) {
        geometry = new THREE.SphereGeometry(this.radius, segments, segments);
    } else {
        geometry = new THREE.CircleGeometry(this.radius, segments, 0, 2 * 3.14159265359);
    }
    var color_of_mesh = (settings != undefined && typeof settings.color == "number") ? settings.color : 0xFF0000;
    if (settings == undefined) {
        material = new THREE.MeshBasicMaterial({
            color: color_of_mesh
        });
    } else if (settings.material != undefined && settings.material instanceof THREE.Material) {
        material = settings.material;
    } else {
        material = new THREE.MeshBasicMaterial({
            color: color_of_mesh
        });
    }

    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(geometry, material);
    return this;
}




Flory.Monomer.prototype.applyForce = function(force, time) {
    for (var i = 0; i < this.acceleration.components.length; i++) {
        this.acceleration.components[i] += (force.components[i] / this.mass) * time;
    }
    return this;
}


/**
 * Given the dimension index, will increment
 * the component by amount
 * @param  {Integer} dimension the dimension to increment.
 * @param  {Float} amount    the amount to increment the dimension by [-inf,+inf];
 * @return {Flory.Monomer}      returns itself.
 */
Flory.Monomer.prototype.incrementDimension = function(dimension, amount) {
    this.position.components[dimension] += amount;
    return this;
};

Flory.Monomer.prototype.distanceTo = function(a) {
    return this.position.distanceTo(a.position);
};

Flory.Monomer.prototype.distanceToSq = function(a) {
    return this.position.distanceToSq(a.position);
};

Flory.Monomer.prototype.clone = function() {
    return new Flory.Monomer3D(this.radius, this.position);
};





Flory.Monomer.defaultRadius = 1;
