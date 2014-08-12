/**
 * @author sabidib
 */


/**
 * Creates  an arbitrary dimension Monomer. The dimension is defined by the
 * number of components in kinematics.position.
 * @constructor
 * @param {[Float]} radius     [The radius of the Monomer]
 * @param {[Float]} charge     [The charge of the Monomer, default 0]
 * @param {[Float]} mass       [The mass of the Monomer, default 0]
 * @param {[Object]} kinematics [An object with propeties : position , velocity, acceleration, force]
 */

Flory.Monomer = function(radius,charge,mass,kinematics){
    if(kinematics == undefined){
        console.log("Flory: Flory.Monomer needs at least the kinematics.position to know what the dimension of the monomer is.");
        return undefined;
    }
    if(kinematics.position == undefined){
        console.log("Flory: Flory.Monomer needs at least the kinematics.position to know what the dimension of the monomer is.");
        return undefined;
    }

    Flory.Entity.call(this);
    
    var position = undefined;
    var velocity = undefined;
    var acceleration = undefined;
    var force = undefined;
    
    if(kinematics != undefined){
        position = kinematics.position;
        velocity = kinematics.velocity;
        acceleration = kinematics.acceleration;
        force = kinematics.force;
    }
    
    this.radius = (radius != undefined ? radius : Flory.Monomer.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);
    this.mass = (mass != undefined ? mass : 0);

    if(position.components == undefined && position instanceof Array){
        this.position = new Flory.Vector(position);    
    } else {
        this.position = position.clone();        
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    }else if(velocity.components == undefined && velocity instanceof Array){
        this.velocity = new Flory.Vector(velocity);
    } else {
        this.velocity = velocity.clone();
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    }else if(acceleration.components == undefined && acceleration instanceof Array){
        this.acceleration = new Flory.Vector(acceleration);
    } else {
        this.acceleration = acceleration.clone();
    }

    if(force == undefined){
        this.force = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    } else if(force.components == undefined && force instanceof Array){
        this.force = new Flory.Vector(force);
    } else {
        this.force = force.clone();
    }
}


Flory.Monomer.prototype = Object.create(Flory.Entity.prototype);

    /**
     * Given the dimension index, will increment
     * the component by amount
     * @param  {Integer} dimension the dimension to increment.
     * @param  {Float} amount    the amount to increment the dimension by [-inf,+inf];
     * @return {Flory.Monomer}      returns itself.
     */
Flory.Monomer.prototype.incrementDimension = function(dimension,amount){
        this.position.components[dimension] += amount;
        return this;
    };

Flory.Monomer.prototype.distanceTo = function(a){
        return this.position.distanceTo(a.position);
    };

Flory.Monomer.prototype.distanceToSq =  function(a){
        return this.position.distanceToSq(a.position);
    };

Flory.Monomer.prototype.clone = function(){
        return new Flory.Monomer3D(this.radius,this.position);
    };
Flory.Monomer.prototype.prepareRenderable = function(settings){
    var segments = (settings != undefined && typeof settings.segments == "number" ) ? settings.segments : 20;

    var dim = this.position.dimension();
    if(dim >= 3){
        this.geometry = new THREE.SphereGeometry(this.radius,segments,segments);
    } else {
        this.geometry = new THREE.CircleGeometry(this.radius, segments, 0, 2*3.14159265359);
    }

    color_of_mesh = (settings != undefined && typeof settings.color == "number" ) ? settings.color : 0xFF0000;
    
    if(settings == undefined){
        this.material = new THREE.MeshBasicMaterial({color : color_of_mesh});
    } else if(settings.material != undefined && settings.materials instanceof THREE.Material){
        this.material = settings.material;
    } else {
        this.material = new THREE.MeshBasicMaterial({color : color_of_mesh});        
    }
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this;
};




Flory.Monomer.defaultRadius = 1;