function update_resource_fields_div(resource_type_id) {  
  $.ajax({
    url: "/update_fields",
    type: "GET",
    data: {"resource_type_id" : resource_type_id},
    dataType: "json",
    success: function(data) {
      $("#fieldsDiv").html(update_resource_parse_data(data));
    }
  }); 
}

function update_resource_parse_data(data){
	data_html="";
	for (var i=0;i<data.length;i++){
	  	data_html+="<div class='control-group'>"+
	  	"<input type='hidden' value='"+data[i].id+"'name='fields[][field_id]' size='30'>"+
	  	"<label class='control-label' for='fields[]["+data[i].name+"]'>"+data[i].name+
	  	"</label><div class='controls'>";
	  	if (data[i].resource_type_reference_id == null){
	  	    data_html+="<input id='"+data[i].id+"' name='fields[][value]' size='30' type='text'>"
	  	}
	  	else {
	    data_html+="<select id='field_complex' name='fields[][value]'><option></option></select>";
	  	    $.ajax({
    			url: "/get_resources",
    			type: "GET",
    			data: {"resource_type_id" : data[i].resource_type_reference_id},
    			dataType: "json",
    			success: function(data) {
    			    $('#field_complex').html(All_resources_of_type(data));
    			}
  			});
	  	    
	  	}
	  	data_html+="</div></div>"
	}
	return data_html;
}
function All_resources_of_type(data){
  for(i=0;i<data.length;i++){
      data_html+="<option value='"+data[i].id+"'>"+data[i].description+"</option>";
  }
  return data_html;
}


function resource_type_remove_field(obj){
  $(obj).parent().parent().parent().remove();
}

function resource_type_add_new_field(obj){
  $.ajax({
    url: "/get_field_types",
    type: "GET",
    data: {},
    dataType: "json",
    success: function(data) {
    	$(obj).parent().parent().before(update_field_type_parse_data(data));
    }
  });
}  
function update_field_type_parse_data(data){
  data_html="<div class='control-group'><div class='control-group'>"+
  "<label class='control-label' for='fields[][field_name]'>Field Name</label><div class='controls'>"+
  "<input name='fields[][name]' size='30' type='text'>"+
  "<a href='#' class='btn' onclick='resource_type_remove_field(this)'>Remove Field</a></div></div>"+
  "<label class='control-label' for='fields[][field_type]'>Field Type</label>"+
  "<div class='controls'><select onChange='what_type_of_field(this)' name='fields[][field_type_id]'><option>Select Type</option>";
  for(var i=0;i<data.length;i++){
     data_html+="<option value='"+data[i].id+"'>"+data[i].name+"</option>" 	
  }
  data_html+="</select></div></div></div>";
  return data_html;
}

function what_type_of_field(obj){
   if (obj.value == 7)
   $.ajax({
    url: "/get_resource_types",
    type: "GET",
    data: {},
    dataType: "json",
    success: function(data) {
        $(obj).after(what_type_of_field_parse(data));
    }
  });
}
function what_type_of_field_parse(data){
    data_html="<select><option>Select Type</option>"
    for(var i=0;i<data.length;i++){
        data_html+="<option value='"+data[i].id+"'>"+data[i].name+"</option>" 	
     }
   data_html+="</select>";
   return data_html;
}