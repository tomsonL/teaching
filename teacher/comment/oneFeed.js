

var jFeedback = [
    ['Limited pronunciation, the student would continue mispronouncing basic words even after repeating numerous times.','It is necessary to repeat hard times to ensure good pronunciation. Has a really thick Chinese accent.','His/her English is good, but needs to practice his/her pronunciation more. It is necessary to repeat a couple of times to ensure good pronunciation.','The student repeats after me very well and makes few mistakes that she/he would correct them right away.','Pronunciation is clear with no mistakes even when pronouncing hard words for Chinese students.'],
    ['The student can’t make a whole well-structured sentence.','The student is able to make some basic sentences with a little help.','The student is able to make some basic sentences and some more complex ones.','The student uses grammar well enough to make correct compound sentences making with few mistakes.','Structures and grammar are all correct. Answers questions in a well-structured way.'],
    ['Student does not even know basic vocabulary.','The student’s vocabulary is pretty poor for this presented PPT.','Can’t recognize majority of the vocabulary but learned several new.','She/he has good vocabulary for her/his age, recognized the majority of the new words of the lesson, and she/he will learn some new words from the class.','Student is well-prepared, knows all the new words of the lesson. Always uses proper vocabulary. Even advanced words for his/her age.'],
    ['Student doesn’t know even how to greet or basic things like age or favourite colours.','Can’t make complete sentences without help. Takes some time to answer basic questions.','She/he takes some time to make sentences, but say them fluently enough.','Supported conversation, followed my instructions. She/he has some small pauses while speaking.','Reactions and answers are fast and complete; she/he has almost no pauses in his/her speech.'],
    ['Refuse to follow the teacher’s instruction/ Fair work, minimally acceptable.','Competent work, meeting requirements.','Good work, meeting all requirements, and eminently satisfactory.','Superior work which is clearly above average. Answers questions but isn’t willing to ask back.','Consistently exceeds the expectation, student is not afraid of either answering or asking questions.']
];

var titles = ['pronunciation','grammar','vocabulary','fluency','interaction'];
var oneFeedBack = new Confirm({
	dom:$('#oneFeedBack'),
	close:true
});



//初始化一对一弹窗html
(function initOneHtml(titleArr,contentArr){
	if(titleArr){
		$('#feedContent').html('');
		titleArr.forEach(function(e,i){
			var dl = $(`<dl><dt>
				<div>
					<p>${e}</p>
				</div>
				<div>
					<img src=${es_starNullPath}>
					<img src=${es_starNullPath}>
					<img src=${es_starNullPath}>
					<img src=${es_starNullPath}>
					<img src=${es_starNullPath}>
				</div>
			</dt>
			<dd>
				<div>
					Please score the student
				</div>
			</dd></dl>`);

			contentArr[i].forEach(function(item,index){
				dl.find('dd').append($('<div style="display:none;">'+ item +'</div>'));
			})

			$('#feedContent').append(dl);
		})
		$('#oneTxt').removeAttr('readonly');
	};

	$('#feedContent').on('click','img',function(){
		var i = $(this).index()+1;
		$(this).parents('dl').attr('score',i);
		$(this).prop('src',es_starPath).siblings().prop('src',es_starNullPath);
		$(this).prevAll().prop('src',es_starPath);
		$(this).parents('dt').next().find('div').eq(i).show().siblings().hide();
	});
})(titles,jFeedback);

//重置弹窗内容
function resetOne(){
	$('#feedContent').find('dl').attr('score','');
	$('#feedContent').find('img').prop('src',es_starNullPath);
	$('#oneTxt').val('').removeAttr('readonly');

	$('#feedContent').on('click','img',function(){
		var i = $(this).index()+1;
		$(this).parents('dl').attr('score',i);
		$(this).prop('src',es_starPath).siblings().prop('src',es_starNullPath);
		$(this).prevAll().prop('src',es_starPath);
		$(this).parents('dt').next().find('div').eq(i).show().siblings().hide();
	});
	$('.one_btns').find('button').hide();
	$('.one_btns').find('button[role="submit"]').show();

}

//一对一获取评价
function loadOneData(data){
	$('#feedContent').off();
	
	titles.forEach(function(key,i){
		var stars = $('#feedContent').find('p:contains('+ key +')').parent().next().find('img');
		var score = data[key]?data[key]:0;
		if(score){
			stars.eq(score-1).prop('src',es_starPath).prevAll().prop('src',es_starPath);
		}
	});

	$('#oneTxt').val(data.feedback_content).attr('readonly',true);
    $('.one_btns').find('button').hide();
	$('.one_btns').find('button[role="edit"],button[role="close"]').show();

}

//绑定按钮点击事件
$('.one_btns').on('click','button',function(){
	var param = {};

	if($(this).attr('role') === 'edit'){
		//edit操作
		resetOne();
		
	}
	else if($(this).attr('role') === 'submit'){
		//OK操作
		param['status'] = 1;
		if($('#oneTxt').val().trim().length <6){
			//如果有为评价的layer提示
            layer.alert('Content cannot be empty', {
                btn: ['Determine'],
                title: 'Information'
            });
            return;
		}
		param.feedback_content = $('#oneTxt').val().trim();
		//遍历打分项
		var dis = false;
		$('#feedContent').find('dl').each(function(i,e){
			var score = $(e).attr('score');
			if(!score){
				dis = true
			}
			param[titles[i]] = score;
		});
		if(dis){
			//如果有为评价的layer提示
            layer.alert('Has not yet been scored for students!', {
                btn: ['Determine'],
                title: 'Information',
            });
            return;
		}

        //ajax操作
        fnAjax(param);
	}
	else{
		oneFeedBack.hide();
	}


});

