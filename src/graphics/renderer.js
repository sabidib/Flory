/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
Flory.Renderer = function(canvas, data, scene, camera, renderables) {
    this.data = {};
    if (canvas != undefined) {
        if (Flory.isWebGlAvailable()) {
            this.renderer = new THREE.WebGLRenderer();
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        if (this.renderer == undefined) {
            console.log("Flory : WebGL is not supported in your browser.");
        }
        if(data != undefined && data.size != undefined){
            this.renderer.setSize(data.size[0],data.size[1]);
        } else {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }


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
    this.camera = (camera === undefined) ? new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000) : camera;

    var cameraPosition = new Flory.Vector3([0, 0, 100]);
    if (data != undefined && data.cameraPosition != undefined) {
        cameraPosition = new Flory.Vector3(data.cameraPosition);
    }
    this.camera.position.set(cameraPosition.components[0], cameraPosition.components[1], cameraPosition.components[2]);
    this.camera.up = new THREE.Vector3(0, 0, 1);

    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    this.renderables = (renderables === undefined) ? {} : renderables;
    this.camera.z = 20;
    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.addEventListener('change', function() {
        this.render
    });
    // this.refreshCamera(data,undefined);
    
    this.renderables = (renderables === undefined) ? {} : renderables;
}


Flory.Renderer.prototype = {
    constructor: Flory.Renderer,
    refreshCamera : function(data,camera){
        var cameraPosition = new Flory.Vector3([0, 0, 100]);
        if(this.camera != undefined){
            cameraPosition = this.camera.position;
            this.scene.remove(this.camera);
        }
        if(this.controls != undefined){
            this.controls.removeEventListener("change");
        }

        var width  = window.innerWidth;
        var height = window.innerHeight;
        if(data != undefined && data.size != undefined){
            width = data.size[0]
            height = data.size[1]
        } 
        this.camera = (camera === undefined) ? new THREE.PerspectiveCamera(60, width / height, 1, 10000) : camera;

        if (data != undefined && data.cameraPosition != undefined) {
            cameraPosition = new Flory.Vector3(data.cameraPosition);
        }
        this.camera.position.set(cameraPosition.components[0], cameraPosition.components[1], cameraPosition.components[2]);
        this.camera.up = new THREE.Vector3(0, 0, 1);

        this.camera.lookAt(this.scene.position);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.addEventListener('change', function() {
            this.render
        });

        this.scene.add(this.camera);
    },
    addRenderable: function(renderable) {
        if (renderable instanceof Flory.Renderable) {
            this.renderables[renderable.id] = renderable;
            this.scene.add(this.renderables[renderable.id].mesh);
        } else {
            console.log("Flory : Attempted to add an object to Flory.Renderer.renderables that did not inherit from Flory.Renderable.")
            return this;
        }
    },
    setClearColor: function(color) {
        this.renderer.setClearColor(color);
    },
    setCameraPosition: function(position) {
        if (position != undefined &&
            position.components[0] != undefined &&
            position.components[1] != undefined &&
            position.components[2] != undefined) {
            this.camera.position.set(position.components[0], position.components[1], position.components[2]);
        }

    },
    createHelperGrid: function(size, steps, plane, position) {
        var toR = plane.toUpperCase().split("").sort().join("");
        var grid = new THREE.GridHelper(size, steps);
        if (toR == "XY") {
            grid.rotation.x = Math.PI / 2;
        } else if (toR == "YZ") {
            grid.rotation.z = Math.PI / 2;
        }
        if (position != undefined) {
            grid.position.set(position.components[0], position.components[1], position.components[2]);
        }

        this.scene.add(grid);
    },
    createAxis: function(axisSize, axisPosition) {
        var axes = new THREE.AxisHelper(axisSize);
        if (axisPosition != undefined) {
            axes.position.set(position.components[0], position.components[1], position.components[2]);
        }
        this.scene.add(axes);
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
        //  this.renderables[i].mesh.position.x = new_position.x;
        //  this.renderables[i].mesh.position.y = new_position.y;
        // } else if(new_position instanceof Flory.Vector3){
        //  this.renderables[i].mesh.position.x = new_position.x;
        //  this.renderables[i].mesh.position.y = new_position.y;
        //  this.renderables[i].mesh.position.z = new_position.z;
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
    destroyAllRenderables : function(){
        for (var i in this.renderables) {
            this.renderables[i].destroy();
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
    },
    destroy : function(){
        this.removeAllRenderables();
    },
    destroyCanvas : function(){
        $(this.renderer.domElement).remove()
    }
}



Flory.Renderer.ShaderTypes = {}
