	/**
 * @author  sabidib
 * A simple class to display different values,
 * a class to abstract the DOM for the rest of the library
 *
 * The data is passed in a fashion similar to options
 * var disp  = 
 *
 * {
 * 	display : 
 * 
 * 		[
 * 			{
 * 				name : "MSD",
 * 			 	label : "Mean^2 Displacement",
 * 			  	value : function(){
 * 				  	calculateMSD();
 * 			 	}
 * 		   	}
 *      ]
 * }
 * 
 */





Flory.Display = function(object,html_id_handle){
	this.data = {};
	this.json = object;
	this.value_functions = [];
	this.html_handle = $("#" + html_id_handle);
	this.generateAndPlace(this.json,this.html_handle);
}

Flory.Display.prototype = {
	constructor : Flory.Display ,

	generateAndPlace : function(object,html_handle){
		var listeners = []
		var h = "";

		h += "<div id='display-menu'>";
		for(var  i = 0, len = this.json.display.length; i < len; i++){
			var disp_val = this.json.display[i];
			if(disp_val.label == undefined){
				disp_val.label = disp_val.name;
			}
			var value_id = Flory.generateGUID();
			var value = disp_val.value();
			h += "<div class='display-value'>"
				h+= "<label for='"+disp_val.name+"'>" + disp_val.label + "</label>";
				h+= "<input type='text' class='display-value-text-box' data-key='"+disp_val.name+"' id='"+value_id+"' name = '"+disp_val.name+"' value='"+value+"'>";
			h+= "</div>"

			this.value_functions[disp_val.name] = disp_val.value; 
		}
		h+= "</div>";

		html_handle.html(h);
		return this;
	},
	updateValues : function(){
		for(var i in this.value_functions){
			var val = this.value_functions[i]();
			var html_text = $("[data-key='"+i+"'");
			if(typeof val == "number" || typeof val ==  "string") {
			 	html_text.val(val);
			} else {				
				if(val instanceof Flory.Vector){
					var dimension = val.dimension();
					var string = "";
					for(var i = 0; i < dimension;i++){
						string += val.components[i] + ","
					}
					string = string.substring(0,string.length-1);
					html_text.val(string);
				} else if(val instanceof Flory.Vector3){
					html_text.val(val.x +","+ val.y +","+ val.z);
				} else if(val instanceof Flory.Vector2){
					html_text.val(val.x +","+ val.y);
				}
			}
		}
		return this;		
	},
	updateValue : function(name){
		$("[data-key='"+name+"'").val(this.value_functions[name]());
	}

}

