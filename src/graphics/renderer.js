/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory,THREE,window,$,document*/
/*jslint white*/

'use strict';
Flory.Renderer = function (canvas, data, scene, camera, renderables) {
    this.data = {};

    var presets = this.getPresetsFromData(data);


    if (canvas !== undefined) {
        if (Flory.isWebGlAvailable()) {
            this.renderer = new THREE.WebGLRenderer();
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        if (this.renderer === undefined) {
            console.log('Flory : WebGL is not supported in your browser.');
        }

        var cav = document.getElementById('#' + canvas);
        if (cav === null) {
            cav = document.getElementById(canvas);
            if (cav === null) {
                console.log('Flory: A canvas must be a valid id.');
            }
        }

        var bounding_box = cav.getBoundingClientRect();
        if (data !== undefined && data.size !== undefined) {
            this._setDimension(data.size[0], data.size[1]);
        } else {
            this._setDimension(bounding_box.width,bounding_box.height);
        }
        this.canvas = cav;
        cav.appendChild(this.renderer.domElement);
    } else {
        console.log('Flory : A canvas_id must be specified.');
        return undefined;
    }

    this.scene = scene === undefined ? new THREE.Scene() : scene;
    this.camera = camera === undefined ? new THREE.PerspectiveCamera(presets.fov, this.width / this.height, presets.near_clip,presets.far_clip) : camera;
    cameraPosition = new Flory.Vector3(presets.camera_position);
    this.camera.position.set(cameraPosition.components[0], cameraPosition.components[1], cameraPosition.components[2]);
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    this.renderables = renderables === undefined ? {} : renderables;
    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    var self = this;
    controls.addEventListener('change', function () {
        return self.render();
    });
    var doAutoResize = {};
    doAutoResize = function(){
        if(self !== undefined){
            self.adjustRendererForCurrentSize();    
        } else {
            window.removeEventListener('resize',doAutoResize)
        }        
    }
    if(presets.auto_resize){
        window.addEventListener('resize',doAutoResize);    
    }    
    // this.refreshCamera(data,undefined);
    this.renderables = renderables === undefined ? {} : renderables;
};
Flory.Renderer.prototype = {
    constructor: Flory.Renderer,
    getPresetsFromData : function(data){
        if(data === undefined){
            return JSON.parse(JSON.stringify(Flory.RendererDefaults));
        }
        var preset = {};
        preset.fov = (data.fov === undefined) ? Flory.RendererDefaults.fov : data.fov;
        preset.near_clip = (data.near_clip === undefined) ? Flory.RendererDefaults.near_clip : data.near_clip;
        preset.far_clip = (data.far_clip === undefined) ? Flory.RendererDefaults.far_clip : data.far_clip;
        preset.auto_resize = (data.auto_resize === undefined) ? Flory.RendererDefaults.auto_resize : data.auto_resize;
        
        preset.camera_position = (data.camera_position === undefined) ? Flory.RendererDefaults.camera_position : data.camera_position;
        preset.camera_position = new Flory.Vector3(preset.camera_position);
        
        return preset;
    },
    refreshCamera: function (data, camera) {
        var cameraPosition = new Flory.Vector3([
            0,
            0,
            100
        ]);
        if (this.camera !== undefined) {
            cameraPosition = this.camera.position;
            this.scene.remove(this.camera);
        }
        if (this.controls !== undefined) {
            this.controls.removeEventListener('change');
        }
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (data !== undefined && data.size !== undefined) {
            width = data.size[0];
            height = data.size[1];
        }
        this.camera = camera === undefined ? new THREE.PerspectiveCamera(60, width / height, 1, 10000) : camera;
        if (data !== undefined && data.cameraPosition !== undefined) {
            cameraPosition = new Flory.Vector3(data.cameraPosition);
        }
        this.camera.position.set(cameraPosition.components[0], cameraPosition.components[1], cameraPosition.components[2]);
        this.camera.up = new THREE.Vector3(0, 0, 1);
        this.camera.lookAt(this.scene.position);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.addEventListener('change', function () {
            return this.render();
        });
        this.scene.add(this.camera);
    },
    addRenderable: function (renderable) {
        if (renderable instanceof Flory.Renderable) {
            this.renderables[renderable.id] = renderable;
            this.scene.add(this.renderables[renderable.id].mesh);
        } else {
            console.log('Flory : Attempted to add an object to Flory.Renderer.renderables that did not inherit from Flory.Renderable.');
            return this;
        }
    },
    setClearColor: function (color) {
        this.renderer.setClearColor(color);
    },
    setCameraPosition: function (position) {
        if (position !== undefined && position.components[0] !== undefined && position.components[1] !== undefined && position.components[2] !== undefined) {
            this.camera.position.set(position.components[0], position.components[1], position.components[2]);
        }
    },
    createHelperGrid: function (size, steps, plane, position) {
        var toR = plane.toUpperCase().split('').sort().join('');
        var grid = new THREE.GridHelper(size, steps);
        if (toR === 'XY') {
            grid.rotation.x = Math.PI / 2;
        } else if (toR === 'YZ') {
            grid.rotation.z = Math.PI / 2;
        }
        if (position !== undefined) {
            grid.position.set(position.components[0], position.components[1], position.components[2]);
        }
        this.scene.add(grid);
    },
    createAxis: function (axisSize, axisPosition) {
        var axes = new THREE.AxisHelper(axisSize);
        if (axisPosition !== undefined) {
            axes.position.set(axisPosition.components[0], axisPosition.components[1], axisPosition.components[2]);
        }
        this.scene.add(axes);
    },
    updateRenderablePosition: function (renderable) {
        var i = renderable.id;
        var new_position = renderable.position;
        var dim;
        if (new_position instanceof Flory.baseVector) {
            dim = new_position.dimension();
            if (dim === 3) {
                this.renderables[i].mesh.position.x = new_position.components[0];
                this.renderables[i].mesh.position.y = new_position.components[1];
                this.renderables[i].mesh.position.z = new_position.components[2];
            } else if (dim === 2) {
                this.renderables[i].mesh.position.x = new_position.components[0];
                this.renderables[i].mesh.position.y = new_position.components[1];
            } else if (dim === 1) {
                this.renderables[i].mesh.position.x = new_position.components[0];
            } else {
                this.renderables[i].mesh.position.x = new_position.components[0];
                this.renderables[i].mesh.position.y = new_position.components[1];
                this.renderables[i].mesh.position.z = new_position.components[2];
            }
        } else {
            console.log('Flory: position of entity is not a baseVector ancestor.');
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
    removeRenderable: function (id) {
        var i;
        var keys = Object.keys(this.renderables);
        var l = keys.length;
        for (i = 0; i < l; i += 1) {
            if (this.renderables[keys[i]].id === id) {
                this.scene.remove(this.renderables[keys[i]]);
                this.renderables = this.renderables.splice(i, 1);
                break;
            }
        }
        return this;
    },
    removeAllRenderables: function () {
        var i;
        var keys = Object.keys(this.renderables);
        var l = keys.length;
        for (i = 0; i < l; i += 1) {
            this.scene.remove(this.renderables[keys[i]]);
        }
        this.renderables = [];
        return this;
    },
    destroyAllRenderables: function () {
        var i;
        var keys = Object.keys(this.renderables);
        var l = keys.length;
        for (i = 0; i < l; i += 1) {
            this.renderables[keys[i]].destroy();
            this.scene.remove(this.renderables[keys[i]]);
        }
        this.renderables = [];
        return this;
    },
    adjustRendererForCurrentSize : function(){
        var bounding_box = this.canvas.getBoundingClientRect();
        this.renderer.setSize(bounding_box.width,bounding_box.height);
        return this;
    },
    setSize : function(width,height){
        this._setDimension(width,height)
        this.renderer.camera.aspect=width/float(height);
        this.renderer.camera.updateProjectionMatrix();
        return this;
    },
    /** The following should be not be overriden **/
    _setDimension: function (width, height) {
        this.renderer.setSize(width, height);
        this.width = width;
        this.height = height;
        return this;
    },
    render: function () {
        this.renderer.render(this.scene, this.camera);
        return this;
    },
    destroy: function () {
        this.removeAllRenderables();
    },
    destroyCanvas: function () {
        $(this.renderer.domElement).remove();
    }
};
Flory.Renderer.ShaderTypes = {};
