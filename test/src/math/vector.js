/*globals describe*/
'use strict';

var assert = require('assert');
var Flory = require('../../../build/flory.js');

describe('Flory.Vector', function () {
  describe('#cross', function () {

    // var vec1_vec_from_array_def = new Flory.Vector([0,0,0]);
    // var vec2_vec_from_array_def = new Flory.Vector([0,2,1]);
    // var vec3_vec_from_array_def = new Flory.Vector([0.2,2,1]);

    it('test the number constructor', function() {
        var vec1_vec_from_num_def = new Flory.Vector(0);
        var vec2_vec_from_num_def = new Flory.Vector(2);
        var vec3_vec_from_num_def = new Flory.Vector(3);
        var i = 0;
        assert.equal(0,vec1_vec_from_num_def.components.length);
        for (i = 0; i < vec1_vec_from_num_def.components.length; i++) {
            assert.equal(vec1_vec_from_num_def.components[i],0);
        };
        assert.equal(2,vec2_vec_from_num_def.components.length);
        for (i = 0; i < vec2_vec_from_num_def.components.length; i++) {
            assert.equal(vec2_vec_from_num_def.components[i],0);
        };

        assert.equal(3,vec3_vec_from_num_def.components.length);
        for (i = 0; i < vec3_vec_from_num_def.components.length; i++) {
            assert.equal(vec3_vec_from_num_def.components[i],0);
        };
    });


    

    // var vec1_vec_from_vector_3 = Flory.Vector(new Flory.Vector3([0,0,0]));
    // var vec2_vec_from_vector_3 = Flory.Vector(new Flory.Vector3([0,2,1]));
    // var vec3_vec_from_vector_3 = Flory.Vector(new Flory.Vector3([0.2,2,1]));
    it('test the Flory.Vector3 constructor', function() {
        var vec1 = new Flory.Vector3([0,0,23]);
        var vec2 = new Flory.Vector3([0,2,23]);
        var vec3 = new Flory.Vector3([0.2,1,23]);

        var vec1_vec_from_vector_2 = new Flory.Vector(vec1);
        var vec2_vec_from_vector_2 = new Flory.Vector(vec2);
        var vec3_vec_from_vector_2 = new Flory.Vector(vec3);

        var i = 0;
        assert.equal(3,vec1_vec_from_vector_2.components.length);
        for (i = 0; i < vec1_vec_from_vector_2.components.length; i++) {
            assert.equal(vec1_vec_from_vector_2.components[i],vec1.components[i]);
        };

        assert.equal(vec1_vec_from_vector_2.components[0],vec1.x);
        assert.equal(vec1_vec_from_vector_2.components[1],vec1.y);

        assert.equal(3,vec2_vec_from_vector_2.components.length);
        for (i = 0; i < vec2_vec_from_vector_2.components.length; i++) {
            assert.equal(vec2_vec_from_vector_2.components[i],vec2.components[i]);
        };
        assert.equal(vec2_vec_from_vector_2.components[0],vec2.x);
        assert.equal(vec2_vec_from_vector_2.components[1],vec2.y);


        assert.equal(3,vec3_vec_from_vector_2.components.length);
        for (i = 0; i < vec3_vec_from_vector_2.components.length; i++) {
            assert.equal(vec3_vec_from_vector_2.components[i],vec3.components[i]);
        };
        assert.equal(vec3_vec_from_vector_2.components[0],vec3.x);
        assert.equal(vec3_vec_from_vector_2.components[1],vec3.y);
    });
    

    // var vec1_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0,0,0]));
    // var vec2_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0,2,1]));
    // var vec3_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0.2,2,1]));
    it('test the Flory.Vector2 constructor', function() {
        var vec1 = new Flory.Vector2([0,0]);
        var vec2 = new Flory.Vector2([0,2]);
        var vec3 = new Flory.Vector2([0.2,1]);

        var vec1_vec_from_vector_2 = new Flory.Vector(vec1);
        var vec2_vec_from_vector_2 = new Flory.Vector(vec2);
        var vec3_vec_from_vector_2 = new Flory.Vector(vec3);

        var i = 0;
        assert.equal(2,vec1_vec_from_vector_2.components.length);
        for (i = 0; i < vec1_vec_from_vector_2.components.length; i++) {
            assert.equal(vec1_vec_from_vector_2.components[i],vec1.components[i]);
        };

        assert.equal(vec1_vec_from_vector_2.components[0],vec1.x);
        assert.equal(vec1_vec_from_vector_2.components[1],vec1.y);

        assert.equal(2,vec2_vec_from_vector_2.components.length);
        for (i = 0; i < vec2_vec_from_vector_2.components.length; i++) {
            assert.equal(vec2_vec_from_vector_2.components[i],vec2.components[i]);
        };
        assert.equal(vec2_vec_from_vector_2.components[0],vec2.x);
        assert.equal(vec2_vec_from_vector_2.components[1],vec2.y);


        assert.equal(2,vec3_vec_from_vector_2.components.length);
        for (i = 0; i < vec3_vec_from_vector_2.components.length; i++) {
            assert.equal(vec3_vec_from_vector_2.components[i],vec3.components[i]);
        };
        assert.equal(vec3_vec_from_vector_2.components[0],vec3.x);
        assert.equal(vec3_vec_from_vector_2.components[1],vec3.y);
    });
  
    // var vec1_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0,0,0]));
    // var vec2_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0,2,1]));
    // var vec3_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0.2,2,1]));
    it('test the Flory.Vector constructor', function() {
        var vec1 = new Flory.Vector([0,234,34,34,43,56,3,4,2,34,5,3,4,3,2,3,4,56,2,3,4,324]);
        var vec2 = new Flory.Vector([232,23426,32643525,32423]);
        var vec3 = new Flory.Vector([0.2,1,3,43,2,3,532,3,4,3,64,3,2,34,5,6,7,2,3]);

        var vec1_vec_from_vector_2 = new Flory.Vector(vec1);
        var vec2_vec_from_vector_2 = new Flory.Vector(vec2);
        var vec3_vec_from_vector_2 = new Flory.Vector(vec3);

        var i = 0;
        assert.equal(vec1.components.length,vec1_vec_from_vector_2.components.length);
        for (i = 0; i < vec1_vec_from_vector_2.components.length; i++) {
            assert.equal(vec1_vec_from_vector_2.components[i],vec1.components[i]);
        };


        assert.equal(vec2.components.length,vec2_vec_from_vector_2.components.length);
        for (i = 0; i < vec2_vec_from_vector_2.components.length; i++) {
            assert.equal(vec2_vec_from_vector_2.components[i],vec2.components[i]);
        };


        assert.equal(vec3.components.length,vec3_vec_from_vector_2.components.length);
        for (i = 0; i < vec3_vec_from_vector_2.components.length; i++) {
            assert.equal(vec3_vec_from_vector_2.components[i],vec3.components[i]);
        };
    });
    
    // var vec1_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0,0,0]));
    // var vec2_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0,2,1]));
    // var vec3_vec_from_vector_2 = new Flory.Vector(new Flory.Vector2([0.2,2,1]));
    it('test the array constructor', function() {
        var vec1 = [0,0,23,324];
        var vec2 = [232];
        var vec3 = [0.2,1,3,43,2,3,532,3,4,3,66,2,3,4,35,6,7,34,3,2,34,5,6,7,2,3];

        var vec1_vec_from_vector_2 = new Flory.Vector(vec1);
        var vec2_vec_from_vector_2 = new Flory.Vector(vec2);
        var vec3_vec_from_vector_2 = new Flory.Vector(vec3);

        var i = 0;
        assert.equal(vec1.length,vec1_vec_from_vector_2.components.length);
        for (i = 0; i < vec1_vec_from_vector_2.components.length; i++) {
            assert.equal(vec1_vec_from_vector_2.components[i],vec1[i]);
        };


        assert.equal(vec2.length,vec2_vec_from_vector_2.components.length);
        for (i = 0; i < vec2_vec_from_vector_2.components.length; i++) {
            assert.equal(vec2_vec_from_vector_2.components[i],vec2[i]);
        };


        assert.equal(vec3.length,vec3_vec_from_vector_2.components.length);
        for (i = 0; i < vec3_vec_from_vector_2.components.length; i++) {
            assert.equal(vec3_vec_from_vector_2.components[i],vec3[i]);
        };
    });


        // var vec1_vec_from_vector = Flory.Vector(new Flory.Vector([0,0,0]));
    // var vec2_vec_from_vector = Flory.Vector(new Flory.Vector([0,2,1]));
    // var vec3_vec_from_vector = Flory.Vector(new Flory.Vector([0.2,2,1]));


    it('test addition',function(){
        var vec1 = [0,234,34,34,43,56,3,4,2,34,5,3,4,3,2,3,4,56,2,3,4,324];
        var vec2 = [1,3];
        var vec3 = [1,3,4];
        var vec4 = [3,3,24,23];

        var vec_from_array_vec1 = new Flory.Vector(vec1);
        var vec_from_array_vec2 = new Flory.Vector(vec2);
        var vec_from_array_vec3 = new Flory.Vector(vec3);
        var vec_from_array_vec4 = new Flory.Vector(vec4);

        var vec5 = [0,2];
        var vec6 = [0,0];
        var vec7 = [0,3,0];
        var vec8 = [2,3,23];
        var vec9 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0];

        var vec2_from_array_vec1 = new Flory.Vector2(vec5);
        var vec2_from_array_vec2 = new Flory.Vector2(vec6);
        var vec3_from_array_vec3 = new Flory.Vector3(vec7);
        var vec3_from_array_vec4 = new Flory.Vector3(vec8);
        var vec_from_array_vec5 = new Flory.Vector(vec9);

        vec_from_array_vec1.add(vec2_from_array_vec1)

        var vec1_p_vec5 = [0,236,34,34,43,56,3,4,2,34,5,3,4,3,2,3,4,56,2,3,4,324];
        for (var i = 0; i < vec_from_array_vec1.components.length; i++) {
            assert.equal(vec_from_array_vec1.components[i],vec1_p_vec5[i])
        };

        vec_from_array_vec2.add(vec2_from_array_vec2)

        var vec2_p_vec6 = [1,3];
        for (var i = 0; i < vec_from_array_vec2.components.length; i++) {
            assert.equal(vec_from_array_vec2.components[i],vec2_p_vec6[i])
        };

        vec_from_array_vec3.add(vec3_from_array_vec3)

        var vec3_p_vec7 = [1,6,4];
        for (var i = 0; i < vec_from_array_vec3.components.length; i++) {
            assert.equal(vec_from_array_vec3.components[i],vec3_p_vec7[i])
        };


        vec_from_array_vec4.add(vec3_from_array_vec4)

        var vec4_p_vec8 = [5,6,47,23];
        for (var i = 0; i < vec_from_array_vec4.components.length; i++) {
            assert.equal(vec_from_array_vec4.components[i],vec4_p_vec8[i])
        };

        vec_from_array_vec4.add(vec_from_array_vec5)

        var vec4_p_vec9 = [5,6,47,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0];
        for (var i = 0; i < vec_from_array_vec5.components.length; i++) {
            assert.equal(vec_from_array_vec4.components[i],vec4_p_vec9[i])
        };
    })



    // var vec1_vec_from_vector = Flory.Vector(new Flory.Vector([0,0,0]));
    // var vec2_vec_from_vector = Flory.Vector(new Flory.Vector([0,2,1]));
    // var vec3_vec_from_vector = Flory.Vector(new Flory.Vector([0.2,2,1]));


    it('test subtraction',function(){
        var vec1 = [0,234,34,34,43,56,3,4,2,34,5,3,4,3,2,3,4,56,2,3,4,324];
        var vec2 = [1,3];
        var vec3 = [1,3,4];
        var vec4 = [3,3,24,23];

        var vec_from_array_vec1 = new Flory.Vector(vec1);
        var vec_from_array_vec2 = new Flory.Vector(vec2);
        var vec_from_array_vec3 = new Flory.Vector(vec3);
        var vec_from_array_vec4 = new Flory.Vector(vec4);

        var vec5 = [0,2];
        var vec6 = [0,0];
        var vec7 = [0,3,0];
        var vec8 = [2,3,23];
        var vec9 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0];

        var vec2_from_array_vec1 = new Flory.Vector2(vec5);
        var vec2_from_array_vec2 = new Flory.Vector2(vec6);
        var vec3_from_array_vec3 = new Flory.Vector3(vec7);
        var vec3_from_array_vec4 = new Flory.Vector3(vec8);
        var vec_from_array_vec5 = new Flory.Vector(vec9);


        vec_from_array_vec1.sub(vec2_from_array_vec1)

        var vec1_p_vec5 = [0,232,34,34,43,56,3,4,2,34,5,3,4,3,2,3,4,56,2,3,4,324];
        for (var i = 0; i < vec_from_array_vec1.components.length; i++) {
            assert.equal(vec_from_array_vec1.components[i],vec1_p_vec5[i])
        };

        vec_from_array_vec2.sub(vec2_from_array_vec2)

        var vec2_p_vec6 = [1,3];
        for (var i = 0; i < vec_from_array_vec2.components.length; i++) {
            assert.equal(vec_from_array_vec2.components[i],vec2_p_vec6[i])
        };

        vec_from_array_vec3.sub(vec3_from_array_vec3)

        var vec3_p_vec7 = [1,0,4];
        for (var i = 0; i < vec_from_array_vec3.components.length; i++) {
            assert.equal(vec_from_array_vec3.components[i],vec3_p_vec7[i])
        };


        vec_from_array_vec4.sub(vec3_from_array_vec4)
        var vec4_p_vec8 = [1,0,1,23];
        for (var i = 0; i < vec_from_array_vec4.components.length; i++) {
            assert.equal(vec_from_array_vec4.components[i],vec4_p_vec8[i])
        };

        vec_from_array_vec4.sub(vec_from_array_vec5)

        var vec4_p_vec9 = [1,0,1,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-4,0,0,0,0];
        for (var i = 0; i < vec_from_array_vec5.components.length; i++) {
            assert.equal(vec_from_array_vec4.components[i],vec4_p_vec9[i])
        };
    })


  });
});