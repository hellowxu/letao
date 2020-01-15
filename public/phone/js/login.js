$(function(){

$('.btn-sure').click(function(){
    var username=$('#username').val();
    var password=$('#password').val();
    console.log(username);
     console.log(password);
    if(username.trim()===""){
        mui.toast("请输入用户名");
        return;
    }
    if(password.trim()===""){
     mui.toast("请输入密码");
     return;
    }


    $.ajax({
        type: "post",
        url: "/user/login",
        data:{
            username:username,
            password:password,
        },
        dataType:'json',
        success:function(info){
          console.log(info)
          if(info.error){
            mui.toast("用户名或者密码错误")
            return
          }
          if(info.success){
            if ( location.search.indexOf("retUrl") > -1 ) {
                var retUrl=location.search.replace("?retUrl=", "");
                location.href=retUrl;
            }
            else{
                location.href="user.html";
            }
          }
        }
        
        
        })
        




})




})