/**
 * @author sabidib
 */

Flory.ContinuousField = function(field_function){
	Flory.Field.call(this,[]);
	this.scaler = 1;
	this.field_function = (field_function != undefined) ? field_function : function(){};
}


Flory.ContinuousField.prototype = Object.create(Flory.Field.prototype);


Flory.ContinuousField.prototype.constructor = Flory.ContinuousField;

Flory.ContinuousField.prototype.getForce = function(position){
	return this.field_function(position).mult(this.scaler);
}

Flory.ContinuousField.prototype.scale =function(num){
	if(typeof num === "number"){
		this.scaler = num;		
	}
	return this;
}

Flory.ContinuousField.prototype.clone = function(){
	return new Flory.ContinuousField(this.field_function);
}





