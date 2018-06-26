//common.js
//暂时没兼容的方法 JSON.stringify localStorage

//$.ajax在ie8,ie9下跨域
;jQuery.support.cors = true;

//屏蔽console.log报错
;(!window.console && (window.console = {}) && (window.console.log = function(){}));

// ;(function($){

	//配置
	window.config =	{
		//domain : 'http://10.10.24.19:8090/', //海坤
		//domain1 : 'http://10.10.24.20:8090/', //yanjb
		//domain2 : 'http://10.10.24.31:8090/', //吴鹏
		domain3 : 'http://192.168.18.82:8090/', //万亮
		domain : 'http://192.168.85.38:8090/', //海坤
		domain1 : 'http://192.168.85.38:8090/', //yanjb
		domain2 : 'http://192.168.85.38:8090/', //吴鹏
		domain4 : 'http://10.10.24.200:8765/simple-user/',//修改密码接口 - 吴鹏
		//domain3 : 'http://192.168.85.38:8090/', //万亮
		defaultPage : 'http://localhost:81/webApp/index.html',

		//表单验证规则
		validationRules : {
			required : {
				tip : '此项为必填项'
			},
			email : {
				tip : '请输入正确的电子邮箱地址',
				reg : /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/i
			},
			phone : {
				tip : '请输入正确的手机号码',
				reg : /^1\d{10}$/
			},
			url : {
				tip : '请输入正确的网址',
				reg : /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/i
			},
			date : {
				tip : '请输入正确的日期（如：2015-01-30）',
				reg : /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
			}
		}

	};

	//接口
	window.interface = {
		delNoticeInfo : config.domain + 'delNoticeInfo',  //删除公告
		auditNotice : config.domain + 'auditNotice',  //公告审核
		queryNoticeHistory : config.domain + 'queryNoticeHistory',  //查询公告审核历史
		queryVehicleOwnerGroup : config.domain3 + 'queryVehicleOwnerGroup',
		groupsearch : config.domain3 + 'groupsearch',  //根据机构ID获取分组
		login : config.domain + 'sysLogin',		//登录
		applyNoticeAudit : config.domain + 'applyNoticeAudit',
		queryNotice : config.domain + 'queryNotice',  //查询公告
		addNoticeInfo : config.domain + 'addNoticeInfo',  //添加公告
		updateNoticeInfo : config.domain + 'updateNoticeInfo',  //修改公告
        cpadregister: config.domain3+'cpadregister',
        querycpad:config.domain3+"cpadsearch",
        cpaddelete:config.domain3+"cpaddelete",
        addVehicleOwner:config.domain3+"addVehicleOwner",
        queryVehicleOwner:config.domain3+"queryVehicleOwner",
        delVehicleOwner:config.domain3+"deleteVehicleOwner",
        addVehicleOwnerGroup:config.domain3+"updateVehicleOwnerGroup",
        recallNotice:config.domain+"recallNotice",
        queryRescue : config.domain2 + 'agencyQueryRescue',
		search:config.domain1 + "vc/do/search", //查询车况诊断列表
		view:config.domain1 + "vc/do/view", //预览车况诊断工单
		find4sns:config.domain1 + "ns/find",
        set4sns:config.domain1 + "ns/set",
        delete4sns:config.domain1 + "ns/delete",
        resetPassword:config.domain4 + 'resetPassword'
	};

	//工具
	window.common = {
		//通过id获取节点
		thisEle:function(id){
			return document.getElementById(id);
		},
		//创建节点
		createE:function(tagName){
			return document.createElement(tagName);
		},


		//获取窗口尺寸
		getWindowSize : function (){
	        //获取窗口宽度
	        var winWidth = 0;
	        var winHeight = 0;
	        if (window.innerWidth)
	            winWidth = window.innerWidth;
	        else if ((document.body) && (document.body.clientWidth))
	            winWidth = document.body.clientWidth;
	        //获取窗口高度
	        if (window.innerHeight)
	            winHeight = window.innerHeight;
	        else if ((document.body) && (document.body.clientHeight))
	            winHeight = document.body.clientHeight;
	        //通过深入Document内部对body进行检测，获取窗口大小
	        if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
	        {
	            winHeight = document.documentElement.clientHeight;
	            winWidth = document.documentElement.clientWidth;
	        }
	        return {w:winWidth,h:winHeight};
	    },

		/*获取URL参数*/
		search : function (){
			var obj = {};
			var search = window.location.search.substring(1);
			var arr = search.split('&');
			for(var i=0; i<arr.length; i++){
				var n = arr[i].indexOf('=');
				obj[arr[i].substring(0,n)] = arr[i].substring(n+1);
			}
			return obj;
		},

		/*取n到m随机数*/
		rdn : function (n,m){
			return parseInt(Math.random()*(m-n+1)+n)
		},

		/*统一ajax返回数据类型*/
		data2json : function (data){
			if(typeof data == 'string'){
				return eval('('+data+')');
			}else{
				return data;
			}
		},

		//cookie操作
		addCookie : function (name,value,iDay){
			var oDate;

			if(iDay !== undefined){
				oDate = new Date();
				oDate.setDate(oDate.getDate()+iDay);
			}else{
				oDate = "";
			}

			document.cookie=name+'='+value+';path=/;expires='+oDate;
		},
		getCookie : function (name){
			var arr=document.cookie.split('; ');
			for(var i=0;i<arr.length;i++){
				var n = arr[i].indexOf('=');
				if(arr[i].substring(0,n)==name){
					return arr[i].substring(n+1);
				}
			}
			return '';
		},
		delCookie : function (name){
			addCookie(name,'',-1)
		},

		//补零
		zeroPadding : function (str,n){
			var arr = str.toString().split('');
			while(arr.length < n){
				arr.unshift('0');
			}
			return arr.join('');
		},

		mapParam : function(data,map){
			for(var i=0; i<map.length; i++){
				if(map[i].value === data){
					return map[i].name
				}
			}
		},

		formatTime : function(n,type){
			var time = new Date(n-0);

			var year = time.getFullYear(),
				month = time.getMonth(),
				date = time.getDate(),
				day = time.getDay(),
				hours = time.getHours(),
				minutes = time.getMinutes(),
				seconds = time.getSeconds(),
				DAY = ['日','一','二','三','四','五','六'];
				//mSeconds = date.getMilliseconds();

			var rDate = year + '-' + common.zeroPadding(month+1,2) + '-' + common.zeroPadding(date,2) ;
			var rTime = common.zeroPadding(hours,2) + ':' + common.zeroPadding(minutes,2) + ':' + common.zeroPadding(seconds,2) ;

			if(type === 'date'){
				return rDate;
			}else if(type === 'time'){
				return rTime;
			}else if(type === 'day'){
				return DAY[day];
			}else{
				return rDate + ' ' + rTime;
			}
		},

		timerSlot : function(target){
			var data = [
				{name : '全部',value : '',checked:true},
				{name : '最近一周',value : 7},
				{name : '最近一个月',value : 30},
				{name : '最近三个月',value : 90},
				{name : '最近六个月',value : 180},
				{name : '最近一年',value : 365}
			];

			var date = new Date().getTime();

			for(var i=0; i<data.length; i++){
				data[i].value = formatterVal(data[i].value);
			}

			function formatterVal (n){
				if(n !== ''){
					return date - 1000*60*60*24*n + '-' + date;
				}else{
					return '-'
				}
			}

			var h = new ConditionPicker({
				wrap : target,
				data : data
			});

			return h;
		},

		getUserInfo : function(){
			global.userId = common.getCookie('userid');
			global.userName = common.getCookie('username');
			global.userMail = common.getCookie('usermail');
			global.token = common.getCookie('token');
			global.deptId = common.getCookie('deptId');
			global.domain = common.getCookie('domain');
			global.navaData = localStorage.navData;
		},

		confirm : function(){
			var arg1 = arguments[0],
				arg2 = arguments[1];

			if(typeof arg1 === 'object'){
				var title = arg1.title || '提示',
					content = arg1.content,
					onConfirm = typeof arg1.onConfirm === 'function' ? arg1.onConfirm : function(){},
					onCancel = typeof arg1.onCancel === 'function' ? arg1.onCancel : function(){};

			}else if(typeof arg1 === 'string'){
				var title = '提示',
					content = arg1,
					onConfirm = typeof arg2 === 'function' ? arg2 : function(){},
					onCancel = function(){};
			}

			var wrap =$('<div class="Dialog">' +
			'<div class="Dialog_header"><p>'+title+'</p></div>' +
			'<div class="Dialog_content">'+content+'</div>' +
			'<div class="Dialog_footer">' +
			'<a class="Dialog_btn Dialog_fl Dialog_btnHighLight" data-role="confirm-destroy" href="javascript:void(0);">确 认</a>' +
			'<a class="Dialog_btn Dialog_fr" data-role="destroy" href="javascript:void(0);">取 消</a>' +
			'</div>' +
			'</div>');


			new Dialog({
				wrap : wrap,
				target : $('body'),
				onConfirm : onConfirm,
				onHide : onCancel
			}).show();


		},
		alert : function(){
			if(typeof arguments[0] === 'object'){
				var title = arguments[0].title || '提示',
					content = arguments[0].content,
					onConfirm = arguments[0].onConfirm || function(){};

			}else if(typeof arguments[0] === 'string'){
				var title = '提示',
					content = arguments[0],
					onConfirm = function(){};

			}


			var wrap =$('<div class="Dialog">' +
			'<div class="Dialog_header"><p>'+title+'</p></div>' +
			'<div class="Dialog_content">'+content+'</div>' +
			'<div class="Dialog_footer">' +
			'<a class="Dialog_btn Dialog_bc Dialog_btnHighLight" data-role="confirm-destroy" href="javascript:void(0);">确 认</a>' +
			'</div>' +
			'</div>');


			new Dialog({
				wrap : wrap,
				target : $('body'),
				onConfirm : onConfirm
			}).show();

		},
		ajax : function(opt){
			var that = this;
			this.btn = this.btn || opt.btn || $('<i></i>');
			console.log(this)
			var optBeforeSend = opt.beforeSend || function(){};
			var optComplete = opt.complete || function(){};
			delete opt.btn;

			var data = {
				beforeSend : function(){
					that.btn.addClass('disabled');
					optBeforeSend();
				},
				complete : function(){
					that.btn.removeClass('disabled');
					optComplete();
				}
			};

			!this.btn.hasClass('disabled') && $.ajax($.extend(opt,data));

		}

	};

	//日期选择器(依赖：common.zeroPadding(),config.validationRules.date.reg)
	window.Calender = function (target){

		this.type = 0; //选择日期模式0 | 选择年月模式1
		this.date = new Date(); //填充日历用的时间对象，只维护了年/月，没有维护日

		//dom
		this.target = target; //input框
		this.wrap;  //日历容器
		this.td;	//日td
		this.btnNext;	//下一月/年 按钮
		this.btnPrev;	//上一月/年 按钮
		this.textYear;  //头部年容器
		this.textMonth; //头部月容器
		this.btnTit;	//选择年月按钮
		this.table;		//日期容器 type=0显示
		this.monthBox;	//月份容器 type=1显示
		this.btnConfirm;//确定按钮

		this.timer;
		this.offset;

		this.init();
	};
	Calender.prototype = {

		init : function (){
			var that = this;

			this.createBox();

			this.wrap.on('click','.mgCalendar_filled',function(){
				clearTimeout(that.timer);

				that.target.val($(this).data('val'));
				that.td.removeClass('mgCalendar_current');
				$(this).addClass('mgCalendar_current');

				that.target.trigger('input');
			});

			this.btnTit.on('click',function(){
				that.table.hide();
				that.monthBox.show();
				that.btnMonth.removeClass('active');
				that.btnMonth.eq(that.date.getMonth()).addClass('active');
				that.type = 1;
			});

			this.btnConfirm.on('click',function(){
				that.table.show();
				that.monthBox.hide();
				that.type = 0;
				that.fillTd();
			});

			this.btnMonth.on('click',function(){

				var index = $(this).index();
				that.btnMonth.removeClass('active');
				$(this).addClass('active');
				that.date.setMonth(index);
				that.textMonth.text(index+1)
			})


			this.btnNext.on('click',{isNext:true,that:this},this.slideDate);
			this.btnPrev.on('click',{isNext:false,that:this},this.slideDate);


			this.target.on('focus',function(){
				var val = $.trim(that.target.val());
				if(config.validationRules.date.reg.test(val)){
					var arr = val.split('-');
					that.date = new Date(arr[0]-0,arr[1]-1,arr[2]-0);
					that.fillTd(arr[2]-0);
				}else{
					that.fillTd();
				}
				that.wrap.show();
			});

			this.target.on('blur',function(){
				clearTimeout(that.timer);
				that.timer = setTimeout(function(){
					that.wrap.hide();
				},300)
			});

			$('html').on('click',function(e){
				if(!$.contains(that.wrap[0],e.target) && e.target != that.target[0]){
					that.wrap.hide();
				}else{
					clearTimeout(that.timer)
				}
			});
		},
		createBox : function (){


			var offset = this.target.offset();
			var offsetParent = this.target.offsetParent();
			offset.top -= offsetParent.offset().top-this.target.height()-3;
			offset.left -= offsetParent.offset().left;

			this.offset = offset;

			this.wrap = $('<div class="mgCalendar" style="display:none;position:absolute;top:'+offset.top+'px;left:'+offset.left+'px;"></div>');
			this.btnPrev = $('<a href="javascript:;" class="mgCalendar_prev"></a>');
			this.btnNext = $('<a href="javascript:;" class="mgCalendar_next"></a>');

			var tbody='';
			for(var i=0; i<6; i++){
				tbody+='<tr><td></td><td></td><td></td><td></td><td></td><td class="mgCalendar_orange"></td><td class="mgCalendar_orange"></td></tr>'
			}
			this.table = $('<div class="mgCalendar_box"><div class="mgCalendar_tit"><span class="mgCalendar_titBtn"><span class="mgCalendar_year"></span>年<span class="mgCalendar_month"></span>月</span></div><table class="mgCalendar_table"><thead><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="mgCalendar_orange">六</th><th class="mgCalendar_orange">日</th></tr></thead><tbody>'+tbody+'</tbody></table></div>')

			var monthList = $('<ul class="mgCalendar_monthList"><li>一月</li><li>二月</li><li>三月</li><li>四月</li><li>五月</li><li>六月</li><li>七月</li><li>八月</li><li>九月</li><li>十月</li><li>十一月</li><li>十二月</li></ul>');
			this.btnConfirm = $('<div class="mgCalendar_confirm">确定</div>');
			this.monthBox = $('<div class="mgCalendar_box" style="display: none;"><div class="mgCalendar_tit"><span class="mgCalendar_year"></span>年</div></div>');
			this.monthBox.append(monthList,this.btnConfirm);

			this.wrap.append(this.btnPrev,this.btnNext,this.table,this.monthBox);
			this.wrap.insertAfter(this.target);

			this.td = this.wrap.find('.mgCalendar_table tbody td');
			this.textYear = this.wrap.find('.mgCalendar_year');
			this.textMonth = this.wrap.find('.mgCalendar_month');
			this.btnMonth = this.wrap.find('.mgCalendar_monthList li');
			this.btnTit = this.wrap.find('.mgCalendar_titBtn');

		},
		daysTomonth : function (oDate){ //本月有多少天
			oDate.setMonth(oDate.getMonth()+1,1);
			oDate.setDate(0);
			return oDate.getDate()
		},
		dayFirstday : function (oDate){  //本月第一天是星期几
			oDate.setDate(1);
			return oDate.getDay() === 0 ? 7 : oDate.getDay();
		},
		fillTd :function (currentDay){
			var oDate = this.date;
			var n = this.daysTomonth(oDate);
			var blank = this.dayFirstday(oDate) - 1;
			var year = oDate.getFullYear();
			var month = oDate.getMonth();
			var now = new Date();


			this.td.empty().removeClass('mgCalendar_filled mgCalendar_today mgCalendar_current');

			for(var i=0; i<n; i++){
				this.td.eq(i+blank).text(i+1).addClass('mgCalendar_filled').data('val',year+'-'+common.zeroPadding(month+1,2)+'-'+common.zeroPadding((i+1),2));
			}

			if(year === now.getFullYear() && month === now.getMonth()){
				this.td.each(function(){
					if($(this).text() == now.getDate()){
						$(this).addClass('mgCalendar_today');
					}
				})
			}

			this.textYear.text(this.date.getFullYear());
			this.textMonth.text(this.date.getMonth()+1);
			if(currentDay){
				this.td.filter('.mgCalendar_filled').eq(currentDay-1).addClass('mgCalendar_current');
			}
		},
		slideDate : function (e){

			var that = e.data.that;
			if(that.type === 0){
				if(e.data.isNext){
					that.date.setMonth(that.date.getMonth()+1);
				}else{
					that.date.setMonth(that.date.getMonth()-1);
				}

			}else if(that.type === 1){
				if(e.data.isNext){
					that.date.setFullYear(that.date.getFullYear()+1);
				}else{
					that.date.setFullYear(that.date.getFullYear()-1);
				}
			}

			that.fillTd();

		},
		position : function (l,t){
			this.wrap.css({
				left : this.offset.left += l,
				top : this.offset.top += t
			})
		}
	};

// })(jQuery);
