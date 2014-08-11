/**
 * @author sabidib
 */

Flory.Renderer = function(canvas_id){
	this.canvas = document.getElementById(canvas_id);

	if(this.canvas !== null){
		this.GL = this.canvas.getContext("webgl") || this.canvas.getContext('experimental-webgl');
		if(!this.GL){
			console.log("Flory : WebGL is not supported by your browser.");
		}
		this.GL.clearColor(0.0, 0.0, 0.0, 1.0);

		this.GL.enable(this.GL.DEPTH_TEST);                              
    	this.GL.depthFunc(this.GL.LEQUAL);                               
    	this.GL.clear(this.GL.COLOR_BUFFER_BIT|this.GL.DEPTH_BUFFER_BIT);     
		this.shaders = {};
		this.current_shader_program = {};

		Flory.Renderer.ShaderTypes = {
			"x-shader/x-fragment" : this.GL.FRAGMENT_SHADER,
			"x-shader/x-vertex"   : this.GL.VERTEX_SHADER
		}
	}  else {
		console.log("Flory : A canvas_id must be specified.");
	}
}


Flory.Renderer.prototype = {
	constructor : Flory.Renderer,

	setDimension : function(width,height){
		this.GL.viewport(0,0,width,height);
	},
	setVertexShader : function(shader){
		var shader_to_add = this.GL.createShader(Flory.Renderer.ShaderTypes[shader.type]);
		this.GL.shaderSource(shader_to_add,shader.source);
		this.GL.compileShader(shader_to_add);
		if(!this.GL.getShaderParameter(shader_to_add,GL.COMPILE_STATUS)){
			console.log("Flory.Renderer: Unable to compile added shader ;" + this.GL.getShaderInfoLog(shader_to_add));
			return this;
		}
		this.shaders.vertexShader = shader_to_add; 
		this.linkShaders();
		return this;
	},
	setFragmentShader : function(shader){
		var shader_to_add = this.GL.createShader(Flory.Renderer.ShaderTypes[shader.type]);
		this.GL.shaderSource(shader_to_add,shader.source);
		this.GL.compileShader(shader_to_add);
		if(!this.GL.getShaderParameter(shader_to_add,GL.COMPILE_STATUS)){
			console.log("Flory.Renderer: Unable to compile added shader ;" + this.GL.getShaderInfoLog(shader_to_add));
			return this;
		}
		this.shaders.fragmentShader = shader_to_add;
		this.linkShaders();
		return this;
	},
	render : function(){

	},
	linkShaders : function(){
		this.current_shader_program = this.GL.createProgram();
		for(var i = 0; i < this.shaders.length;i++){
			this.GL.attachShader(this.current_shader_program,this.shaders[i].shader);
		}
		this.GL.linkProgram(this.current_shader_program);
		if(!this.GL.getProgramParameter(this.current_shader_program,this.GL.LINK_STATUS)){
			console.log("Flory.Renderer: Unable to create the shader program. Check list of shaders.")
		}
		this.GL.useProgram(this.current_shader_program);
	}
}



Flory.Renderer.ShaderTypes = {}


