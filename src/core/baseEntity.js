/**
 * @author sabidib http://github.com/sabidib
 */

/** @constructor */
Flory.baseEntity = function(){
	this.id = Flory.baseEntity.entityIDCount++;
	this.name = '';
}

Flory.baseEntity.entityIDCount = 0;

Flory.baseEntity.prototype.constructor = Flory.baseEntity;
