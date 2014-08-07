/**
 * @author sabidib
 */


Flory.Monomer = function(radius,position,velocity,acceleration){
    this.radius = (radius == undefined ? radius : Flory.Monomer.defaultRadius);
    if(position.components == undefined && position instanceof Array){
        this.position = new Flory.Vector(position);    
    } else {
        this.position = position.clone();        
    }

    if(velocity.components == undefined && velocity instanceof Array){
        this.velocity = new Flory.Vector(velocity);
    } else {
        this.velocity = velocity.clone();
    }

    if(acceleration.components == undefined && acceleration instanceof Array){
        this.acceleration = new Flory.Vector(acceleration);
    } else {
        this.acceleration = acceleration.clone();
    }

}





Flory.Monomer.prototype = {


    update : function(){
        this.velocity.add(this.acceleration.scale(Flory.timestep));
        this.position.add(this.velocity.scale(Flory.timestep).scale(0.5));
    },

    /**
     * Given the dimension index, will increment
     * the component by amount
     * @param  {Integer} dimension the dimension to increment.
     * @param  {Double} amount    the amount to increment the dimension by [-inf,+inf];
     * @return {Flory.Monomer}      returns itself.
     */
    incrementDimension : function(dimension,amount){
        this.position.components[dimension] += amount;
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



Flory.Monomer.defaultRadius = 1;