/**
 * @author sabidib
 */


/**
 * Creates a 2D Monomer
 * @param {[Float]} radius     [The radius of the Monomer]
 * @param {[Float]} charge     [The charge of the Monomer, default 0]
 * @param {[Float]} mass       [The mass of the Monomer, default 0]
 * @param {[Object]} kinematics [An object with propeties : position , velocity, acceleration, force]
 */

Flory.Monomer2D = function(radius,charge,mass,kinematics){
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

    this.radius = (radius != undefined ? radius : Flory.Monomer2D.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);
    this.mass = (mass != undefined ? mass : 0);

    if(position == undefined){
        this.position = new Flory.Vector2(0,0);
    } else if(position instanceof Array){
        this.position = new Flory.Vector2(position[0],position[1]);
    } else if(position.x != undefined && position.y != undefined){
        this.position = new Flory.Vector2(position.x,position.y);
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector2(0,0);
    } else if(velocity instanceof Array){
        this.velocity = new Flory.Vector2(velocity[0],velocity[1]);
    } else if(velocity.x != undefined && velocity.y != undefined){
        this.velocity = new Flory.Vector2(velocity.x,velocity.y);
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector2(0,0);
    } else if(acceleration instanceof Array){
        this.acceleration = new Flory.Vector2(acceleration[0],acceleration[1]);
    } else if(acceleration.x != undefined && acceleration.y != undefined){
        this.acceleration = new Flory.Vector2(acceleration.x,acceleration.y);
    }


    if(force == undefined){
        this.force = new Flory.Vector2(0,0);
    } else if(force instanceof Array){
        this.force = new Flory.Vector2(force[0],force[1]);
    } else if(force.x != undefined && force.y != undefined){
        this.force = new Flory.Vector2(force.x,force.y);
    }

}

Flory.Monomer2D.prototype = Object.create( Flory.Entity.prototype);


Flory.Monomer2D.prototype.incrementX = function(amount){
        this.position.x += amount;
        return this;
    };

Flory.Monomer2D.prototype.incrementY =  function(amount){
        this.position.y += amount;
        return this;
    };
Flory.Monomer2D.prototype.distanceTo =  function(a){
        return this.position.distanceTo(a.position);
    };
Flory.Monomer2D.prototype.distanceToSq = function(a){
        return this.position.distanceToSq(a.position);
    };
Flory.Monomer2D.prototype.clone = function(){
        return new Flory.Monomer2D(this.radius,this.position);
    };




Flory.Monomer2D.defaultRadius = 1;