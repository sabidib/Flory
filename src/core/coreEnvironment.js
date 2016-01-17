/**
 * @author sabidib http://github.com/sabidib
 */
/** @constructor */
/*global Flory*/
'use strict';
Flory.CoreEnvironment = function () {
    this.entities = [];
    this.handlers = [];
    this.renderer = undefined;
    this.data = {};
    this.visualization = false;
    this.data.rendererType = Flory.CoreEnvironment.RendererType.Default;
};
Flory.CoreEnvironment.prototype = {
    constuctor: Flory.CoreEnvironment,
    add: function (entity) {
        if (this.id === entity.id) {
            console.log('Flory: Can\'t add an entity to itself.');
        } else {
            var len = this.entities.length;
            var i;
            for (i = 0; i < len; i += 1) {
                if (this.entities[i].id === entity.id) {
                    console.log('Flory : Can\'t add an entity twice to the same environment.');
                    return undefined;
                }
            }
            this.addedEntity(this.entities[this.entities.push(entity) - 1]);
        }
        return this;
    },
    destroyScene: function () {
        this.renderer.destroyAllRenderables();
        this.renderer.destroyCanvas();
        this.entities = [];
        this.handlers = [];
        this.renderer = undefined;
        this.visualization = false;
    },
    remove: function (entity) {
        var len = this.entities.length;
        var i = 0;
        for (i = 0; i < len; i += 1) {
            if (this.entities[i].id === entity.id) {
                this.entities.splice(i);
                this.removedEntity(entity, entity.id, i);
            }
        }
        return this;
    },
    removedEntity: function (entity, id, index) {
    },
    addedEntity: function () {
    },
    update: function (data) {
    },
    enableVisualization: function (canvas, data) {
        if (this.data.rendererType === Flory.CoreEnvironment.RendererType.Default || this.data.rendererType === '') {
            this.renderer = new Flory.Renderer(canvas, data);
        } else if (this.data.rendererType === Flory.CoreEnvironment.RendererType.PointCloud) {
            this.renderer = new Flory.PointCloudRenderer(canvas, data);
        }
        this.visualization = true;
        if (data !== undefined) {
            if (data.clearColor !== undefined) {
                this.renderer.setClearColor(data.clearColor);
            }
            if (data.grid !== undefined && data.grid === true) {
                this.addGrid(data.gridSize, data.gridSteps, data.gridPlane, data.gridPosition);
            }
            if (data.axis !== undefined && data.axis === true) {
                this.addAxis(data.axisSize, data.axisPosition);
            }
        }
        this.setUpVisualization(data);
        return this;
    },
    addGrid: function (gridSize, gridSteps, gridPlane, gridPosition) {
        var size = 100;
        var steps = 10;
        var plane = 'xy';
        var position;
        if (gridSize !== undefined) {
            size = gridSize;
        }
        if (gridSteps !== undefined) {
            steps = gridSteps;
        }
        if (gridPlane !== undefined) {
            plane = gridPlane;
        }
        if (gridPosition !== undefined) {
            position = new Flory.Vector3(gridPosition);
        }
        this.renderer.createHelperGrid(size, steps, plane, position);
    },
    addAxis: function (axisSize, axisPosition) {
        var position;
        var size = 2;
        if (axisSize !== undefined) {
            size = axisSize;
        }
        if (axisPosition !== undefined) {
            position = new Flory.Vector3(axisPosition);
        }
        this.renderer.createAxis(size, position);
    },
    disableVisualization: function () {
        var elem = this.renderer.renderer.domElement;
        elem.parentElement.removeChild(elem);
        this.renderer = undefined;
        this.visualization = false;
        this.disabledVisualization();
        return this;
    },
    setUpVisualization: function () {
    },
    disabledVisualization: function () {
    },
    resetEnvironment: function () {
    },
    setDimension: function (size) {
        if (size !== undefined && size instanceof Array) {
            this.renderer.setDimension(size[0], size[1]);
        } else if (size !== undefined && size instanceof Object) {
            this.renderer.setDimension(size.width, size.width);
        }
    },
    advance: function (options) {
        this.update(options);
        if (this.visualization) {
            var len = this.entities.length;
            var i;
            for (i = 0; i < len; i += 1) {
                if (this.entities[i] instanceof Flory.Renderable) {
                    this.renderer.updateRenderablePosition(this.entities[i]);
                }
            }
            this.render();
        }
        return this;
    },
    render: function () {
        this.renderer.render();
        return this;
    }
};
Flory.CoreEnvironment.RendererType = {
    Default: 'default',
    PointCloud: 'pointCloud'
};
