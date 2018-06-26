function Confirm(param){
	this.dom = {};
	this.width = param.width || 550;
	this.height = param.height || 500;
	this.borderRadius = param.borderRadius || 6;
	this.close = param.close;
	this.dom.confirm_section = param.dom || '<div></div>';
	this.dom.confirm_section.show();

	this.title = param.title || 'Class Feedback';
	this.closeCallBack = param.closeCallBack;
	this.init();
	return this;
}

Confirm.prototype = {

	init:function(){
		this.dom.cover = $('<div class="confirm_cover">');//遮盖层
		this.dom.confirm_content = $('<div class="confirm_content">');//白板区域
		this.dom.confirm_title = $('<div class="confrim_title">');//标题
		this.dom.confirm_close = $('<div class="confirm_close">');//关闭按钮
		this.dom.confirm_main = $('<div class="confirm_main">');//内容区域

		this.dom.confirm_close.html('&times;');

		if(!this.close){
            this.dom.confirm_close.hide();
		}

		this.dom.confirm_title.html(this.title);
		this.dom.confirm_main.append(this.dom.confirm_section);

		this.dom.confirm_content.append(this.dom.confirm_close).append(this.dom.confirm_title).append(this.dom.confirm_main);

		this.dom.cover.append(this.dom.confirm_content);

		if(!this.close){
            this.dom.confirm_close.hide();
		}
		$('body').append(this.dom.cover);
		this.dom.cover.css({
			'position': 'fixed',
			'width': '100%',
			'height': '100%',
			'left':0,
			'z-index':99,
			'top':0,
			'display':'none',
			'background-color': 'rgba(0,0,0,0.4)'
		});

		this.dom.confirm_content.css({
			'width': this.width,
			'height': this.height ,
			'padding':'40px 50px',
			'padding-top':'80px',
			'background-color': '#fff',
			'position': 'absolute',
			'margin-left': '-300px',
			'left':'50%',
			'top':'50%',
			'margin-top':'-290px',
			'border-radius': this.borderRadius||'10px'
		});

		this.dom.confirm_title.css({
			'width':'200px',
			'height': '40px',
			'line-height': '40px',
			'background-color': '#08bbf2',
			'text-align': 'center',
			'color':'#fff',
			'border-top-right-radius': '20px',
			'border-bottom-right-radius': '20px',
			'position': 'absolute',
			'left': 0,
			'top':30
		});


		this.dom.confirm_close.css({
			'width': '26px',
			'height': '26px',
			'border-radius': '50%',
			'border':'1px solid #08bbf2',
			'text-align': 'center',
			'line-height': '24px',
			'color':'#08bbf2',
			'position': 'absolute',
			'right':'10px',
			'top':'10px',
			'cursor': 'pointer',
		});

		this.dom.confirm_main.css({
			/*'padding':'40px',
			'height': '300px'*/
		});
		this.event();
	},
	event:function(){
		var that = this;

		//自带关闭按钮的点击事件
		this.dom.confirm_close.on('click',function(){
			if(that.closeCallBack){
				that.closeCallBack();
			}
			that.hide();
		});
		//关闭事件
		this.dom.confirm_section.on('click','[role="close"]',function(){
			var txt =  $(this).text().trim();
			if(txt == 'OK' || txt == 'Cancel'||txt == '关闭' || txt == '&times;'){
				that.hide();
			}
		});
	},
	show:function(){
		this.dom.cover.show();
		return this;
	},
	hide:function(){
		this.dom.cover.hide();
		return this;
	}
}






