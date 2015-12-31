/**
 * @author sabidib
 */

/** @constructor */
Flory.baseVector = function(){
	this.components = []
}

Flory.baseVector.prototype.constructor = Flory.baseVector;

Flory.baseVector.prototype = {

dimension : function(){
		return this.components.length;
	}

};