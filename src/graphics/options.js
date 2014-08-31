/**
 * @author sabidib
 */


/**
 * Given a JSON string will generate the HTML for a dialog box
 * that allows editing of the values.
 * JSON structure:
 *
 * 
 * var opt = {
 * 	options : 
 * 	[
 * 		{
 * 		name : "Radius"
 * 		type : "float,
 *  	value : 5.0
 *  	editable : true,
 *  	min : 0.1 ,
 *  	max : 10,
 *  	slider : true
 *   ]    
 * }
 *
 * m = new Flory.Options(opt,"html_id");
 * m.update();
 * var json_of_values = m.getValues();
 * 
 * 
 */


Flory.Options = function(object,html_id_handle){
	this.data = {};
	this.json = object;
	this.html_handle = $("#"+html_id_handle);
	this.generateAndPlace(object,this.html_handle);
}



Flory.Options.prototype = {
	constructor : Flory.Options,

	generateAndPlace: function(json,html_handle){

		var listeners = [];


		var h = "";
		h += "<div id='border'>";


		for(var i = 0, len = json.options.length; i < len;i++){
			
			var opt = json.options[i];
			
			if(opt.type == "float" || opt.type == "integer"){
				if(opt.slider){						
					var result = this.generateRangeSlider(opt.value,opt.min,opt.max,opt.name,opt.step,opt.has_text_box,opt.text_box_is_editable);
					if(opt.has_text_box){
						listeners.push(
							function(){
								$("#"+result.input_id).on("input",function(){
									 $("#"+result.text_box_id).val(this.value);
								});
								$("#"+result.text_box_id).on("change",function(){
									$("#"+result.input_id).val(this.value);
								});
							}
						);
					
					}

					h += result.html;
				} else {
					result = this.generateTextBox(opt.value,opt.name);
					h += result.html;
				}
			}



		}

		h += "</div>";		

		html_handle.html(h);
		for(var i = 0; i < listeners.length;i++){
			listeners[i]();
		}
		
	} ,


	generateTextBox : function(value,name,type){
		var h = "";
		var text_box_id = Flory.generateGUID();
		h += "<div class='option'>";
		var input_type = type != undefined ? type : '';
		h += "<input class='text-box' type='"+input_type+"' id='"+text_box_id+"' name='"+name+"' value='"+value+"' "; 
		h += "</div>";
		return {"html" : h, "text_box_id" : text_box_id};

	},

	generateRangeSlider : function(value,min,max,name,step,has_text_box,text_box_is_editable){
		var h = "";
		var input_id = Flory.generateGUID();
		var text_box_id = Flory.generateGUID();
		h += "<div class='option'>"
			if(has_text_box){
				h += "<input class='text-box-above-slider' id='"+text_box_id+"' type='number' name='"+name+"' min='"+min+"' max='"+max+"' value='"+value+"'>"
				h += "<input class='range-slider-with-text-box' id='"+input_id+"' type='range' data-key='"+name+"' value='"+value+"'' name='"+name+"' min='"+min+"' max='"+max+"' step='"+step+"'>"
			} else {
				h += "<input class='range-slider' id='"+input_id+"' type='range' value='"+value+"'' data-key='"+name+"' name='"+name+"' min='"+min+"' max='"+max+"' step='"+step+"'>"
			}

		h += "</div>"
		return {"html" : h, "input_id" : input_id,"text_box_id" : text_box_id};
	},

	update : function(){


	},

	updateValue : function(key,value){



	},

	getValue : function(key){


	},

	getValues : function(){

	}
}