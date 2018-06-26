window.domain = {
	server:'teacher.edumx.com/',//服务器
}

window.javar = {
	java1:'coursePlan/',//马艳云

	java2:'tchTeacherController/',//史泽天

	java3:'message/',//王浩---- 学生消息

	java4:'stuConcern/',//王浩 --- 我的关注列表

}


window.teaAPI= {
	getCoursePlan: domain.server + javar.java1 + 'getCoursePlan.do',//获取教师的排课
	addCoursePlan: domain.server + javar.java1 + 'addCoursePlan.do',//排课
	delCoursePlan:domain.server + javar.java1 + 'delCoursePlan.do',//取消排课


	teacherLogin:domain.server + javar.java2 + 'teacherLogin.do',//教师登录
	quitLogin:domain.server + javar.java2 + 'quitLogin.do',//退出登录
	checkUserName:domain.server + javar.java2 + 'checkUserName.do',//注册时验证用户名是否存在
	saveSendEmail:domain.server + javar.java2 + 'saveSendEmail.do',//注册发送邮箱验证码
	updatePwdSendEmail:domain.server + javar.java2 + 'updatePwdSendEmail.do',//找回密码发送邮箱验证码
	checkEmailCode:domain.server + javar.java2 + 'checkEmailCode.do',//对于用户输入的邮箱验证码进行判断
	addTeacher:domain.server + javar.java2 + 'addTeacher.do',//教师注册
	updatePassword:domain.server + javar.java2 + 'updatePassword.do',//忘记密码：教师找回密码(通过email验证码进行验证)
	checkPassword:domain.server + javar.java2 + 'checkPassword.do',//登录状态修改密码时，验证原密码是否正确
	updatePwd:domain.server + javar.java2 + 'updatePwd.do',//登录状态下进行密码的修改
	uploadHeadImg:domain.server + javar.java2 + 'uploadHeadImg.do',//上传头像图片
	uploadPassportImg:domain.server + javar.java2 + 'uploadPassportImg.do',//上传护照图片
	deletePassportImg:domain.server + javar.java2 + 'deletePassportImg.do',//删除护照图片
	uploadCertificationImg:domain.server + javar.java2 + 'uploadCertificationImg.do',//上传证书图片
	deleteCertificationImg:domain.server + javar.java2 + 'deleteCertificationImg.do',//删除证书图片
	updateTchMessage:domain.server + javar.java2 + 'updateTchMessage.do',//教师首次进入后填写相关信息并提交审核
	tchCommentStu:domain.server + javar.java2 + 'tchCommentStu.do',//教师评价学生

}


window.config = {
	defaultPage:'view/index.html'
}