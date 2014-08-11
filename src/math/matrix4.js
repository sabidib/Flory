/**
 * @author sabidib 
 */

/** @constructor */
Flory.Matrix4 = function(matrix){
	this.matrix = [];
	for(var i = 0; i < 4*4; i++){
		this.matrix[i] = matrix[i]
	}
}


Flory.Matrix4.prototype = {
	contructor : Flory.Matrix4,
	
	setElement : function(m,n,val){
		this.matrix[4*m + n] = val;
		return this;
	},
	setMatrix  : function(matrix){
		this.matrix = matrix;
		return this;
	},
	add : function(a){
		for(var i = 0; i < 4*4;i++){
			this.matrix[i] += a.matrix[i];
		}
		return this;
	},
	multiply : function(a){
		m = this.matrix;
		t = a.matrix;

		m[0] = m[0]*t[0] + m[1]*t[4] + m[2]*t[8]  + m[3]*t[12];
		m[1] = m[0]*t[1] + m[1]*t[5] + m[2]*t[9] + m[3]*t[13];
		m[2] = m[0]*t[2] + m[1]*t[6] + m[2]*t[10] + m[3]*t[14];
		m[3] = m[0]*t[3] + m[1]*t[7] + m[2]*t[11] + m[3]*t[15];

		m[0] = m[4]*t[0] + m[5]*t[4] + m[6]*t[8]  + m[7]*t[12];
		m[1] = m[4]*t[1] + m[5]*t[5] + m[6]*t[9] + m[7]*t[13];
		m[2] = m[4]*t[2] + m[5]*t[6] + m[6]*t[10] + m[7]*t[14];
		m[3] = m[4]*t[3] + m[5]*t[7] + m[6]*t[11] + m[7]*t[15];

		m[0] = m[8]*t[0] + m[9]*t[4] + m[10]*t[8]  + m[11]*t[12];
		m[1] = m[8]*t[1] + m[9]*t[5] + m[10]*t[9] + m[11]*t[13];
		m[2] = m[8]*t[2] + m[9]*t[6] + m[10]*t[10] + m[11]*t[14];
		m[3] = m[8]*t[3] + m[9]*t[7] + m[10]*t[11] + m[11]*t[15];

		m[0] = m[12]*t[0] + m[13]*t[4] + m[14]*t[8]  + m[15]*t[12];
		m[1] = m[12]*t[1] + m[13]*t[5] + m[14]*t[9] + m[15]*t[13];
		m[2] = m[12]*t[2] + m[13]*t[6] + m[14]*t[10] + m[15]*t[14];
		m[3] = m[12]*t[3] + m[13]*t[7] + m[14]*t[11] + m[15]*t[15];

		return this;
	},
	transpose: function(){
		for(var i = 0; i < 4;i++){
			for(var j =0 ;j < 4;j++ )
			this.matrix[i*j + j] = this.matrix[i*j + i];
		}
	}
};



Flory.Matrix4.Identity = new Flory.Matrix4([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);


