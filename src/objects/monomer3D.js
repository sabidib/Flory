/**
 * @author sabidib
 */


Flory.Monomer3D = function(radius,position){
    this.radius = (radius == undefined ? radius : Flory.Monomer3D.defaultRadius);
    if(position.x == undefined && position.y == undefined  && position.z == undefined){
        this.position = new Flory.Vector3(position[0],position[1],position[2]);    
    } else {
        this.position = new Flory.Vector3(position.x, position.y, position.z);        
    }
}


Flory.Monomer3D.prototype = {
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