/**
 * @author  sabidib
 * A simple class to display different values,
 * a class to abstract the DOM for the rest of the library
 *
 * The data is passed in a fashion similar to options
 * var disp  =
 *
 * {
 *  display :
 *      [
 *          {
 *              name : "MSD",
 *              label : "Mean^2 Displacement",
 *              value : function(){
 *                  calculateMSD();
 *              }
 *          }
 *      ]
 * }
 */
/*global Flory,$*/

'use strict';
Flory.Display = function (object, html_id_handle) {
    this.data = {};
    this.json = object;
    this.value_functions = [];
    this.html_handle = $('#' + html_id_handle);
    this.generateAndPlace(this.html_handle);
};
Flory.Display.prototype = {
    constructor: Flory.Display,
    generateAndPlace: function (html_handle) {
        var h = '';
        h += '<div id=\'display-menu\'>';
        var i, disp_val, value_id, value;
        var len = this.json.display.length;
        for (i = 0; i < len; i += 1) {
            disp_val = this.json.display[i];
            if (disp_val.label === undefined) {
                disp_val.label = disp_val.name;
            }
            value_id = Flory.generateGUID();
            value = disp_val.value();
            h += '<div class=\'display-value\'>';
            h += '<label for=\'' + disp_val.name + '\'>' + disp_val.label + '</label>';
            h += '<input type=\'text\' class=\'display-value-text-box\' data-key=\'' + disp_val.name + '\' id=\'' + value_id + '\' name = \'' + disp_val.name + '\' value=\'' + value + '\'>';
            h += '</div>';
            this.value_functions[disp_val.name] = disp_val.value;
        }
        h += '</div>';
        html_handle.html(h);
        return this;
    },
    updateValues: function () {
        var i, j, val, html_text, dimension, string;
        var keys = Object.keys(this.value_functions);
        var l = keys.length;
        for (i = 0; i < l; i += 1) {
            val = this.value_functions[keys[i]]();
            html_text = $('[data-key=\'' + keys[i] + '\'');
            if (typeof val === 'number' || typeof val === 'string') {
                html_text.val(val);
            } else {
                if (val instanceof Flory.Vector) {
                    dimension = val.dimension();
                    string = '';
                    for (j = 0; j < dimension; j += 1) {
                        string += val.components[j] + ',';
                    }
                    string = string.substring(0, string.length - 1);
                    html_text.val(string);
                } else if (val instanceof Flory.Vector3) {
                    html_text.val(val.x + ',' + val.y + ',' + val.z);
                } else if (val instanceof Flory.Vector2) {
                    html_text.val(val.x + ',' + val.y);
                }
            }
        }
        return this;
    },
    updateValue: function (name) {
        $('[data-key=\'' + name + '\'').val(this.value_functions[name]());
    }
};
