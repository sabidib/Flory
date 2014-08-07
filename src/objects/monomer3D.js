/**
 * @author sabidib
 */


Flory.Monomer3D = function(radius,position,velocity,acceleration){
    this.radius = (radius == undefined ? radius : Flory.Monomer3D.defaultRadius);
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



Flory.Monomer3D.prototype = {
    update : function(){
        this.velocity.add(this.acceleration.scale(Flory.timestep));
        this.position.add(this.velocity.scale(Flory.timestep).scale(0.5));
        return this;
    },
    incrementX : function(amount){
        this.position.x += amount;
        return this;
    },
    incrementY : function(amount){
        this.position.y += amount;
        return this;
    },
    incrementZ : function(amount){
        this.position.z += amount;
        return this;
    },
    distanceTo : function(a){
        return this.position.distanceTo(a.position);
    },
    distanceToSq : function(a){
        return this.position.distanceToSq(a.position);
    },
    clone : function(){
        return new Flory.Monomer3D(this.radius,this.position);
    }

}



Flory.Monomer3D.defaultRadius = 1;