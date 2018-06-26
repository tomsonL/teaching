function json2url(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return  arr.join('&');
}
//url,data,type,fnSucc,fnErr
function ajax(json){
	json = json||{};
	json.data = json.data||{};
	json.type = json.type ||'GET';
	json.timeout = json.timeout ||10000;
	
	if(!json.url){
		return ;
	}
	//1.创建一个ajax对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
		//2.建立一个连接(true是否异步)
		oAjax.open('GET',json.url+'?'+json2url(json.data),true);
		//3.发送一个请求
		oAjax.send();
		break;
		case 'post':
		oAjax.open('POST',json.url,true);
		//Content-type:application/x-www-form-urlencoded
		//设置请求头
		oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		//oAjax.send(data);
		oAjax.send(json2url(json.data));
		break;
	}
	//圈显示
		json.loading&&json.loading();
		var timer = setTimeout(function(){
			json.complete&&json.complete();
			json.error&&json.error('网络错误');
			oAjax.onreadystatechange = null;
			
		},json.timeout);
		//alert(json.complete);
	//4.接收
	oAjax.onreadystatechange = function(){
		//通信状态
		if(oAjax.readyState == 4){
			//http状态
			if((oAjax.status>=200&&oAjax.status<300)||(oAjax.status == '304')){
				//返回文本
				clearTimeout(timer);
				json.complete&&json.complete();

				json.succ&&json.succ(oAjax.responseText);
				
			}else{
				json.error&&json.error(oAjax.status);
			}
			
		}	
	};
}