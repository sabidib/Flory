/**
 * @author sabidib
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

Flory.Monomer2D = function(radius, charge, mass, kinematics, name, renderableSettings) {
    Flory.Particle.call(this, name);

    this.dimension = 2;
    var position = undefined;
    var velocity = undefined;
    var acceleration = undefined;
    var force = undefined;

    if (kinematics != undefined) {
        position = kinematics.position;
        velocity = kinematics.velocity;
        acceleration = kinematics.acceleration;
        force = kinematics.force;
    }

    this.radius = (radius != undefined ? radius : Flory.Monomer2D.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);
    this.mass = (mass != undefined ? mass : 0);

    if (position == undefined) {
        this.position = new Flory.Vector2(0, 0);
    } else if (position instanceof Array) {
        this.position = new Flory.Vector2(position[0], position[1]);
    } else if (position.x != undefined && position.y != undefined) {
        this.position = new Flory.Vector2(position.x, position.y);
    }

    if (velocity == undefined) {
        this.velocity = new Flory.Vector2(0, 0);
    } else if (velocity instanceof Array) {
        this.velocity = new Flory.Vector2(velocity[0], velocity[1]);
    } else if (velocity.x != undefined && velocity.y != undefined) {
        this.velocity = new Flory.Vector2(velocity.x, velocity.y);
    }

    if (acceleration == undefined) {
        this.acceleration = new Flory.Vector2(0, 0);
    } else if (acceleration instanceof Array) {
        this.acceleration = new Flory.Vector2(acceleration[0], acceleration[1]);
    } else if (acceleration.x != undefined && acceleration.y != undefined) {
        this.acceleration = new Flory.Vector2(acceleration.x, acceleration.y);
    }


    if (force == undefined) {
        this.force = new Flory.Vector2(0, 0);
    } else if (force instanceof Array) {
        this.force = new Flory.Vector2(force[0], force[1]);
    } else if (force.x != undefined && force.y != undefined) {
        this.force = new Flory.Vector2(force.x, force.y);
    }

    this.setDefaultMesh(renderableSettings);

}

Flory.Monomer2D.prototype = Object.create(Flory.Particle.prototype);

Flory.Monomer2D.prototype.setDefaultMesh = function(settings) {
    var material = {};
    var geometry = {};

    var segments = (settings != undefined && typeof settings.segments == "number") ? settings.segments : 20;

    geometry = new THREE.CircleGeometry(this.radius, segments, 0, 2 * 3.14159265359);


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
    this.mesh = new THREE.Mesh(geometry, material);
    this.geometry = geometry;
    this.material = material;
}


Flory.Monomer2D.prototype.incrementX = function(amount) {
    this.position.x += amount;
    return this;
};

Flory.Monomer2D.prototype.incrementY = function(amount) {
    this.position.y += amount;
    return this;
};

Flory.Monomer2D.prototype.distanceTo = function(a) {
    return this.position.distanceTo(a.position);
};

Flory.Monomer2D.prototype.distanceToSq = function(a) {
    return this.position.distanceToSq(a.position);
};

Flory.Monomer2D.prototype.clone = function() {
    return new Flory.Monomer2D(this.radius, this.position);
};

Flory.Monomer2D.defaultRadius = 1;
