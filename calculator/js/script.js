 const DEVICE_SELECT = 1;
 const SCOPE_SELECT = 2;

 const CONVERT_PPI = 1;
 const CONVERT_CONFORTABILITY_TOUCH = 2;
 const CONVERT_CAMERA = 3;
 const CONVERT_RECOIL = 4;
 const CONVERT_IPAD = 5;
 const CONVERT_CONFORTABILITY_GYRO = 6;

 var json_data;
 var devices;

 function setPreference(){
	devices = json_data["responseJSON"];
 }

 $(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'devices.json',
		data: { get_param: 'value'},
		dataType: 'json',
		complete: function(data){
			json_data= data;
		}
	});
});

$(document).ajaxComplete(function(){
	if(devices === void 0){
		initialize();
	}
});

$(document).ready(function(){
	$('.modal').modal();
});

$(document).ready(function(){
	$('select').formSelect();
});

$('select').on('contentChanged', function() {
	$(this).material_select();
});

$(document).on("click", ".add", function() {
	$(this).parent().clone(true).insertAfter($(this).parent());
	//$(this).parent().find('select').material_select('destroy');
});

$(document).on("click", ".del", function() {
	var target = $(this).parent();
	if (target.parent().children().length > 1) {
		target.remove();
	}
});


function copyTextToClipboard() {
	navigator.clipboard.writeText($("#copy_url").val())
	.then(function() {
	  console.log('Async: Copying to clipboard was successful!');
	  alert("クリップボードにコピーしました。");
	}, function(err) {
	  console.error('Async: Could not copy text: ', err);
	});
  }

function initialize(){
	setPreference();
	for(device in devices){
		$("#device_1").append($("<option>").attr("value",device).text(device));
		$("#device_2").append($("<option>").attr("value",device).text(device));
		$("#device_1").formSelect();
		$("#device_2").formSelect();
	}
	var url = new URL(window.location.href);
	var params = url.searchParams;
	var entries = params.entries();
	for(var entry of entries) {
		if(entry[0] == "device_1" || entry[0] == "device_2" || entry[0] == "conversion_type" || entry[0] == "base_scope"){
			$("#"+entry[0]).val(entry[1]);
			$("#"+entry[0]+" option[value='"+entry[1]+"']").prop("selected", true);
			$("#"+entry[0]).formSelect();
		}else if(entry[0] == "round"){
			if(entry[1] == "on"){
				$("#round").prop("checked", true);
			}else{
				$("#round").prop("checked", false);
			}
			$("#"+entry[0]).val(entry[1]);
		}else{
			$("#"+entry[0]).val(entry[1]);
		}
	}
	updateValue(1);
	calculate();
}

function canVisible(type){
	if(type == DEVICE_SELECT){
		$("#device_select").show();
		$("#scope_select").hide();
	}else if(type == SCOPE_SELECT){
		$("#device_select").hide();
		$("#scope_select").show();
	}
}
function updateValue(coefficient){
	var update_args = ["tpp_camera","fpp_camera","1x","2x","3x","4x","6x","8x"];
	var url_args = ["conversion_type","device_1","device_2","base_scope","base_sensitivity","tpp_camera","fpp_camera","1x","2x","3x","4x","6x","8x",];
	var round;
	for(args of update_args){
		if($("#round").is(":checked")){
			$("#"+args+"_out").val(Math.round($("#"+args).val()*coefficient));
			$("#round").prop("checked", true);
			round = "on";
		}else{
			$("#"+args+"_out").val($("#"+args).val()*coefficient);
			$("#round").prop("checked", false);
			round = "off";
		}
	}
	var url = "https://simenatsu.github.io/calculator?";
	for(args of url_args){
		url += args+"="+$("#"+args).val()+"&";
	}
	url += "round="+round;
	$("#copy_url").val(encodeURI(url));
	//$("#copy_url").val(encodeURI("http://simenatsu.github.io/calculator?conversion_type="+$("#conversion_type").val()+"&"+"device_1="+$("#device_1").val()+"&"+"device_2="+$("#device_2").val()+"&"+"base_scope="+$("#base_scope").	val()+"&"+"base_sensitivity="+$("#base_sensitivity").val()+"&"+"tpp_camera="+$("#tpp_camera").val()+"&"+"fpp_camera="+$("#fpp_camera").val()+"&"+"1x="+$("#1x").val()+"&"+"2x="+$("#2x").val()+"&"+"3x="+$("#3x").val()+"&"+"4x="+$("#4x").val()+"&"+"6x="+$("#6x").val()+"&"+"8x="+$("#8x").val()));
}

function calculate(){
	var conversion_type = parseInt($("#conversion_type").val());
	var device_1 = $("#device_1").val();
	var device_2 = $("#device_2").val();
	device_1 = devices[device_1];
	device_2 = devices[device_2];
	switch(conversion_type){
		case CONVERT_PPI:
			canVisible(DEVICE_SELECT);
			ppi_1 = Math.sqrt(device_1["resolution"]["width"]**2+device_1["resolution"]["height"]**2)/device_1["inch"];
			ppi_2 = Math.sqrt(device_2["resolution"]["width"]**2+device_2["resolution"]["height"]**2)/device_2["inch"];
			var coefficient = ppi_1/ppi_2;
			break;
		case CONVERT_CAMERA:
			canVisible(DEVICE_SELECT);
			camera_1 = (device_1["dimensions"]["height"]/device_1["dimensions"]["width"]/device_1["dimensions"]["depth"])*device_1["weight"];
			camera_2 = (device_2["dimensions"]["height"]/device_2["dimensions"]["width"]/device_2["dimensions"]["depth"])*device_2["weight"];
			var coefficient = camera_1/camera_2;
			break;
		case CONVERT_RECOIL:
			canVisible(DEVICE_SELECT);
			recoil_1 = Math.sqrt(device_1["dimensions"]["height"]**2+device_1["dimensions"]["width"]**2+device_1["dimensions"]["depth"]**2)*device_1["weight"];
			recoil_2 = Math.sqrt(device_2["dimensions"]["height"]**2+device_2["dimensions"]["width"]**2+device_2["dimensions"]["depth"]**2)*device_2["weight"];
			var coefficient = recoil_1/recoil_2;
			break;
		case CONVERT_IPAD:
			canVisible(DEVICE_SELECT);
			camera_1 = device_1["dimensions"]["height"]/device_1["dimensions"]["width"]/device_1["dimensions"]["depth"];
			camera_2 = device_2["dimensions"]["height"]/device_2["dimensions"]["width"]/device_2["dimensions"]["depth"];
			var coefficient = camera_1/camera_2;
			break;
		case CONVERT_CONFORTABILITY_TOUCH:
		case CONVERT_CONFORTABILITY_GYRO:
			canVisible(SCOPE_SELECT);
			var base_scope = $("#base_scope").val()
			var base_sensitivity = $("#base_sensitivity").val() == null ? 0 : $("#base_sensitivity").val();
			var base_scope =  $("#base_scope").val();
			var base_scope =  $("#"+base_scope).val() == null ? 0 : $("#"+base_scope).val();
			var coefficient = base_sensitivity/base_scope;
			break;
	}
	updateValue(coefficient);
	
}
