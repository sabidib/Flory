/**
 * @author sabidib http://github.com/sabidib
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
 *  	value : 5.0,
 *  	label : "radius",
 *  	editable : true,
 *  	min : 0.1 ,
 *  	max : 10,
 *  	slider : true
 *   ]    
 * }
 * The name variable must be unique.
 *
 * 
 * Valid options for the "type" parameter are :
 * 		[
 * 			"integer",
 * 			"float",
 * 			"number",
 * 			"string",
 * 			"checkbox",
 * 			"button"
 * 		]
 *
 *For the "button" type a function placed in the "calback"
 *variable can be set that will be called when the button is pressed.
 *
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
	this.option_list = [];
	this.generateAndPlace(object,this.html_handle);
}



Flory.Options.prototype = {
	constructor : Flory.Options,

	generateAndPlace: function(json,html_handle){

		var listeners = [];


		var h = "";
		h += "<div id='option-menu'>";


		for(var i = 0, len = json.options.length; i < len;i++){
			
			var opt = json.options[i];
			var opt_to_push = {};

			opt_to_push.name = opt.name;

			
			if(opt.type == "float" || opt.type == "integer" || opt.type == "number"){
				if(opt.slider){						
					var result = this.generateRangeSlider(opt.value,opt.min,opt.max,opt.name,opt.label,opt.step,opt.has_text_box,opt.text_box_is_editable);
					var number_slider_id = result.input_id;
					var number_text_box_id = result.text_box_id;
					if(opt.has_text_box){
						listeners.push(
							function(){
								$("#"+number_slider_id).on("input",function(){
									 $("#"+number_text_box_id).val(this.value);
								});
								$("#"+number_text_box_id).on("change",function(){
									$("#"+number_slider_id).val(this.value);
								});
							}
						); 
					}
					opt_to_push.ids = {"number_slider_id" : number_slider_id , "number_text_box_id" : number_text_box_id};
					h += result.html;
				} else {
					result = this.generateTextBox(opt.value,opt.name,opt.label);
					opt_to_push.ids = {"text_box_id" : result.text_box_id };
					h += result.html;
				}
			} else if(opt.type == "string" ){
				var result = this.generateTextBox(opt.value,opt.name,"text",opt.label);
				opt_to_push.ids = {"text_box_id" : result.text_box_id };
				h += result.html;
			} else if(opt.type == "checkbox"){
				var result = this.generateCheckBox(opt.value,opt.name,opt.label);
					opt_to_push.ids = {"check_box_id" : result.check_box_id };
				h+= result.html;
			} else if(opt.type == "button"){
				var result = this.generateButton(opt.value,opt.name,opt.label);
                var callback = opt.callback;
                var button_id = result.button_id;
                if(callback){
                    listeners.push(function(){
                        $("#"+button_id).on("click",function(){
                            callback(button_id);                            
                        });
                    });
                }
				opt_to_push.ids = {"button_id" : result.button_id };
                h += result.html;
			}

		}

		h += "</div>";		

		html_handle.html(h);

		for(var i = 0; i < listeners.length;i++){
			listeners[i]();
		}
		
	} ,
	generateButton : function(value,name,label){
		var h  = "";
		if(label == undefined){
			label = name;
		}

		var button_id = Flory.generateGUID();
		h += "<div class='option'>";
		h += "<label for='"+name+"'>" +label+ "</label>";
        h += "<button class='button' id='"+button_id+"'>" + value + "</button>";   
        h += "</div>";

        return {"html" : h, "button_id" : button_id}
	},

	generateTextBox : function(value,name,type,label){
		var h = "";
		if(label == undefined){
			label = name;
		}

		var text_box_id = Flory.generateGUID();
		h += "<div class='option'>";
		h += "<label for='"+name+"'>"+label+"</label>"
		var input_type = type != undefined ? type : '';
		h += "<input class='text-box' type='"+input_type+"' data-key='"+name+"' id='"+text_box_id+"' name='"+name+"' value='"+value+"'> "; 
		h += "</div>";
		return {"html" : h, "text_box_id" : text_box_id};

	},

	generateRangeSlider : function(value,min,max,name,label,step,has_text_box,text_box_is_editable){
		var h = "";
		if(label == undefined){
			label = name;
		}
		var input_id = Flory.generateGUID();
		var text_box_id = Flory.generateGUID();
		h += "<div class='option'>"
		h += "<label for='"+name+"'>"+label+"</label>"
			if(has_text_box){
				h += "<input class='text-box-above-slider' id='"+text_box_id+"' type='number' name='"+name+"' min='"+min+"' max='"+max+"' value='"+value+"'>"
				h += "<input class='range-slider-with-text-box' id='"+input_id+"' type='range' data-key='"+name+"' value='"+value+"'' name='"+name+"' min='"+min+"' max='"+max+"' step='"+step+"'>"
			} else {
				h += "<input class='range-slider' id='"+input_id+"' type='range' value='"+value+"'' data-key='"+name+"' name='"+name+"' min='"+min+"' max='"+max+"' step='"+step+"'>"
			}

		h += "</div>"
		return {"html" : h, "input_id" : input_id,"text_box_id" : text_box_id};
	},

	generateCheckBox : function(checked,name,label){
		var h = "";

		if(label == undefined){
			label = name;
		}

		var check_box_id = Flory.generateGUID();
		h += "<div class='option'>"
		h += "<label for='"+name+"'>"+label+"</label>"

		h += "<input class='checkbox' name='"+name+"' data-key='"+name+"' id='"+check_box_id+"' type='checkbox' value='i-am-a-check-box-causing-errors' ";
		if(checked){
			h += "checked"
		}
		h += ">"
		h += "</div>";

		return {"html" : h , "check_box_id" : check_box_id }
	},

	update : function(){


	},

	updateValue : function(key,value){
		$("[name='"+key+"']").val(value).change();
	},

	getValue : function(key){
		var k =  $("[name='"+key+"']").val();
		if(k == "i-am-a-check-box-causing-errors"){
			return $("[name='"+key+"']").is(':checked');
		} else {
			return k;
		}
	},

	getValues : function(){

	}
}