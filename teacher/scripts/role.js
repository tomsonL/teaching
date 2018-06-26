$(function() {
	$('#rolegrid').datagrid({
		url: path + "/bg/role/rolelist.do",
		loadMsg: '正在加载数据...',
		//title: '角色列表',
		striped: true,
		width:"auto",
 		height:"auto",
		// 列宽度自适应
 		fit:true,
 		fitColumns: true,
		pagination: true,
		rownumbers: true,
		// 关闭选择行就可以选中checkbox 实现选中行为单选，选中checkbox为多选
		// 要与singleSelect: true同时使用
		selectOnCheck: false,
		singleSelect: true,
		pageSize: 10,
		onCheck: function(rowIndex, rowData) {
			$("#selCounts").text($('#rolegrid').datagrid('getChecked').length);
		},
		onCheckAll: function() {
			$("#selCounts").text($('#rolegrid').datagrid('getChecked').length);
		},
		onUncheckAll: function() {
			$("#selCounts").text($('#rolegrid').datagrid('getChecked').length);
		},
		columns: [[{
			field: 'roleid',
			checkbox: true,
			width:$(this).width()*0.1
		},
		{
			field: 'roleName',
			title: '角色名',
			width:$(this).width()*0.1
		},
		{
			field: 'creater',
			title: '创建人',
			width:$(this).width()*0.1
		},
		{
			field: 'createDate',
			title: '创建时间',
			width:$(this).width()*0.1,
			formatter:function(value,row,index){  
                var unixTimestamp = new Date(value);  
                return unixTimestamp.toLocaleString();  
            } 
		},
		{
			field: 'modifier',
			title: '修改人',
			width:$(this).width()*0.1
		},
		{
			field: 'modifDate',
			title: '修改时间',
			width:$(this).width()*0.1,
			formatter:function(value,row,index){  
                var unixTimestamp = new Date(value);  
                return unixTimestamp.toLocaleString();  
            } 
		},
		{
			field: 'intro',
			title: '角色介绍',
			width:$(this).width()*0.1
		}]],

	});
	//设置分页控件 
	var p = $('#rolegrid').datagrid('getPager');
	$(p).pagination({
		pageSize: 10,
		//每页显示的记录条数，默认为10 
		pageList: [10, 20],
		//可以设置每页记录条数的列表 
		beforePageText: '第',
		//页数文本框前显示的汉字 
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前选中<span id="selCounts" style="color:red">0</span>条记录 当前显示 {from} - {to} 条记录   共 {total} 条记录',
	});

	//添加按钮
	   $("#btnadd").click(function(){
			openTab("tabs","添加角色",'/bg/role/toroleform.do');
	    });
	   //修改按钮
	    $("#btnedit").click(function(){
	    	var rows = $('#rolegrid').datagrid('getChecked');
			if (rows.length < 1) {
				$.alert({
 	    			title:"系统提示",
 	    			msg:"请选择要修改的行！"
 	    		});
			} else if (rows.length > 1) {
				$.alert({
 	    			title:"系统提示",
 	    			msg:"只能选择一行进行修改"
 	    		});
			} else {
				openTab("tabs","修改角色",'/bg/role/toroleform.do?roleid=' + rows[0].roleid);
			}
	    });
	    //删除按钮
	    $("#btnremove").click(function(){
	    	var ids = [];
			var rows = $('#rolegrid').datagrid('getChecked');
			for (var i = 0; i < rows.length; i++) {
				ids.push(rows[i].roleid);
			}
			var rolesid = ids.join(",");
			if(rolesid == null || rolesid == ""){
				
				$.alert({
 	    			title:"系统提示",
 	    			msg:"请选择要删除的角色"
 	    		});
				return;
			}
			$.confirm({
				title:"重要提示",
				msg:"您确认要进行删除吗？",
				yes:function(op){
					$.ajax({
						url: path + '/bg/role/delete.do',
						type: "post",
						data: {
							rolesid: rolesid
						},
						datatype: "json",
						success: function(data) {
							if (data == "1" || data * 1 == 1) {
								$.msg({
					        		ico:"success",
									msg:"操作成功！"
								});
								$('#rolegrid').datagrid('reload');
							} else {
								$.msg({
									msg:"操作失败！",
									ico:"warning"
								});
							}
						}

					});
				}
			});
			
	    });
	    //设置功能
	    $("#btnsetfunc").click(function(){
	    	var rows = $('#rolegrid').datagrid('getChecked');
			if (rows.length < 1) {
				$.alert({
 	    			title:"系统提示",
 	    			msg:"请选择要设置的角色！"
 	    		});
			} else if (rows.length > 1) {
				$.alert({
 	    			title:"系统提示",
 	    			msg:"只能选择一个角色设置功能！"
 	    		});
			} else {
				openTab("tabs","设置功能",'/bg/role/toSetFunction.do?roleid=' + rows[0].roleid);
			}
	    });
});

function submitForm() {
	$('#ff').form('submit', {
		url: path + "/bg/role/saveorupdate.do",
		onSubmit: function() {
			return $(this).form('enableValidation').form('validate');
		},
		success: function(data) {
			if (data == "1" || data * 1 == 1) {
				window.parent.closetabs();
			} else {
				$.msg({
					msg:"操作失败！",
					ico:"warning"
				});
			}
		}
	});
}

function clearForm() {
	$('#ff').form('reset');
	$('#ff').form('disableValidation');
}

//给树添加数据
function setTreeData(node) {
	if(node.isButton==true){
		return;
	}
	var roleid = $("#roleid").val();
	var pid = node.id;
    $.ajax({
    	url: path+'/bg/role/getRoleFunctions.do?roleid='+roleid+"&mpid="+pid,
        success: function(data) {
            $("#tt").tree("append", {
                parent: node.target,
                data: eval(data)
            });
        }
    });
};
//保存给角色添加的按钮控制权限
function saveFunction(){
	var allNodes = $("#tt").tree("getChildren");
	var isEffective = true;
	$(allNodes).each(function(){
		if($(this)[0].isButton==true){
			isEffective = false;
			return false;
		}
	});
	if(isEffective){
		$.alert({
 			title:"系统提示",
 			msg:"未进行有效操作，取消提交"
 		});
		var tab = $('#tabs').tabs('getSelected');
		var index = $('#tabs').tabs('getTabIndex', tab);
		$('#tabs').tabs('close', index);
		$('#rolegrid').datagrid('reload');
		return;
	}
	var nodes = $('#tt').tree('getChecked');
	var s = '';
	for (var i = 0; i < nodes.length; i++) {
		//如果是按钮就添加，如果不是按钮是模块，不添加
		if(nodes[i].isButton==true){
			if (s != '') 
				s += ',';
			s += ''+nodes[i].id;
		}
	}
	var r = $("#roleid").val().toString().trim();
	var url = path + "/bg/role/saveFunction.do?opid="+s;
	$('#sff').form('submit', {
		url: url,
 		success: function(data) {
 			if (data == "1" || data * 1 == 1) {
 				$.msg({
	        		ico:"success",
					msg:"操作成功！"
				});
 			} else {
 				$.msg({
					msg:"操作失败！",
					ico:"warning"
				});
 			}
 			var tab = $('#tabs').tabs('getSelected');
 			var index = $('#tabs').tabs('getTabIndex', tab);
 			$('#tabs').tabs('close', index);
 			$('#rolegrid').datagrid('reload');
 		}
 	});
}