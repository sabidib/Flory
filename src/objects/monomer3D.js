/**
 * @author sabidib http://github.com/sabidib
 */

/**
 * Creates a 3D Monomer
 * @constructor
 * @param {[Float]} radius     [The radius of the Monomer]
 * @param {[Float]} charge     [The charge of the Monomer, default 0]
 * @param {[Float]} mass       [The mass of the Monomer, default 0]
 * @param {[Object]} kinematics [An object with propeties : position , velocity, acceleration, force]
 * @param  {String} name        [The name of the entity]
 * @param   {Object} [renderableSettings] [An object containing any of the following keys 'segments'(float), 
 * 'color'(hex) or 'material'(THREE.mesh). This is completely optional]
 */
Flory.Monomer3D = function(options) {

    var name = options.name;
    Flory.Particle.call(this,name);


    var radius = options.radius;
    var charge = options.charge;
    var mass = options.mass;
    var kinematics = options.kinematics;
    var renderableSettings = options.renderableSettings;

    this.dimension = 3;
    var position = options.position;
    var velocity = options.velocity;
    var acceleration = options.acceleration;
    var force = options.force;

    
    if(kinematics != undefined){
        position = (position === undefined ? kinematics.position : position);
        velocity = (velocity === undefined ? kinematics.velocity : velocity);
        acceleration = (acceleration === undefined ? kinematics.acceleration : acceleration);
        force = (force === undefined ? kinematics.force : force);
    }
    
    this.radius = (radius !== undefined ? radius : Flory.Monomer3D.defaultRadius);
    this.charge = (charge !== undefined ? charge : 0);
    this.mass = (mass != undefined ? mass : 0);


    if(position == undefined){
        this.position = new Flory.Vector3(0,0,0);
    } else if(position instanceof Array){
        this.position = new Flory.Vector3(position[0],position[1],position[2]);
    } else if(position.x != undefined || position.y != undefined || position.z != undefined){
        this.position = new Flory.Vector3(position.x,position.y,position.z);
    }else {
        if(! (position instanceof Flory.baseVector)){
            console.log("Flory: position is not a valid Flory.baseVector.")
            return undefined;
        } else if(position instanceof Flory.Vector2){
            this.position = new Flory.Vector3(position.x,position.y,0);
        } else if(position instanceof Flory.Vector){
            this.position = new Flory.Vector3(position.components[0],position.components[1],position.components[2]);
        } else {
            this.position = position.clone();    
        }
        
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector3(0,0,0);
    } else if(velocity instanceof Array){
        this.velocity = new Flory.Vector3(velocity[0],velocity[1],velocity[2]);
    } else if(velocity.x != undefined || velocity.y != undefined || velocity.z != undefined){
        this.velocity = new Flory.Vector3(velocity.x,velocity.y,velocity.z);
    } else {
        if(! (velocity instanceof Flory.baseVector)){
            console.log("Flory: velocity is not a valid Flory.baseVector.")
            return undefined
        } else if(velocity instanceof Flory.Vector2){
            this.velocity = new Flory.Vector3(velocity.x,velocity.y,0);
        } else if(velocity instanceof Flory.Vector){
            this.velocity = new Flory.Vector3(velocity.components[0],velocity.components[1],velocity.components[2]);
        } else {
            this.velocity = velocity.clone();    
        }
        
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector3(0,0,0);
    } else if(acceleration instanceof Array){
        this.acceleration = new Flory.Vector3(acceleration[0],acceleration[1],acceleration[2]);
    } else if(acceleration.x != undefined || acceleration.y != undefined || acceleration.z != undefined){
        this.acceleration = new Flory.Vector3(acceleration.x,acceleration.y,acceleration.z);
    }  else {
        if(! (acceleration instanceof Flory.baseVector)){
            console.log("Flory: acceleration is not a valid Flory.baseVector.")
            return undefined
        } else if(acceleration instanceof Flory.Vector2){
            this.acceleration = new Flory.Vector3(acceleration.x,acceleration.y,0);
        } else if(acceleration instanceof Flory.Vector){
            this.acceleration = new Flory.Vector3(acceleration.components[0],acceleration.components[1],acceleration.components[2]);
        } else {
            this.acceleration = acceleration.clone();    
        }
        
    }


    if(force == undefined){
        this.force = new Flory.Vector3(0,0,0);
    } else if(force instanceof Array){
        this.force = new Flory.Vector3(force[0],force[1],force[2]);
    } else if(force.x != undefined || force.y != undefined || force.z != undefined){
        this.force = new Flory.Vector3(force.x,force.y,force.z);
    } else {
        if(! (force instanceof Flory.baseVector)){
            console.log("Flory: force is not a valid Flory.baseVector.")
            return undefined
        } else if(force instanceof Flory.Vector2){
            this.force = new Flory.Vector3(force.x,force.y,0);
        } else if(force instanceof Flory.Vector){
            this.force = new Flory.Vector3(force.components[0],force.components[1],force.components[2]);
        } else {
            this.force = force.clone();    
        }
        
    }

    this.setDefaultMesh(renderableSettings);

};

Flory.Monomer3D.prototype = Object.create(Flory.Particle.prototype);

Flory.Monomer3D.prototype.setDefaultMesh = function(settings) {
    var material = {};
    var geometry = {};

    var segments = (settings != undefined && typeof settings.segments == "number" ) ? settings.segments : 20;

    geometry = new THREE.SphereGeometry(this.radius,segments,segments);

    var color_of_mesh = (settings != undefined && typeof settings.color == "number" ) ? settings.color : 0xFF0000;

    if(settings == undefined){
        material = new THREE.MeshBasicMaterial({color : color_of_mesh});
    } else if(settings.material != undefined && settings.material instanceof THREE.Material){
        material = settings.material;
    } else {
        material = new THREE.MeshBasicMaterial({color : color_of_mesh});        
    }

    this.mesh = new THREE.Mesh(geometry, material);
    this.geometry = geometry;
    this.material = material;
}


Flory.Monomer3D.prototype.applyForce = function(force,time){
    acceleration.x += (force.x/this.mass)*time;
    acceleration.y += (force.y/this.mass)*time;
    acceleration.z += (force.z/this.mass)*time;
}



Flory.Monomer3D.prototype.incrementX = function(amount){
        this.position.x += amount;
        return this;
    };

Flory.Monomer3D.prototype.incrementY =  function(amount){
        this.position.y += amount;
        return this;
    };

Flory.Monomer3D.prototype.incrementZ =  function(amount){
        this.position.z += amount;
        return this;
    };

Flory.Monomer3D.prototype.distanceTo = function(a){
        return this.position.distanceTo(a.position);
    };

Flory.Monomer3D.prototype.distanceToSq = function(a){
        return this.position.distanceToSq(a.position);
    };

Flory.Monomer3D.prototype.clone = function(){
        return new Flory.Monomer3D(this.radius,this.position);
    };


Flory.Monomer3D.defaultRadius = 1;