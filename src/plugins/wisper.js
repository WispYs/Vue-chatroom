(function(){
    'use strict';
    function define_Wisper() {
        var Wisper = {
            //类似jQ的$获取DOM元素
            $W : function(obj){
                var firstChild=obj.charAt(0);
                if(firstChild=="#"){
                    return document.getElementById(obj.substring(1));
                }else if(firstChild=="."){
                    var arr=[];
                    var aEls=document.getElementsByTagName("*");
                    for(var i=0;i<aEls.length;i++){
                        var aClassName=aEls[i].className.split(" ");
                        for(var j=0;j<aClassName.length;j++){
                            if(aClassName[j]==obj.slice(1)){
                                arr.push(aEls[i]);
                                break;
                            }
                        }       
                    }
                    return arr;
                }
                else{
                    return document.getElementsByTagName(obj);
                }
            },
            //设置cookie
            setCookie : function(key,value,time){ // setCookie("name","小明",3);
                var exp = new Date();
                exp.setDate(exp.getDate() + time);
                document.cookie = key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
            },

            //得到想要名称的cookie
            getCookie : function(key){
                var str = document.cookie;
                var arr = str.split(";");
                for(var i = 0; i < arr.length; i++){
                    var newArr = arr[i].split("=");
                    if(newArr[0] == key){
                        return decodeURI(newArr[1]);
                    }
                }
            },
            //删除cookie
            clearCookie : function(key){
                var exp = new Date();
                exp.setDate(exp.getDate() + time);
                document.cookie = key + "=" + encodeURI("") + ";expires=" + exp.toGMTString();
            },
            //获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
            getNowDate : function() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var dates = date.getDate();
                var min = date.getMinutes();
                var hour = date.getHours();
                var sec = date.getSeconds();
                function zero(n){
                    return n < 10 ? "0" + n : "" + n;
                }
                var currentdate = year + seperator1 + zero(month) + seperator1 + zero(dates)
                        + " " + zero(hour) + seperator2 + zero(min)
                        + seperator2 + zero(sec);
                return currentdate;
            },
            //获取目标
            getTarget : function (ev) { 
                return this.getEvent(ev).target || this.getEvent().srcElement;  
            }, 
            //阻止冒泡
            stopPropagation : function () { 
                if (window.event) {  
                    return this.getEvent().cancelBubble = true;  
                } else {  
                    return arguments.callee.caller.arguments[0].stopPropagation(); 
                }  
            },  
            //阻止默认行为  
            stopDefault : function () { 
                if (window.event) {  
                    return this.getEvent().returnValue = false;  
                } else {  
                    return arguments.callee.caller.arguments[0].preventDefault();  
                }  
            },  
            //是否微信打开
            isWechatClient: function() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            },
            //设备是否是手机方法一：根据终端设备属性
            isMobile : function(){
                if( navigator.userAgent.match(/Android/i)|| navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/Windows Phone/i)){
                    return true;
                }
                else {
                    return false;
                }
            },
            //设备是否是手机方法二：根据分辨率
            isMobile2 : function(){
                if(window.innerWidth <= 800 && window.innerHeight <= 600) {
                    return true;
                } else {
                    return false;
                }
            },
            //设备是否是Android
            isAndroid : function(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if(isAndroid){
                    return true;
                }else{
                    return false;
                }
            },
            //设备是否是IOS
            isiOS : function(){
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isiOS){
                    return true;
                }else{
                    return false;
                }
            },
            //生成n位随机数
            BulidSid : function(n){
                var siddata = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                var sidresult = "";
                for (var i = 0; i < n; i++) {
                    var r = Math.floor(Math.random() * 36); //取得0-36间的随机数，目的是以此当下标取数组data里的值！  
                    sidresult += siddata[r];   
                }
                return sidresult;
            },
            //生成时间戳id
            getSid : function(){
                return new Date().getTime()+""+Math.floor(Math.random()*899+100);
            },
            //Ajax
            ajax : function(options){
                var defaults={
                    method:options.method||"get",
                    url:options.url,
                    data:options.data||"",
                    successFn:options.successFn||null,
                    dataType: options.dataType || ""
                }
                defaults.method=options.method.toLowerCase();
                
                 if( defaults.url === "" ){
                        alert( "url不能为空" );
                        return;
                      }
                var xhr=null;
                try{
                    xhr=new XMLHttpRequest();
                }catch(e){
                    xhr=new ActiveXObject("Microsoft.XMLHTTP");
                }
                if(defaults.method=='get'&&defaults.data){
                    defaults.url +='?'+defaults.data;
                }
                xhr.open(defaults.method,defaults.url,true);
                if(defaults.method=='get'){
                    xhr.send();
                }else{
                    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
                    xhr.send(defaults.data);
                }
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4){
                        if(xhr.status==200){
                            var data=xhr.responseText;
                             if( defaults.dataType.toLowerCase() === "json" ){
                                data = JSON.parse( data );
                            }

                            if( defaults.dataType.toLowerCase() === "xml" ){
                               data = xhr.responseXML;
                            }
                            
                             if( typeof defaults.successFn === "function" ){
                              defaults.successFn(data);
                            }
                        }else{
                            alert('出错了,Err:'+xhr.status);
                        }
                    }
                }
            },
            //根据数组中对象的某一项排序
            objectSort : function(arr, key){
                arr.sort(function(a,b){  
                    return a.key - b.key;  
                })  
                return arr;  
            },
            //验证非空
            trim: function(str){
                return str.replace(/(^\s*)|(\s*$)/g, '');
            },
            //实现金钱格式化
            formatCash : function(str){
                var format = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return format;
            },
            //验证邮箱
            isEmail : function (e) { 
                var re = /^[a-zA-z_][a-zA-Z_0-9]*?@\w{1,}.\[a-zA-Z]{1,}/;  
                return re.test(e);  
            }, 
            //验证手机号
            isPhone : function(e){
                var re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; 
                return re.test(e);  
            },
            //验证国内邮编
            isZipCode : function(e){
                var re = /[1-9]\d{5}(?!\d)/; 
                return re.test(e);  
            },
            //验证身份证：15位和18位
            isIDCard : function(e){
                var re15 = /^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$/; 
                var re18 = /^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$/
                return re15.test(e) || re18.test(e);
                
            },
            //验证登录名：只能输入3-20个以字母开头、可带数字、“_”、“.”的字串 
            checkUsername : function(e) { 
                var re = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){2,19}$/; 
                return re.test(e);  
            },
            //验证密码：只能输入6-20个字母、数字、下划线 
            checkPassword : function(e) { 
                var re = /^(\w){6,20}$/; 
                return re.test(e);  
            },
            //验证密码长度：密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
            passwordStrength : function(e){
                var re = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/; 
                return re.test(e);
            },
            //验证字符串仅能是中文
            isChinese :function(e){
                var re = /^[\u4e00-\u9fa5]{0,}$/; 
                return re.test(e);  
            },
            //验证日期：“yyyy-mm-dd“ 格式的日期校验，已考虑平闰年。
            isDate : function(e){
                var re = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/; 
                return re.test(e);  
            },
            //验证非负整数
            isPositiveInteger : function(e){
                var re = /^\d+$/; 
                return re.test(e);  
            },
        };
        return Wisper;
    }
    
    if (typeof(Wisper) === "undefined") {
        window.Wisper = define_Wisper();
    } else {
        console.log("Wisper is already defined.");
    }
    //数组删除某一项
    Array.prototype.del = function(dx) {
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        this.splice(dx, 1);
    };
    Array.prototype.insert = function(index, item) {
        this.splice(index, 0, item);
    };
})();
