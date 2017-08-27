window.onload=function(){
//获取元素
   var first=document.getElementById('first');
   var pre=document.getElementById('pre');
   var next=document.getElementById('next');
   var last=document.getElementById('last');
   var content=document.getElementById('body2');
   var now=document.getElementById('now');
   var change=document.getElementById('change');
   var i = 0;
//创建XMLHttpRequest对象
	var req;
//避免IE6及以下版本浏览器不支持XHR
	if (window.XMLHttpRequest){
    	req=new XMLHttpRequest();
	}else{
    	req=new ActiveXObject("Microsoft.XMLHTTP");
	}
//设置连接信息 
//第一个参数表示http请求方式,支持所有http的请求方式,主要使用get和post 
//第二个参数表示请求的url地址
//第三个参数表示采用异步还是同步方式交互,true表示异步 
	req.open('get','http://rapapi.org/mockjsdata/14169/geek','true');
//发送数据表示和服务器端交互 
    req.send(null);
//处理服务器响应
	req.onreadystatechange=function(){
//把服务器接受的数据转换为JavaScript 对象
    	var txt = JSON.parse(req.responseText);  
//判断请求是否成功
    	if(txt.status == 1){
//请求成功
    	var num = txt.list.length;
		click(0);
//点击事件
  	 	function click(e){
    		content.innerHTML = txt.list[e];
    		var n = e+1;
    		now.innerHTML = "当前"+n+'/'+num+"页";
    		i=e;
    	}
//点击首页
    	first.onclick = function(){
    		click(0);
    };
//设置向前翻页
		pre.onclick = function(){
			if(i == 0){
				alert('已经是第一页了！');
				click(1);
			}
		   click(--i)
	};
//设置向后翻页
        next.onclick = function(){
        	if(i == num-1){
        		alert('已经是最后一页了！');
        		click(num -2);
        	}	
        	click(++i);
    };
//点击尾页
   		last.onclick = function(){
   		click(num-1);
	};
//点击跳转页面
    change.onclick = function(){
        var nm= document.getElementById('num').value;
        if(nm>num||num<0){
            alert('您输入的页码不存在，请重新输入');
        }else{
        click(nm-1);
        }
        document.getElementById('num').value = '';
    };
}
//请求失败
    else{
    	alert('请求失败');
    	}
	};
};
