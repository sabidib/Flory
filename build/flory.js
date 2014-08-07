/**
 * 	@author sabidib 
 */

var Flory = { VERSION : '0.01',
			  timestep: 0.01 };

/**
 * @author sabidib
 */

Flory.Entity = function(){
	this.id = Flory.Entity.entityIDCount++;
	this.name = '';
}







Flory.Entity.entityIDCount = 0;



/**
 * @author sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field = function(data){
	this.data = [];
	for( var i = 0, len = data.length; i < len;i++){
		this.data[i] = {}

		if(data[i].position == undefined){
			this.data[i].position = new Flory.Vector(data[i][0]); 		
		} else if(data[i].position instanceof Array){
			this.data[i].position = new Flory.Vector(data[i].position);
		} else if(data[i].position.components != undefined){
			this.data[i].position = data[i].position.clone();
		}



		if(data[i].vector == undefined){
			this.data[i].vector = new Flory.Vector(data[i][1]); 		
		} else if(data[i].vector instanceof Array){
			this.data[i].vector = new Flory.Vector(data[i].vector);
		} else if(data[i].vector.components != undefined){
			this.data[i].vector = data[i].vector.clone();
		}


	}
}


Flory.Field.prototype = {
	constructor : Flory.Field,
	//TODO: OPTIMIZE THIS... it is currently O(n)
	/**
	 * Returns the force at the given position
	 * by finding the closest point to the given position and returning
	 * the associated vector
	 * 
	 * @param  {Vector} position 
	 * @return {Vector}		The force at the given position          
	 */
	getForce : function(position){
		var closest = 0;
		var index_of_closest = 0;
		for( var i = 0, len = this.data.length; i < len ; i++){
			var cur_dist = this.data[i].position.distanceToSq(position);
			if(cur_dist < closest){
				index_of_closest = i;
				closest = cur_dist;
			}
		}
		return this.data[index_of_closest].vector;
	},	

	scale : function(num){
		for( var i =0, len = this.data.length; i < len; i++){
			this.data[i].vector.scale(num);
		}
	},

	clone : function(){
		return new Flory.Field(this.data);
	}
}
/**
 * @author sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field2D = function(data){
	this.data = [];
	for( var i = 0, len = data.length; i < len;i++){
		this.data[i] = {}

		if(data[i].position == undefined){
			this.data[i].position = new Flory.Vector2(data[i][0][0],data[i][0][1]); 		
		} else if(data[i].position instanceof Array){
			this.data[i].position = new Flory.Vector2(data[i].position[0] , data[i].position[1]);
		} else if(data[i].position.x != undefined && data[i].position.y != undefined){
			this.data[i].position = data[i].position.clone();
		}

		if(data[i].vector == undefined){
			this.data[i].vector = new Flory.Vector2(data[i][1][0],data[i][1][1]); 		
		} else if(data[i].vector instanceof Array){
			this.data[i].vector = new Flory.Vector2(data[i].vector[0] , data[i].vector[1]);
		} else if(data[i].vector.x != undefined && data[i].vector.y != undefined){
			this.data[i].vector = data[i].vector.clone();
		}

	}
}


Flory.Field2D.prototype = {
	constructor : Flory.Field2D,
	//TODO: OPTIMIZE THIS... it is currently O(n)
	/**
	 * Returns the force at the given position
	 * by finding the closest point to the given position and returning
	 * the associated vector
	 * 
	 * @param  {Vector2} position 
	 * @return {Vector2}		The force at the given position          
	 */
	getForce : function(position){
		var closest = 0;
		var index_of_closest = 0;
		for( var i = 0, len = this.data.length; i < len ; i++){
			var cur_dist = this.data[i].position.distanceToSq(position);
			if(cur_dist < closest){
				index_of_closest = i;
				closest = cur_dist;
			}
		}
		return this.data[index_of_closest].vector;
	},	

	scale : function(num){
		for( var i =0, len = this.data.length; i < len; i++){
			this.data[i].vector.scale(num);
		}
	},

	clone : function(){
		return new Flory.Field2D(this.data);
	}
}
/**
 * @author sabidib
 */

/**
 * Creates a field where a vector is associated with an approximate position.
 * @param {Array} data Each element of the data array must be an object containing
 *                     a |position| and a |vector| property. 
 */
Flory.Field3D = function(data){
	this.data = [];
	for( var i = 0 ,len = data.length; i < len;i++){
		this.data[i] = {}

		if(data[i].position == undefined){
			this.data[i].position = new Flory.Vector3(data[i][0][0],data[i][0][1],data[i][0][2]); 		
		} else if(data[i].position instanceof Array){
			this.data[i].position = new Flory.Vector3(data[i].position[0] , data[i].position[1],data[i].position[2]);
		} else if(data[i].position.x != undefined && data[i].position.y != undefined && data[i].position.z != undefined){
			this.data[i].position = data[i].position.clone();
		}

		if(data[i].vector == undefined){
			this.data[i].vector = new Flory.Vector3(data[i][1][0],data[i][1][1],data[i][1][2]); 		
		} else if(data[i].vector instanceof Array){
			this.data[i].vector = new Flory.Vector3(data[i].vector[0] , data[i].vector[1],data[i].vector[2]);
		} else if(data[i].vector.x != undefined && data[i].vector.y != undefined && data[i].postiion.z != undefined){
			this.data[i].vector = data[i].vector.clone();
		}

	}
}


Flory.Field3D.prototype = {
	constructor : Flory.Field3D,
	//TODO: OPTIMIZE THIS... it is currently O(n)
	/**
	 * Returns the force at the given position
	 * by finding the closest point to the given position and returning
	 * the associated vector
	 * 
	 * @param  {Vector3} position 
	 * @return {Vector3}		The force at the given position          
	 */
	getForce : function(position){
		var closest = 0;
		var index_of_closest = 0;
		for( var i = 0, len = this.data.length; i < len ; i++){
			var cur_dist = this.data[i].position.distanceToSq(position);
			if(cur_dist < closest){
				index_of_closest = i;
				closest = cur_dist;
			}
		}
		return this.data[index_of_closest].vector;
	},	

	scale : function(num){
		for( var i =0, len = this.data.length; i < len; i++){
			this.data[i].vector.scale(num);
		}
	},

	clone : function(){
		return new Flory.Field3D(this.data);
	}
}

/**
 * @author sabidib
 */

Flory.Vector3 = function(x,y,z){
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
	this.z = (z === undefined) ? 0 : z; 
}



Flory.Vector3.prototype = {
	constructor : Flory.Vector3,

	//** Mandatory for all vector classes **//
	
	dimension : function(){
		return 3;
	},

	add : function(a){
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;

		return this;
	},

	sub : function(a){
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;

		return this;
	},

	scale : function(num){
		this.x *= num;
		this.y *= num;
		this.z *= num;
		
		return this;
	},
	mult : function(num){
		return new Flory.Vector3(this.x*num, this.y*num,this.z*num);
	},
	
	dot : function(a){
		return this.x * a.x + this.y * a.y + this.z * a.z;
	},

	length : function(){
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	},

	lengthSq : function(){
		return this.x*this.x + this.y*this.y + this.z*this.z;
	},
	
	distanceTo : function(a){
		return Math.sqrt((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y) + (a.z - this.z)*(a.z - this.z)); 
	},

	distanceToSq : function(a){
		return ((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y) + (a.z - this.z)*(a.z - this.z)); 
	},

	clone : function(){
		return new Flory.Vector3(this.x,this.y,this.z);
	}
};
/**
 * @author sabidib
 */

Flory.Vector2 = function(x,y){
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
}



Flory.Vector2.prototype = {
	constructor : Flory.Vector2,

	//** Mandatory for all vector classes **//
	
	dimension : function(){
		return 2;
	},

	add : function(a){
		this.x += a.x;
		this.y += a.y;

		return this;
	},

	sub : function(a){
		this.x -= a.x;
		this.y -= a.y;

		return this;
	},
	scale : function(num){
		this.x *= num;
		this.y *= num;
		
		return this;
	},
	mult : function(num){
		return new Flory.Vector2(this.x*num, this.y*num);
	},
	dot : function(a){
		return this.x * a.x + this.y * a.y ;
	},

	length : function(){
		return Math.sqrt(this.x*this.x + this.y*this.y );
	},

	lengthSq : function(){
		return this.x*this.x + this.y*this.y;
	},
	
	distanceTo : function(a){
		return Math.sqrt((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y)); 
	},

	distanceToSq : function(a){
		return ((a.x - this.x)*(a.x - this.x) + (a.y - this.y)*(a.y - this.y)); 
	},

	clone : function(){
		return new Flory.Vector2(this.x,this.y);
	}
};
/**
 * @author sabidib
 */

/**
 * A general vector class that chooses the dimension based on the number of elements
 * in the Flory.Vector.componenets variable.
 * The drawback is that some of the calculations take a little longer and is only compatible
 * with other Flory.Vector objects.
 * @param {Array} vec An array of number values that represent each component of the vector
 */
Flory.Vector = function(vec){
	this.components = vec;
}



Flory.Vector.prototype = {
	constructor : Flory.Vector,

	//** Mandatory for all vector classes **//
	dimension : function(){
		return this.components.length;
	},
	add : function(a){
		for(var i = 0,len = this.a.length;i < len; i++){
			this.components[i] += a[i]; 
		}
		return this;
	},

	sub : function(a){
		for(var i = 0,len = this.a.length;i < len; i++){
			this.components[i] -= a[i]; 
		}
		return this;
	},
	
	scale : function(num){
		for(var i = 0, len = this.components.length; i <len; i++){
			this.components[i] *= num;
		}

		return this;
	},
	mult : function(num){
		components = [];
		for(var i = 0, len = this.components.length; i <len; i++){
			components[i] = num*this.components[i];
		}
		return new Flory.Vector(components);
	},
	
	dot : function(a){
		if(a.length != b.length){
			console.log("Flory.vector.dot(a) can only accept a vector of the same dimension as the object.")
			return undefined;
		}
		var sum = 0;
		for(var i = 0,len = this.a.length;i < len; i++){
			sum += this.components[i] *a[i]; 
		}
		return sum;
	},

	length : function(){
		var sum = 0;

		for(var i = 0,len = this.components.length;i < len; i++){
			sum  += this.components[i]*this.components[i]; 
		}

		return Math.sqrt(sum);
	},

	lengthSq : function(){
		var sum = 0;

		for(var i = 0,len = this.components.length;i < len; i++){
			sum  += this.components[i]*this.components[i]; 
		}
		return sum;
	},
	
	distanceTo : function(a){
		var sum = 0;

		for(var i = 0,len = this.a.length;i < len; i++){
			sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
		}

		for(var i = 0,len = this.components.length,len2 = this.components.length-this.a.length; len2 < len;i++){
			sum += this.components[i+len]*this.components[i+len];
		}

		return Math.sqrt(sum);
	},

	distanceToSq : function(a){

		var sum = 0;

		for(var i = 0,len = this.a.length;i < len; i++){
			sum  += (this.components[i] - a.components[i])*(this.components[i] - a.components[i]); 
		}

		for(var i = 0,len = this.components.length,len2 = this.components.length-this.a.length; len2 < len;i++){
			sum += this.components[i+len]*this.components[i+len];
		}

		return sum;
	},

	clone : function(){
		return new Flory.Vector(this.x,this.y,this.z);
	}
};

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new Flory.RandomGen();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new Flory.RandomGen(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

Flory.RandomGen = function(seed) {
  if (seed == undefined) {
    seed = new Date().getTime();
  } 
  /* Period parameters */  
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
 
  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

  this.init_genrand(seed);
}  
 
/* initializes mt[N] with a seed */
Flory.RandomGen.prototype.init_genrand = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti=1; this.mti<this.N; this.mti++) {
      var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
   this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
  + this.mti;
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[this.mti] >>>= 0;
      /* for >32 bit machines */
  }
}
 
/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
Flory.RandomGen.prototype.init_by_array = function(init_key, key_length) {
  var i, j, k;
  this.init_genrand(19650218);
  i=1; j=0;
  k = (this.N>key_length ? this.N : key_length);
  for (; k; k--) {
    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
      + init_key[j] + j; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++; j++;
    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
    if (j>=key_length) j=0;
  }
  for (k=this.N-1; k; k--) {
    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
      - i; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  }

  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ 
}
 
/* generates a random number on [0,0xffffffff]-interval */
Flory.RandomGen.prototype.genrand_int32 = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
    var kk;

    if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
      this.init_genrand(5489); /* a default initial seed is used */

    for (kk=0;kk<this.N-this.M;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (;kk<this.N-1;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
    this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
}
 
/* generates a random number on [0,0x7fffffff]-interval */
Flory.RandomGen.prototype.genrand_int31 = function() {
  return (this.genrand_int32()>>>1);
}
 
/* generates a random number on [0,1]-real-interval */
Flory.RandomGen.prototype.genrand_real1 = function() {
  return this.genrand_int32()*(1.0/4294967295.0); 
  /* divided by 2^32-1 */ 
}

/* generates a random number on [0,1)-real-interval */
Flory.RandomGen.prototype.random = function() {
  return this.genrand_int32()*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on (0,1)-real-interval */
Flory.RandomGen.prototype.genrand_real3 = function() {
  return (this.genrand_int32() + 0.5)*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on [0,1) with 53-bit resolution*/
Flory.RandomGen.prototype.genrand_res53 = function() { 
  var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; 
  return(a*67108864.0+b)*(1.0/9007199254740992.0); 
} 

/* These real versions are due to Isaku Wada, 2002/01/09 added */
/**
 * @author sabidib
 */


Flory.Monomer2D = function(radius,charge,position,velocity,acceleration){
    this.radius = (radius != undefined ? radius : Flory.Monomer2D.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);

    Flory.Entity.call(this);

    if(position == undefined){
        this.position = new Flory.Vector2(0,0);
    } else if(position instanceof Array){
        this.position = new Flory.Vector2(position[0],position[1]);
    } else if(position.x != undefined && position.y != undefined){
        this.position = new Flory.Vector2(position.x,position.y);
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector2(0,0);
    } else if(velocity instanceof Array){
        this.velocity = new Flory.Vector2(velocity[0],velocity[1]);
    } else if(velocity.x != undefined && velocity.y != undefined){
        this.velocity = new Flory.Vector2(velocity.x,velocity.y);
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector2(0,0);
    } else if(acceleration instanceof Array){
        this.acceleration = new Flory.Vector2(acceleration[0],acceleration[1]);
    } else if(acceleration.x != undefined && acceleration.y != undefined){
        this.acceleration = new Flory.Vector2(acceleration.x,acceleration.y);
    }

}

Flory.Monomer2D.prototype = Object.create( Flory.Entity.prototype);


Flory.Monomer2D.prototype.update = function(){
        this.velocity.add(this.acceleration.mult(Flory.timestep));
        this.position.add(this.velocity.mult(Flory.timestep*0.5));
        return this;
    };
Flory.Monomer2D.prototype.incrementX = function(amount){
        this.position.x += amount;
        return this;
    };

Flory.Monomer2D.prototype.incrementY =  function(amount){
        this.position.y += amount;
        return this;
    };
Flory.Monomer2D.prototype.distanceTo =  function(a){
        return this.position.distanceTo(a.position);
    };
Flory.Monomer2D.prototype.distanceToSq = function(a){
        return this.position.distanceToSq(a.position);
    };
Flory.Monomer2D.prototype.clone = function(){
        return new Flory.Monomer2D(this.radius,this.position);
    };




Flory.Monomer2D.defaultRadius = 1;
/**
 * @author sabidib
 */


Flory.Monomer3D = function(radius,charge,position,velocity,acceleration){
    this.radius = (radius !== undefined ? radius : Flory.Monomer3D.defaultRadius);
    this.charge = (charge !== undefined ? charge : 0);

    Flory.Entity.call(this);

    if(position == undefined){
        this.position = new Flory.Vector3(0,0);
    } else if(position instanceof Array){
        this.position = new Flory.Vector3(position[0],position[1]);
    } else if(position.x != undefined && position.y != undefined && position.z != undefined){
        this.position = new Flory.Vector3(position.x,position.y);
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector3(0,0);
    } else if(velocity instanceof Array){
        this.velocity = new Flory.Vector3(velocity[0],velocity[1]);
    } else if(velocity.x != undefined && velocity.y != undefined && velocity.z != undefined){
        this.velocity = new Flory.Vector3(velocity.x,velocity.y);
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector3(0,0);
    } else if(acceleration instanceof Array){
        this.acceleration = new Flory.Vector3(acceleration[0],acceleration[1]);
    } else if(acceleration.x != undefined && acceleration.y != undefined && acceleration.z != undefined){
        this.acceleration = new Flory.Vector3(acceleration.x,acceleration.y);
    }

}

Flory.Monomer3D.prototype = Object.create(Flory.Entity.prototype);


Flory.Monomer3D.prototype.update = function(){
        this.velocity.add(this.acceleration.scale(Flory.timestep));
        this.position.add(this.velocity.scale(Flory.timestep).scale(0.5));
        return this;
    };

Flory.Monomer3D.prototype.incrementX = function(amount){
        this.position.x += amount;
        return this;
    };

Flory.Monomer3D.prototype.incrementY =  function(amount){
        this.position.y += amount;
        return this;
    };

Flory.Monomer3D.prototype.incrementZ =  function(amount){
        this.position.z += amount;
        return this;
    };

Flory.Monomer3D.prototype.distanceTo = function(a){
        return this.position.distanceTo(a.position);
    };

Flory.Monomer3D.prototype.distanceToSq = function(a){
        return this.position.distanceToSq(a.position);
    };

Flory.Monomer3D.prototype.clone = function(){
        return new Flory.Monomer3D(this.radius,this.position);
    };



Flory.Monomer3D.defaultRadius = 1;
/**
 * @author sabidib
 */


Flory.Monomer = function(radius,charge,position,velocity,acceleration){
    this.radius = (radius != undefined ? radius : Flory.Monomer.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);
    
    Flory.Entity.call(this);

    if(position.components == undefined && position instanceof Array){
        this.position = new Flory.Vector(position);    
    } else {
        this.position = position.clone();        
    }

    if(velocity.components == undefined && velocity instanceof Array){
        this.velocity = new Flory.Vector(velocity);
    } else {
        this.velocity = velocity.clone();
    }

    if(acceleration.components == undefined && acceleration instanceof Array){
        this.acceleration = new Flory.Vector(acceleration);
    } else {
        this.acceleration = acceleration.clone();
    }

}


Flory.Nonomer.prototype = Object.create(Flory.Entity.prototype);


Flory.Monomer.prototype.update = function(){
        this.velocity.add(this.acceleration.scale(Flory.timestep));
        this.position.add(this.velocity.scale(Flory.timestep).scale(0.5));
        return this;
    };

    /**
     * Given the dimension index, will increment
     * the component by amount
     * @param  {Integer} dimension the dimension to increment.
     * @param  {Double} amount    the amount to increment the dimension by [-inf,+inf];
     * @return {Flory.Monomer}      returns itself.
     */
Flory.Monomer.prototype.incrementDimension = function(dimension,amount){
        this.position.components[dimension] += amount;
        return this;
    };

Flory.Monomer.prototype.distanceTo = function(a){
        return this.position.distanceTo(a.position);
    };

Flory.Monomer.prototype.distanceToSq =  function(a){
        return this.position.distanceToSq(a.position);
    };

Flory.Monomer.prototype.clone = function(){
        return new Flory.Monomer3D(this.radius,this.position);
    };




Flory.Monomer.defaultRadius = 1;
