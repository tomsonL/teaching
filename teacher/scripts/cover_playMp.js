
function CoverMp(){
	this.initDom();
	this.playAudioImg = '/teacher/images/play_audio.png';
	this.pauseAudioImg = '/teacher/images/pause_audio.png';
	this.playVideoImg = '/teacher/images/play_video.png';
	this.initEvent();
}
CoverMp.prototype = {
	initDom:function(){
		this.cover_play = $('<div class="cover_play">');
		this.cover_play_content = $('<div class="cover_play_content">');
		this.cover_list = $('<div class="cover_list">');
		this.cover_list_ul = $('<ul>');
		this.cover_close = $('<div class="cover_close"><span>&times;</span></div>');
		this.audio = $('<audio>');
		this.cover_video_content = $('<div class="cover_video_content"><span class="video_close">&times;</span></div>');
		this.video = $('<video controls>');
		this.cover_list.append(this.cover_list_ul);
		this.cover_play_content.append(this.cover_list).append(this.cover_close);
		this.cover_play.append(this.cover_play_content);
		this.cover_play.append(this.audio).append(this.video);
		this.cover_play.append(this.cover_video_content);
		this.cover_video_content.append(this.video);

		if($('body').find('.cover_play').length === 0){
			$('body').append(this.cover_play);
		}


	},
	show:function(data){
		if(data){
			for(var i =0;i<data.length;i++){
				var li = $('<li>'),
					span = $('<span>');
				var reg = '';
				if(data[i].title.length >=10){
                    reg = '...';
				}
				span.html(data[i].title.substr(0,10)+reg).attr('alt',data[i].title);
				var control = $('<div>');
                var a_play = $('<a>').attr('mp',data[i].url).prop('href','javascript:;');
                var download = $('<a>').prop('href',data[i].url).html('download');
				li.append(span);
				if(data[i].title.indexOf('mp3') !== -1 || data[i].url.indexOf('mp3') !== -1){
					a_play.append($('<img>').prop('src',this.playAudioImg));

				}
				else{
					a_play.append($('<img>').prop('src',this.playVideoImg));

				}
                control.append(a_play).append(download);
                li.append(control);
				this.cover_list_ul.append(li);
			}
		}
		this.cover_play.show();
	},
	hide:function(){
		this.cover_play.hide();
		if(this.audio.prop('src')){
			this.audio.get(0).pause();
		}
		if(this.video.prop('src')){
			this.video.get(0).pause();
		}
		this.cover_list_ul.html('');
	},
	initEvent:function(){
		var that = this;

		//关闭列表弹窗
		this.cover_close.on('click','span',function(){
			that.hide();
		});

		//关闭视频事件
		this.cover_video_content.on('click','.video_close',function(){
			if(that.video.prop('src')){
				that.video.get(0).pause();
			}
			that.cover_video_content.hide();
		});

		//列表里面的a事件
		this.cover_list_ul.on('click','a',function(){
			var status = $(this).find('img').prop('src');

			if(status.indexOf('play_audio') !== -1){
				that.audio.prop('src',$(this).attr('mp'));
				$(this).find('img').prop('src',that.pauseAudioImg);
				that.audio.get(0).play();
				$(this).parent().siblings().find('img').prop('src',that.playAudioImg);
			}
			else if(status.indexOf('pause_audio') !== -1){
				$(this).find('img').prop('src',that.playAudioImg);
				that.audio.get(0).pause();
			}
			else if(status.indexOf('play_video') !== -1){
				that.video.prop('src',$(this).attr('mp'));
				that.cover_video_content.show();
				that.video.width(that.cover_video_content.width());
				that.video.get(0).play();
			}
		});


	}
}