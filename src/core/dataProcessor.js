/**
 * @author sabidib http://github.com/sabidib
 */
/*global Flory*/

'use strict';
Flory.DataProcessor = function () {

};
Flory.DataProcessor.prototype = {
    constructor: Flory.DataProcessor,
/**
 * Accepts an array of numbers and calculates the average
 * @param  {[Array]} data []
 * @return {[Float]}      [Average]
 */
    mean: function (data) {
        var sum = 0, i, len = data.length;
        for (i = 0; i < len; i += 1) {
            sum += data[i];
        }
        return sum / len;
    },
    /**
 * Accepts an array of numbers and calculates the mean square average.
 * @param  {[Array]} data []
 * @return {[Float]}      [Mean squared]
 */
    meanSquare: function (data) {
        var sum = 0, i, len = data.length;
        for (i = 0; i < len; i += 1) {
            sum += data[i] * data[i];
        }
        return sum / len;
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean square average displacement
 * @param  {[Flory.Monomer*]} data []
 * @return {[Float]}      []
 */
    meanSquareMonomerDisplacement: function (data) {
        var sum = 0, i, len = data.length, displacement = 0;
        for (i = 0; i < len; i += 1) {
            displacement = data[i].position.length();
            sum += displacement * displacement;
        }
        return sum / len;
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean square average velocity
 * @param  {[Flory.Monomer*]} data []
 * @return {[Float]}      []
 */
    meanSquareMonomerVelocity: function (data) {
        var sum = 0, i, len = data.length, velocity = 0;
        for (i = 0; i < len; i += 1) {
            velocity = data[i].velocity.length();
            sum += velocity * velocity;
        }
        return sum / len;
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean square average acceleration
 * @param  {[Flory.Monomer*]} data []
 * @return {[Float]}      []
 */
    meanSquareMonomerAcceleration: function (data) {
        var sum = 0, i, len = data.length, acceleration = 0;
        for (i = 0; i < len; i += 1) {
            acceleration = data[i].acceleration.length();
            sum += acceleration * acceleration;
        }
        return sum / len;
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean displacement
 * @param  {[Flory.Monomer*]} data []
 * @return {[Float]}      []
 */
    meanMonomerDisplacement: function (data) {
        var sum = 0, i, len = data.length;
        for (i = 0; i < len; i += 1) {
            sum += data[i].position.length();
        }
        return sum / len;
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean displacement
 * @param  {[Flory.Monomer*]} data []
 * @return {[Flory.Vector]}      []
 */
    meanMonomerPosition: function (data) {
        var i = 0, len = data.length, sum = new Flory.Vector();
        for (i = 0; i < len; i += 1) {
            sum.add(data[i].position);
        }
        return sum.mult(1 / len);
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean displacement
 * @param  {[Flory.Monomer*]} data []
 * @return {[Float]}      []
 */
    meanMonomerSpeed: function (data) {
        var sum = 0, i, len = data.length;
        for (i = 0; i < len; i += 1) {
            sum += data[i].velocity.length();
        }
        return sum / len;
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean velocity
 * @param  {[Flory.Monomer*]} data []
 * @return {[Flory.Vector]}      []
 */
    meanMonomerVelocity: function (data) {
        var sum = new Flory.Vector(), i, len = data.length;
        for (i = 0; i < len; i += 1) {
            sum.add(data[i].velocity);
        }
        return sum.mult(1 / len);
    },
    /**
 * Accepts an array of Flory.Monomer* and calculates the mean acceleration
 * @param  {[Flory.Monomer*]} data []
 * @return {[Flory.Vector]}      []
 */
    meanMonomerAcceleration: function (data) {
        var sum = new Flory.Vector(), i, len = data.length;
        for (i = 0; i < len; i += 1) {
            sum.add(data[i].acceleration);
        }
        return sum.mult(1 / len);
    }
};