/**
 * @author sabidib
 */



Flory.Shader = function(shader,type){
	this.source = "";
	var shader_dom = document.getElementById(shader)
	if(!shader){
		this.source = shader; 
		this.type = type;
	} else {
		this.source = shader_dom.textContent;
		this.type = shader_dom.type;
	}

}






