

//定义全局global
window.global = {

	leftMenu:$('#leftMenu'),
	leftMenuItems:[],
	defaultPage:'view/bookingPage.html',
	content:$('#article'),
	loadNav:function(){
		$.ajax({
			url:'/teacher/json/nav.json',
			dataType:'json',
			success:function(data){
				if(data){
					$(leftMenu).empty();
					var navLis = data.items;
					for (var i = 0; i < navLis.length; i++) {
						var div = $('<div>');
						var img = $('<img>').prop('src',navLis[i].icon);
						var li = $('<li>');
						div.append(img);
						div.append(navLis[i].name);
						li.append(div);
						li.attr('url',navLis[i].url);

						$(leftMenu).append(li);
						global.leftMenuItems.push(li.get(0));
					};
					global.addEvent();
				}
			}
		});
	},
	initPage:function(pageIndex){
		var pageIndex = pageIndex?pageIndex:0;
		global.loadNav();
		$(global.leftMenu).find('li').eq(pageIndex).trigger('click');		
	},
	addEvent:function(){
		var items = global.leftMenuItems;
		for (var i = 0; i < items.length; i++) {
			items[i].onclick = function(){
				$.ajax({
					url:this.getAttribute('url'),
					dataType:'html',
					success:function(data){
                        var html = $(data).find('#article').html();
                        $("#article").html(html);
					}
				})
			}
		};
	}


}

$(function(){
	global.initPage();
})