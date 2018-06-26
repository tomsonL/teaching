
var TRIALINDEX = 0;
var pageTitles = ['Pronunciation','Lexis','Structure','Fluency','Interaction'],
    pageContents = [];
var pageArr = [];

//初始化体验课评价框
function initTrial(){
    var Pronunciation = ['Without any English foundation.','Uses a limited range of pronunciation features (Vowels/ consonants).','Uses a range of pronunciation features (Vowels/consonants).','Attempts to control pronunciation features but lapses are frequent.','Able to control features but mispronunciations are frequent and causes some difficulty for the listeners.','Shows limited effective use of features but this is not sustained.','Can generally be understood throughout.','Shows some effective use of features, though mispronunciation of individual words or sounds reduce clarity at times.','Uses a wide range of pronunciation features.（stress intonation pause rhythm）Sustains flexible use of features, with only occasional lapses.Easy to understand throughout.','Uses a full range of pronunciation features with precision and subtlety.Sustains flexible use of features throughout.Effortless to understand.'],
    Lexis = ['Without any English foundation.','Knows some of the letters.','Able to read all 26 letters,but not able to use individually.','Knows 26 letters and several daily topic words for example:fruit color etc.','Has limited vocabulary to convey greeting like: hello, how are you?','Has some vocabulary to make simple sentences to express daily life. Topics involve in family, animals……','Uses simple vocabulary to convey personal idea on familiar topic.','Able to talk about familiar topics but can only convey basic meaning on unfamiliar topics and makes frequent errors in word choice.','Manages to talk about familiar and unfamiliar topics but uses vocabulary with limited flexibility. Attempt to paraphrase but with mixed success.','Has a wide enough vocabulary to discuss topics at length and make meaning clear in spite of some mistakes.Generally paraphrases successfully.'],
    Structure = ['Without any English foundation.','Without grammar concepts, speaking in the wrong order of words.','Attempt basic sentence forms but with limited success, or relies on apparently memorized phrases.','Able to use the simple sentence pattern and make numerous errors except in memorized expressions.','Able to use simple grammar and make simple sentences but make several mistakes.','Attempts to use a mix of simple and complex structures, but with limited flexibility.','May make frequent mistakes with complex structures through these rarely cause comprehension problems.','Use a range of complex structures with some flexibility.','Frequently produces error-free sentences with only very occasional inappropriacies or basic/non-systematic errors.','Uses a full range of structures naturally and appropriately Produce consistently accurate structures apart from ‘slips’ characteristic of native speaker speech.'],
    Fluency = ['Not able to speak English.','Pauses lengthily before most words.','Pauses a period of time and little communication possible.','Speaks with pauses Able to use basic phrases.','Has limited ability to link simple sentences. Give only simple responses and are frequently unable to convey basic messages.','Has ability to link simple sentences. Give responses and are frequently able to convey basic messages.','Produces simple speech fluently, but more complex communication causes fluency problems.','Speaks at length with effort. Uses limited connectives and discourse markers with some flexibility.','Speaks at length without noticeable effort or loss of coherence. Uses a range of connectives and discourse markers with some flexibility.','Speaks fluently with only rare repetition or self-correction Any hesitation is content –related rather than to find words or grammar.'],
    Interaction = ['Refuse to attend classes.',"Willing to interact with teacher but can't understand teacher.",'Willing to interact with teacher and able to understand teacher partly.','Willing to interact with teacher and complete several class activities.','Willing to interact with teacher and complete part of class activities.','Willing to interact with teacher and complete all of class activities.','Interacts with teacher and complete all of class activities actively.','Willing to interact with teacher and ask questions relating to the lesson.','Willing to interact with teacher, ask questions relating to the lesson and keep learning.','Presents knowledge he / she has learnt before and ask teacher to give the feedback.'];
    pageContents = [Pronunciation,Lexis,Structure,Fluency,Interaction];
    pageContents.forEach(function(contentArr,index){
        var divDom = $('<div class="tril_page">');
        var t = $('<p class="category">').html(pageTitles[index]);
        var list = $('<ul class="con">');

        contentArr.forEach(function(e,i){
            var li = $('<li><label><input name="'+ pageTitles[index] +'" type="radio" /><i>'+ e +'</i></label></li>');
            list.append(li);
        });
        divDom.append(t).append(list);
        $('#trialContent').append(divDom);
        pageArr.push(divDom);
    });
    $('#trialContent').find('div').eq(0).show();
    $('#trialContent').find('.tril_page').last().append('<textarea placeholder="Give feedback"></textarea>');
}

//初始化体验课评价框
initTrial();
//重置评价框（清空值）
resetTrial();

var trial = new Confirm({
    dom:$("#trial"),
    close:true,
    height:'500px',
    width:'640px'
});

//翻页事件
$('#trial').on('click','.btnControl button',function(){
    if($(this).index()){
        TRIALINDEX++;
    }
    else{
        TRIALINDEX--;
    }


    if(TRIALINDEX == 0){
        $(this).html('Cancel');
    }
    else if(TRIALINDEX === -1){
        trial.hide();
        TRIALINDEX = 0;
    }
    else if(TRIALINDEX === pageContents.length-1){
        $(this).html('Submit');
    }
    else if(TRIALINDEX === pageContents.length){
        TRIALINDEX = pageContents.length-1;
        sendCallBack();
        return;
    }
    else{
        $('#trial').find('.btnControl button').eq(0).html('Prev');
        $('#trial').find('.btnControl button').eq(1).html('Next');
    }

    $('#trial').find('div.tril_page').hide().eq(TRIALINDEX).show();
});

//重置体验课评价框
function resetTrial(){
    TRIALINDEX = 0;
    pageArr.forEach(function(el,i){
        $(el).find('label').eq(0).trigger('click');
    })
    $('#trial').find('div.tril_page').hide().eq(TRIALINDEX).show();
    $('#trial').find('.btnControl button').eq(0).html('Cancel');
    $('#trial').find('.btnControl button').eq(1).html('Next');
};


var checkTrial = new Confirm({
    dom:$('#checkTrial'),
    close:false
});



//5个块的颜色值
var colors = ['#EF857A','#76A446','#97B4F2','#1A9EB5','#EFA572'];

function loadTrialData(data){
    if(data){
        $('#checkTrialContent').html('');
        pageTitles.forEach(function(e,i){
            var str =`<li style='border:4px dashed ${colors[i]}'>
                <p class="trialTitle">${e}</p>
                <p class="trialItem">
                    ${data[e.toLowerCase()]}
                </p>
            </li>`;
            $('#checkTrialContent').append(str.toString());
        });
    }
}

$('.checkTrialBtns').on('click','button',function(){
    switch($(this).html().trim()){
        case 'ok':
            checkTrial.hide();
            break;
        case 'Modify':
            checkTrial.hide();
            resetTrial();
            trial.show();
            break;
        }
});

// checkTrial.show();
