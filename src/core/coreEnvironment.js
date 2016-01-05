/**
 * @author sabidib http://github.com/sabidib
 */

/** @constructor */
Flory._CoreEnvironment =
    function() {
        this.entities = [];
        this.handlers = [];
        this.renderer = {};
        this.data = {};
        this.visualization = false;
        this.data.rendererType = Flory._CoreEnvironment.RendererType.Default;
    }



Flory._CoreEnvironment.prototype = {

    constuctor: Flory._CoreEnvironment,

    add: function(entity) {
        if (this.id == entity.id) {
            console.log("Flory: Can't add an entity to itself.");
        } else {
            for (var i = 0, len = this.entities.length; i < len; i++) {
                if (this.entities[i].id === entity.id) {
                    console.log(
                        "Flory : Can't add an entity twice to the same environment.");
                    return undefined;
                }
            }
            this.addedEntity(
                this.entities[this.entities.push(entity) - 1]);
        }
        return this;
    },
    remove: function(entity) {
        for (var i = 0, len = this.entities.length; i < len; i++) {
            if (this.entities[i].id === entity.id) {
                this.entities.splice(i);
                this.removedEntity(entity, entity.id, i);
            }
        }
        return this;
    },
    removedEntity: function(entity, id, index) {

    },
    addedEntity: function() {

    },
    update: function(data) {

    },
    enableVisualization: function(canvas,data) {
        if (this.data.rendererType ==
            Flory._CoreEnvironment.RendererType.Default ||
            this.data.rendererType == "") {
            this.renderer = new Flory.Renderer(canvas,data);
        } else if (this.data.rendererType ==
            Flory._CoreEnvironment.RendererType.PointCloud) {
            this.renderer = new Flory.PointCloudRenderer(canvas,data);
        }
        this.visualization = true;
        if(data != undefined){
            if(data.clearColor != undefined){
                this.renderer.setClearColor(data.clearColor);
            }    
            if(data.grid != undefined && data.grid == true){
               this.addGrid(data.gridSize,data.gridSteps,data.gridPlane,data.gridPosition);
            }
            if(data.axis != undefined && data.axis == true){
                this.addAxis(data.axisSize,data.axisPosition);        
            }
        }

        this.setUpVisualization(data);
        return this;
    },
    addGrid: function(gridSize,gridSteps,gridPlane,gridPosition){
        size = 100;
        steps = 10;
        plane = "xy"
        position = undefined;
        if(gridSize != undefined){
            size =gridSize;
        }
        if(gridSteps != undefined){
            steps = gridSteps;
        }
        if(gridPlane != undefined){
            plane = gridPlane;
        }
        if(gridPosition != undefined){
            position = new Flory.Vector3(gridPosition);
        }
        this.renderer.createHelperGrid(size,steps,plane,position);
    },
    addAxis: function(axisSize, axisPosition) {
        position = undefined;
        size = 2;
        if (axisSize != undefined) {
            size = axisSize;
        }
        if(axisPosition != undefined){
            position = new Flory.Vector3(axisPosition);
        }
        this.renderer.createAxis(size,position);
    },
    disableVisualization: function() {
        this.renderer = {}
        var elem = this.renderer.renderer.domElement;
        elem.parentElement.removeChild(elem);
        this.visualization = false;
        this.disabledVisualization();
        return this;
    },
    setUpVisualization: function() {

    },
    disabledVisualization: function() {

    },
    resetEnvironment: function() {

    },
    advance: function(options) {
        this.update(options);
        if (this.visualization) {
            for (var i = 0, len = this.entities.length; i < len; i++) {
                if(this.entities[i] instanceof Flory.Renderable){
                    this.renderer.updateRenderablePosition(this.entities[i]);    
                }            	
            }        
            this.render();
        } 
        return this;
    },
    render : function(){
    	this.renderer.render();
        return this;
    }


}


Flory._CoreEnvironment.RendererType = {
    Default: "default",
    PointCloud: "pointCloud",
}
