/**
 * @author sabidib http://github.com/sabidib
 */
/*global Flory*/
/** @constructor */

'use strict';
Flory.baseEntity = function () {
    this.id = Flory.baseEntity.entityIDCount;
    Flory.baseEntity.entityIDCount += 1;
    this.name = '';
};
Flory.baseEntity.entityIDCount = 0;
Flory.baseEntity.prototype.constructor = Flory.baseEntity;
