/**
 * @author sabidib
 */

/** @constructor */
Flory._CoreEnvironment =
    function() {
        this.entities = [];
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
    enableVisualization: function(data) {
        if (this.data.rendererType ==
            Flory._CoreEnvironment.RendererType.Default ||
            this.data.rendererType == "") {
            this.renderer = new Flory.Renderer();
        } else if (this.data.rendererType ==
            Flory._CoreEnvironment.RendererType.PointCloud) {
            this.renderer = new Flory.PointCloudRenderer();
        }
        this.visualization = true;
        this.setUpVisualization(data);
        return this;
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
            	this.renderer.updateRenderablePosition(this.entities[i]);
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
