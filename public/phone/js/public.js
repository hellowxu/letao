$('.bottom ul li').click(function(){
       
    // $(this).css({'color':'yellow'});
    // $('.bottom ul li p').css({'color':'yellow'}).siblings().css('color','white');
  
    $(this).children().css('color','yellow');
    $(this).siblings().children().css({'color':'white'});
   
    console.log($(this).index());
    
    if($(this).index()==0){
        location.href="index.html";
       
    }
    if($(this).index()==1){
        location.href="category.html";
    }
    if($(this).index()==2){
        location.href="search.html";
    }
    if($(this).index()==3){
        location.href="user.html";
    }
    
})