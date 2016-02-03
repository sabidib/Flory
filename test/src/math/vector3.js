var assert = require('assert');

describe('Flory.Vector3', function() {
  describe('#cross', function () {

    var vec1_vec_from_array_def = Flory.Vector([0,0,0]);
    var vec2_vec_from_array_def = Flory.Vector([0,2,1]);
    var vec3_vec_from_array_def = Flory.Vector([0.2,2,1]);

    var vec1_vec_from_vector_2 = Flory.Vector(new Flory.Vector2([0,0,0]));
    var vec2_vec_from_vector_2 = Flory.Vector(new Flory.Vector2([0,2,1]));
    var vec3_vec_from_vector_2 = Flory.Vector(new Flory.Vector2([0.2,2,1]));

    var vec1_vec_from_vector_3 = Flory.Vector(new Flory.Vector3([0,0,0]));
    var vec2_vec_from_vector_3 = Flory.Vector(new Flory.Vector3([0,2,1]));
    var vec3_vec_from_vector_3 = Flory.Vector(new Flory.Vector3([0.2,2,1]));

    var vec1_vec_from_vector = Flory.Vector(new Flory.Vector([0,0,0]));
    var vec2_vec_from_vector = Flory.Vector(new Flory.Vector([0,2,1]));
    var vec3_vec_from_vector = Flory.Vector(new Flory.Vector([0.2,2,1]));


    beforeEach(function() {
    // runs before each test in this block
    });


    it('should return the correct value', function () {
      var test1 = Flory.Vector()
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});