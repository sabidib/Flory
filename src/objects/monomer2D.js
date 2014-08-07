/**
 * @author sabidib
 */


Flory.Monomer2D = function(radius,position){
    this.radius = (radius == undefined ? radius : Flory.Monomer2D.defaultRadius);
    if(position.x == undefined && position.y == undefined){
        this.position = new Flory.Vector2(position[0],position[1]);    
    } else {
        this.position = new Flory.Vector2(position.x, position.y);        
    }
}


Flory.Monomer2D.prototype = {
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