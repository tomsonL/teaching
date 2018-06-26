		var NOWINDEX = 0,
			TITLE_DOM = $('.es_text_title'),//当前页标题
			next_btn = $(".btnsBox btn").eq(1),
			prev_btn = $(".btnsBox btn").eq(0),
			subtitles = ['Student evaluation','Teacher teaching','Comprehensive evaluation'];
        var es_starNullPath = '/teacher/images/es_starNull.png',
            es_starPath = '/teacher/images/es_star.png';
		//绑定星星点击事件
		$("#publickEs").on('click','.starBox img',function(){
			$(this).parent().attr('starValue',$(this).index()+1);
			$(this).nextAll().prop('src',es_starNullPath);
			$(this).prop('src',es_starPath).prevAll().prop('src',es_starPath);
		});
		//设置进度(当前页面)
		function pro_bar(index){
			if(typeof index === 'undefined'){

				$('.es_text p.starBox').attr('starValue',3);
				$('.es_text p.starBox img').prop('src',es_starPath);
				$('textarea').val('');
				pro_bar(0);
				return;
			}
			else if(index === 0){
				$(".btnsBox button").eq(0).removeClass('active').html('Cancel');
				$(".btnsBox button").eq(1).addClass('active').html('Next');
			}
			else if(index === 1){
				$(".btnsBox button").eq(0).addClass('active').html('Before');
				$(".btnsBox button").eq(1).addClass('active').html('Next');
			}
			else if(index === 2){
				$(".btnsBox button").eq(0).addClass('active').html('Before');
				$(".btnsBox button").eq(1).addClass('active').html('Submit');
			}
			else{
				alert('索引输入错误');
			}

			//标题重置
			$(".es_text_title").html(subtitles[index]);

			//内容区域
			$(".es_text ul").hide().eq(index).show();

			var header_li = $(".es_header ul li").removeClass('active');
			header_li.eq(index).addClass('active').prevAll().addClass('active');

			//
			var bar_p = $(".es_bar p").removeClass('active');
			bar_p.eq(index).addClass('active').prevAll().addClass('active');

			//圆球
			$(".es_bar p span").removeClass('big').eq(index).addClass('big');
		}
		//关闭评论窗口
		function es_hide(){
			$('.estimate').hide();
		}
		//打开评论窗口
		function es_show(){
			NOWINDEX = 0;
			$('.estimate').show();
			pro_bar();
		}

		//按钮事件
		$('.btnsBox').on('click','button',function(){
			switch($(this).html().trim()){
				case 'Cancel':{
					// es_hide();
					NOWINDEX = 0;
					break;
				}
				case 'Next':{
					NOWINDEX ++;
					break;
				}
				case 'Before':{
					NOWINDEX--;
					break;
				}
				case 'Submit':{
					// NOWINDEX = 0;
                    sendAndCallback();
					return;
				}
			}
			pro_bar(NOWINDEX);
		});

		//拼接评价模板    获取评价模板之后调用
		function initHtml(data){
			if(data){
				//重置文本框
				$('#es_all_text').val('');
				//清空评价模板
				$('.es_student,.es_teacher').html('');
				$('.show_es_student,.show_es_teacher').html('');

				var student = data.student,
					teacher = data.teacher;
				student.forEach(function(item,i){

					var h = `<li>	
						<div>
							<h4 class="title">${item.eva_title}</h4>
							<p class='es_description'>
								${item.eva_info}
							</p>
							<p class='starBox' eva_id='${item.eva_id}'>
								<img src="${es_starPath}">
								<img src="${es_starPath}">
								<img src="${es_starPath}">
							</p>
						</div>
					</li>`;
					$('.es_student').append(h);

					$('.show_es_student').append(h);
				});

				teacher.forEach(function(item,i){

					var h = `<li>	
						<div>
							<h4 class="title">${item.eva_title}</h4>
							<p class='es_description'>
								${item.eva_info}
							</p>
							<p class='starBox'  eva_id='${item.eva_id}'>
								<img src="${es_starPath}">
								<img src="${es_starPath}">
								<img src="${es_starPath}">
							</p>
						</div>
					</li>`;
					$('.es_teacher').append(h);
					$('.show_es_teacher').append(h);
				});

				pro_bar();

			}
		}

		//加载评价DOM 
		function loadData(scores){
			if(scores){
				var student = scores.student;
				var stuScores = [];
				student.forEach(function(e,i){

					var stars = $('.show_es_student').find('p.starBox[eva_id="'+ e.eva_id +'"]').find('img').prop('src',es_starNullPath);//重置

					for(var th=0;th<e.str-0;th++){
						stars.eq(th).prop('src',es_starPath)
					}
					
				});

				var teacher = scores.teacher;
				var teaScores = [];
				teacher.forEach(function(e,i){
					teaScores.push({
						e_id:e.e_id,
						score:e.str
					});
                    var stars = $('.show_es_teacher').find('p.starBox[eva_id="'+ e.eva_id +'"]').find('img').prop('src',es_starNullPath);//重置
                    for(var th=0;th<e.str-0;th++){
                        stars.eq(th).prop('src',es_starPath)
                    }
				});

				$('#show_es_all_text').val(scores.feedback_content)

			}
		}


