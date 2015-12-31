/**
 * @author sabidib
 */
/** @constructor */
Flory.Renderer = function(canvas, scene, camera, renderables) {
    this.data = {};
    if (canvas != undefined) {
        this.renderer = new THREE.WebGLRenderer();
        if (this.renderer == undefined) {
            console.log("Flory : WebGL is not supported in your browser.");
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        var cav = document.getElementById("#" + canvas);
        if (cav == null) {
            cav = document.getElementById(canvas);
            if (cav == null) {
                console.log("Flory: A canvas must be a valid id.")
            }
        }
        this.canvas = cav;
        cav.appendChild(this.renderer.domElement);
    } else {
        console.log("Flory : A canvas_id must be specified.");
        return undefined;
    }

    this.scene = (scene === undefined) ? new THREE.Scene() : scene;
    this.camera = (camera === undefined) ? new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000) : camera;
    this.camera.position.set(0, 0, 100);
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    this.renderables = (renderables === undefined) ? {} : renderables;
    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', function() {
        this.render
    });
}


Flory.Renderer.prototype = {
    constructor: Flory.Renderer,
    addRenderable: function(renderable) {
        if (renderable instanceof Flory.Renderable) {
            this.renderables[renderable.id] = renderable;
            this.scene.add(this.renderables[renderable.id].mesh);
        } else {
            console.log("Flory : Attempted to add an object to Flory.Renderer.renderables that did not inherit from Flory.Renderable.")
            return this;
        }
    },
    updateRenderablePosition: function(renderable) {
        var i = renderable.id;
        var new_position = renderable.position;
        if (new_position instanceof Flory.baseVector) {
            var dim = new_position.dimension();
            if (dim == 3) {
                this.renderables[i].mesh.position.x = new_position.components[0];
                this.renderables[i].mesh.position.y = new_position.components[1];
                this.renderables[i].mesh.position.z = new_position.components[2];
            } else if (dim == 2) {
                this.renderables[i].mesh.position.x = new_position.components[0];
                this.renderables[i].mesh.position.y = new_position.components[1];
            } else if (dim == 1) {
                this.renderables[i].mesh.position.x = new_position.components[0];
            } else {
                this.renderables[i].mesh.position.x = new_position.components[0];
                this.renderables[i].mesh.position.y = new_position.components[1];
                this.renderables[i].mesh.position.z = new_position.components[2];
            }

        } else {
            console.log("Flory: position of entity is not a baseVector ancestor.");
            return undefined;
        }
        // } else if(new_position instanceof Flory.Vector2){
        // 	this.renderables[i].mesh.position.x = new_position.x;
        // 	this.renderables[i].mesh.position.y = new_position.y;
        // } else if(new_position instanceof Flory.Vector3){
        // 	this.renderables[i].mesh.position.x = new_position.x;
        // 	this.renderables[i].mesh.position.y = new_position.y;
        // 	this.renderables[i].mesh.position.z = new_position.z;
        // }
        return this;
    },
    removeRenderable: function(id) {
        for (var i in this.renderables) {
            if (this.renderables[i].id == id) {
                this.scene.remove(this.renderables[i]);
                this.renderables = this.renderables.splice(i, 1);
                break;
            }
        }
        return this;
    },
    removeAllRenderables: function() {
        for (var i in this.renderables) {
            this.scene.remove(this.renderables[i]);
        }
        this.renderables = [];
        return this;
    },
    /** The following should be not be overriden **/
    setDimension: function(width, height) {
        this.renderer.setSize(width, height);
        return this;
    },
    render: function() {
        this.renderer.render(this.scene, this.camera);
        return this;
    }
}



Flory.Renderer.ShaderTypes = {}
