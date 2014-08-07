/**
 * @author sabidib
 */


Flory.Monomer = function(radius,position){
    this.radius = (radius == undefined ? radius : Flory.Monomer.defaultRadius);
    if(position.components == undefined){
        this.position = new Flory.Vector(position);    
    } else {
        this.position = position.clone();        
    }
}


Flory.Monomer3D.prototype = {
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