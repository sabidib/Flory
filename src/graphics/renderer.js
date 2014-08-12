/**
 * @author sabidib
 */

Flory.Renderer = function(scene,camera,renderables){
	if(this.canvas !== null){
		this.renderer = new THREE.WebGLRenderer();
		if(this.renderer == undefined){
			console.log("Flory : WebGL is not supported in your browser.");
		}
		this.renderer.setSize(window.innerWidth,window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	}  else {
		console.log("Flory : A canvas_id must be specified.");
	}

	this.scene = (scene === undefined)? new THREE.Scene : scene;
	this.camera = (camera === undefined)? new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000) : camera;
	this.camera.position.set(0,0,10);
	this.camera.up = new THREE.Vector3(0,0,1);
	this.camera.lookAt(this.scene.position);	
	this.scene.add(this.camera);
	this.renderables = (renderables === undefined) ? [] : renderables;
}


Flory.Renderer.prototype = {
	constructor : Flory.Renderer,

	setDimension : function(width,height){
		this.renderer.setSize(width, height);
		return this;
	},
	addRenderable : function(renderable){
		if(renderable instanceof Flory.Renderable){
			var m = this.renderables.push(renderable);
			this.scene.add(this.renderables[m - 1].mesh);
		} else {
			console.log("Flory : Attempted to add an object to Flory.Renderer.renderables that did not inherit from Flory.Renderable.")
			return this;
		}
	},
	updateRenderablePosition : function(renderable){
		for(var i = 0, len = this.renderables.length;i< len;i++){
			if(renderable.id == this.renderables[i].id){
				new_position = renderable.position;
				if(new_position instanceof Flory.Vector){
					dim = new_position.dimension();
					if(dim == 3){
						this.renderables[i].mesh.position.x = new_position.components[0];
						this.renderables[i].mesh.position.y = new_position.components[1];
						this.renderables[i].mesh.position.z = new_position.components[2];
					} else if(dim == 2){
						this.renderables[i].mesh.position.x = new_position.components[0];
						this.renderables[i].mesh.position.y = new_position.components[1];
					} else if(dim == 1){
						this.renderables[i].mesh.position.x = new_position.components[0];
					} else if(dim > 3){
						this.renderables[i].mesh.position.x = new_position.components[0];
						this.renderables[i].mesh.position.y = new_position.components[1];
						this.renderables[i].mesh.position.z = new_position.components[2];
					}
				} else if(new_position instanceof Flory.Vector2){
					this.renderables[i].mesh.position.x = new_position.x;
					this.renderables[i].mesh.position.y = new_position.y;
				} else {
					this.renderables[i].mesh.position.x = new_position.x;
					this.renderables[i].mesh.position.y = new_position.y;
					this.renderables[i].mesh.position.z = new_position.z;
				}
			}
		}
	},
	removeRenderable : function(id){
		for(var i = 0, len = this.renderables.length; i < len ; i++){
			if(this.renderables[i].id == id){
				this.scene.remove(this.renderables[i]);
				this.renderables = this.renderables.splice(i,1);
				break;
			}
		}
		return this;
	},
	removeAllRenderables : function(){
		for(var i = 0, len = this.renderables.length;i  < len;i++){
			this.scene.remove(this.renderables[i]);
		}
		this.renderables = [];
		return this;
	},
	render : function(){
		this.renderer.render(this.scene,this.camera);
		return this;
	}
}



Flory.Renderer.ShaderTypes = {}


