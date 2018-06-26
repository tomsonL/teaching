function Calendar(dom){
	this.dom = dom;
    console.log(_todayTime);

    this.NOWDATE = new Date(_todayTime),//后期改为服务器时间
	this.YEAR = this.NOWDATE.getFullYear(),//year
	this.MONTH = this.NOWDATE.getMonth()+1,//month
	this.TODAY = this.NOWDATE.getDate(),//today
	this.NEWDATE = new Date(this.YEAR,this.MONTH-1,1);
	this.serverDate = new Date();
	this.dom.innerHTML = '';
	this.ROWS = 6;
	// 当前日期，不会随点击事件变化
	this.currentYear = this.NOWDATE.getFullYear(),
	this.currentMonth = this.NOWDATE.getMonth()+1,
	this.currentToday = this.NOWDATE.getDate(),

	// this.controller = config.controller;
	// this.dateBox = config.dateBox;

	this.reload();
	// this.loadNewDate(this.YEAR,this.MONTH,1);
};
Calendar.prototype = {
	//初始化表结构
	initDom : function(){
		var dom = this.dom;

		//创建表格节点
		var t = document.createElement('table');;

		//日期控制DOM创建
		var controller = document.createElement('div');;
		controller.id = 'controller';
		controller.className = 'controller absolute';
		var d = document.createElement('div');
			d.className = 'fl prevMonth';
			d.innerHTML = '&lt';
		controller.appendChild(d);
		this.prevMonth = d;//上一月按钮

		d = document.createElement('div');
			d.className = 'fr nextMonth';
			d.innerHTML = '&gt';
		controller.appendChild(d);
		dom.appendChild(controller);
		this.nextMonth = d;//下一月按钮

		//创建显示日期区域
		var date = new Date(_todayTime);
		var dateBox = document.createElement('div');
		dateBox.id = 'dateBox';
		dateBox.className = 'dateBox';
		var span = document.createElement('span');
			span.id = 'yearTitle';
			span.innerHTML = date.getFullYear();
			dateBox.appendChild(span);
			this.textYear = span; //显示年
		var textNode = document.createTextNode('-');
			dateBox.appendChild(textNode);
			span = document.createElement('span');
			span.id = 'monthTitle';
			span.innerHTML = date.getMonth()+1;
			this.textMonth = span; //显示月
			dateBox.appendChild(span);
		dom.appendChild(dateBox);

		var WEEK = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
		var thead = document.createElement('thead');
		var tbody = document.createElement('tbody');
		var tr = document.createElement('tr'),
			td,
			div,
			span,
			th,
			ROWS = this.ROWS;
		//初始化日历thead
		for (var i = 0; i < WEEK.length; i++) {
			th = document.createElement('th');
			div = document.createElement('div');
			div.innerHTML = WEEK[i];
			th.appendChild(div);
			tr.appendChild(th);
		};
		thead.appendChild(tr);
		//初始化日历tbody
		tr = document.createElement('tr');
		for (var i = 0; i < ROWS*7; i++) {	
			td =  document.createElement('td');
			div = document.createElement('div');
			span = document.createElement('span');
			td.appendChild(span);
			td.appendChild(div);
			tr.appendChild(td);
			if((i+1)%7 === 0){
				tbody.appendChild(tr);
				tr = document.createElement('tr');
			}
		}

		t.appendChild(thead);
		t.appendChild(tbody);
		dom.appendChild(t);
	},
	//加载日期
	loadDate:function(date){
		//日期变量
		var YEAR = this.YEAR = date?date.YEAR:this.YEAR;
		var MONTH = this.MONTH = date?date.MONTH:this.MONTH;

		var TODAY = this.TODAY = date?date.TODAY:this.TODAY;
		var NEWDATE = this.NEWDATE = date?date.NEWDATE:this.NEWDATE;

		//dom变量
		var tbody = this.dom.getElementsByTagName('tbody')[0];
		var divs = tbody.getElementsByTagName('div');
		var for_today = NEWDATE.getDay(),//开始加载日期的时间点(需要循环)
			for_todays = this.getMonthDays(YEAR,MONTH);//当月需要加载的天数

			for_todays = for_todays + for_today;//(从索引5开始，加载到35算(35-5)30天，所以要加上起点)

		//清空样式
		for (var i = 0; i < divs.length; i++) {
			divs[i].parentNode.className = '';
		};

		//加载上个月剩余的天数
		var prevMonthDay = this.getMonthDays(YEAR,MONTH-1);
		
		//通过本月1日所在td索引+今天日期(几号) 得到开始加载预约课程td的索引
		var loadToday = this.loadToday = TODAY + NEWDATE.getDay()-1;

		//加载上个月日期的样式
		for (var i = for_today-1; i >= 0; i--) {
			divs[i].innerHTML = prevMonthDay;
			prevMonthDay--;
			divs[i].parentNode.className = 'noThisMonth';
			divs[i].className = '';
		};

		//加载当月的日期数字
		var year = document.getElementById('yearTitle');
		var month = document.getElementById('monthTitle');
		for (var i = 1; for_today < for_todays; i++,for_today++) {
			divs[for_today].innerHTML = i;
			if(i == this.currentToday && parseInt(year.innerHTML) == this.currentYear && parseInt(month.innerHTML) == this.currentMonth){
				divs[for_today].className = 'todayPickOn';
			}else{
				divs[for_today].className = '';
			}	
		};
		
		//加载下个月日期的样式
		for (var j = 1,i = for_todays; i < divs.length; i++) {
			divs[i].parentNode.className = 'noThisMonth';
			divs[i].innerHTML = j++;
			divs[i].className = '';
		};
	},
	setStyle:function(){
		//可以选课的日期添加样式：不是本月不加载样式
		var tbody = this.dom.getElementsByTagName('tbody')[0];
		var divs = tbody.getElementsByTagName('div');

		if(this.serverDate.getFullYear() !== Number(this.YEAR) || this.serverDate.getMonth() !== (Number(this.MONTH)-1)){
			// console.log('不是本月');
			for (var i = this.loadToday; i < this.loadToday+14; i++) {
				divs[i].parentNode.className = '';
			};

			divs[this.loadToday].parentNode.className = '';
		}
		else{
			//20160706
			// console.log('是本月');

			if(this.hasLessons){
				
				for (var i = 0; i < this.hasLessons; i++) {
					divs[i].parentNode.className = 'canLesson';
				};
				divs[this.loadToday].parentNode.className = 'canLesson today';
			}
			else{
				for (var i = this.loadToday; i < this.loadToday+14; i++) {
					divs[i].parentNode.className = 'canLesson';
				};
				divs[this.loadToday].parentNode.className = 'canLesson today';
			}
			
		}
	},
	//绑定事件
	addEvent:function(){
		var tbody = this.dom.getElementsByTagName('tbody')[0];
		
		var tds = tbody.getElementsByTagName('td');
		
		var hasLessons = [];//可约课程的td集合
		for (var i = 0; i < tds.length; i++) {
			if(tds[i].className.indexOf('canLesson')!= -1){
				
				hasLessons.push(tds[i]);
				tds[i].onclick = function(){
					for (var j = 1; j < hasLessons.length; j++) {
						hasLessons[j].className = 'canLesson';
					};
					//过滤掉当天的样式修改
					if(this.className != 'canLesson today'){
						this.className = 'selected';
					}
				}
			}
		};
		this.hasLessons = hasLessons;//保留上课td集合
		// console.log(this.hasLessons.length);
		var that = this;
		var isRemoveClick = 0;//是否取消点击事件
		
		this.prevMonth.onclick = function(){
			var year = Number(that.textYear.innerHTML);
			var monthIndex = Number(that.textMonth.innerHTML)-1;
			
			isRemoveClick--;
			if(!isRemoveClick){
				

				for (var i = 0; i < tds.length; i++) {
					if(tds[i].className.indexOf('canLesson')!= -1){
						
						hasLessons.push(tds[i]);
						tds[i].onclick = function(){
							for (var j = 1; j < hasLessons.length; j++) {
								hasLessons[j].className = 'canLesson';
							};
							//过滤掉当天的样式修改
							if(this.className != 'canLesson today'){
								this.className = 'selected';
							}
						}
					}
				};
				that.setStyle();
			}
			else{
				for (var i = 0; i < tds.length; i++) {
					tds[i].onclick = null;
				};
			}
			
			if(monthIndex === 0){
				year--;
				monthIndex = 11;
			}
			else{
				monthIndex--;
			}
			that.textMonth.innerHTML = monthIndex + 1;
			that.textYear.innerHTML = year;
			var d = new Date(year,monthIndex);
			var date = {
				YEAR:d.getFullYear(),
				MONTH:d.getMonth()+1,
				TODAY:d.getDate(),
				NEWDATE:new Date(year,monthIndex,1)
			}
			
			that.loadDate(date);
		};
		this.nextMonth.onclick = function(){
			var year = Number(that.textYear.innerHTML);
			var monthIndex = Number(that.textMonth.innerHTML)-1;
			
			if(monthIndex === 11){
				year++;
				monthIndex = 0;
			}
			else{
				monthIndex++;
			}
			that.textMonth.innerHTML = monthIndex + 1;
			that.textYear.innerHTML = year;
			var date = {
				YEAR:year,
				MONTH:monthIndex + 1,
				TODAY:6,
				NEWDATE:new Date(year,monthIndex,1)
			}
			isRemoveClick++;

			if(!isRemoveClick){
				that.setStyle();

				for (var i = 0; i < tds.length; i++) {
					if(tds[i].className.indexOf('canLesson')!= -1){
						
						hasLessons.push(tds[i]);
						tds[i].onclick = function(){
							for (var j = 1; j < hasLessons.length; j++) {
								hasLessons[j].className = 'canLesson';
							};
							//过滤掉当天的样式修改
							if(this.className != 'canLesson today'){
								this.className = 'selected';
							}
						}
					}
				};
			}
			else{
				for (var i = 0; i < tds.length; i++) {
					tds[i].onclick = null;
				};
			}

			that.loadDate(date);
		}
	},

	//重新加载日历
	reload:function(){
		this.initDom();
		this.loadDate();
		this.addEvent();
	},
	//加载新日期
	loadNewDate:function(y,m){
		
	},
	//获取当月的天数
	getMonthDays:function (year,month){
		var date = new Date(year,month,0);
		return date.getDate();
	}
};