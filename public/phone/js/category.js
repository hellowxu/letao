
$(function() {
$.ajax({
    type:"get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function( info ) {
 
    var htmlStr=template("lefttmp",info);
    $('.left-ul').html(htmlStr);
    renderSecondById( info.rows[0].id );
    }
})

$('.center-left').on('click','li',function(){
     $(this).css('background-color','white')
     $(this).siblings().css('background-color',' #E3E4E5');
    var id=$(this).data('id');
    renderSecondById(id);
})




function renderSecondById(id){
    $.ajax({
        type:"get",
        url: "/category/querySecondCategory",
        data:{
            id:id,
        },
        dataType:'json',
        success:function(info){
            console.log(info)
            var htmlStr=template('righttmp',info)
            $('.right-ul').html(htmlStr);
        }
    })
}

})

