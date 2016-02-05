/**
 *  @author sabidib http://github.com/sabidib
 */
/*global Flory*/
/*jshint white*/
'use strict';


var Flory = { VERSION : '0.2',
              timestep: 0.01 ,
              RendererDefaults : {
                fov : 60,
                near_clip : 0.1,
                far_clip : 10000,
                camera_position : [80,80,70],
                auto_resize: true
              },
              VisualizationDefaults :{
                clearColor: 0xFFFFFF,
                grid : true,
                axis : true,
                axisSize : 10,
                gridPlane:"xy",
                gridSize : 100
              }
}


