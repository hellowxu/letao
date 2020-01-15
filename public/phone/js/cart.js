$(function(){
    $.ajax({
        type: "get",
        url: "/cart/queryCart",
        dataType: "json",
       success:function(info){
           console.log(info)
      if(info.error){
        location.href = "login.html?retUrl=" + location.href;
        return;
      }
      var htmlStr=template('tmp',{ arr: info });
      $('.product').html(htmlStr);
       }
    })
})