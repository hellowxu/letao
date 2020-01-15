$('.c-p').click(function(){
    // var txt=$('.search').text();
    var txt=$('.search').val();
    console.log(txt);
          
   
    $(".history-ul").append("<li>"+txt+" <span>x</span>"+"</li>");
})

$('.history-list').on('click','span',function(){
    console.log(111);
    $(this).parent().remove();
})





