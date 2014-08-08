/**
 * @author sabidib
 */


Flory.Monomer3D = function(radius,charge,position,velocity,acceleration){
    Flory.Entity.call(this);
    this.radius = (radius !== undefined ? radius : Flory.Monomer3D.defaultRadius);
    this.charge = (charge !== undefined ? charge : 0);


    if(position == undefined){
        this.position = new Flory.Vector3(0,0);
    } else if(position instanceof Array){
        this.position = new Flory.Vector3(position[0],position[1]);
    } else if(position.x != undefined && position.y != undefined && position.z != undefined){
        this.position = new Flory.Vector3(position.x,position.y);
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector3(0,0);
    } else if(velocity instanceof Array){
        this.velocity = new Flory.Vector3(velocity[0],velocity[1]);
    } else if(velocity.x != undefined && velocity.y != undefined && velocity.z != undefined){
        this.velocity = new Flory.Vector3(velocity.x,velocity.y);
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector3(0,0);
    } else if(acceleration instanceof Array){
        this.acceleration = new Flory.Vector3(acceleration[0],acceleration[1]);
    } else if(acceleration.x != undefined && acceleration.y != undefined && acceleration.z != undefined){
        this.acceleration = new Flory.Vector3(acceleration.x,acceleration.y);
    }

}

Flory.Monomer3D.prototype = Object.create(Flory.Entity.prototype);


Flory.Monomer3D.prototype.update = function(){
        this.velocity.add(this.acceleration.scale(Flory.timestep));
        this.position.add(this.velocity.scale(Flory.timestep).scale(0.5));
        return this;
    };

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