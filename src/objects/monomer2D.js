/**
 * @author sabidib
 */


Flory.Monomer2D = function(radius,position,velocity,acceleration){
    this.radius = (radius == undefined ? radius : Flory.Monomer2D.defaultRadius);
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

}


Flory.Monomer2D.prototype = {
    update : function(){
        this.velocity.add(this.acceleration.scale(Flory.timestep));
        this.position.add(this.velocity.scale(Flory.timestep).scale(0.5));
    },
    incrementX : function(amount){
        this.position.x += amount;
        return this;
    },
    incrementY : function(amount){
        this.position.y += amount;
        return this;
    },
    distanceTo : function(a){
        return this.position.distanceTo(a.position);
    },
    distanceToSq : function(a){
        return this.position.distanceToSq(a.position);
    },
    clone : function(){
        return new Flory.Monomer2D(this.radius,this.position);
    }

}



Flory.Monomer2D.defaultRadius = 1;