/**
 * Created by Jepson on 2018/4/7.
 */

$(function() {


  // 当前页
  var currentPage = 1;
  // 一页多少条
  var pageSize = 5;

  
  render();

  function render() {
    
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "tpl", info );   
        $('.fist-tab').html(htmlStr);

        // 配置分页
        $('#paginator').bootstrapPaginator({     
         bootstrapMajorVersion: 3,    
          currentPage: info.page,   
          totalPages: Math.ceil( info.total / info.size ),      
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          }
        });

      }
    });
  }

  $('.lt_content tbody').on("click", ".btn", function() {
    console.log( "呵呵额" );   
    $('#userModal').modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-stop") ? 0 : 1;
    // var isDelete=isDelete==1?0:1;
    console.log( id );
    console.log(isDelete);
    $('#submitBtn').off("click").on("click", function() {
      // console.log();
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete,
        },
        success: function( info ) {
          console.log( info )
          if ( info.success ) {
            // 关闭模态框
            $('#userModal').modal("hide");
            // 重新渲染
            render();
          }
        }
      })
    })
  })

  // $('.lt_content tbody').on("click", ".btn-open", function() {
  //   console.log( "呵呵额" );
  //   // 弹出模态框
  //   $('#userModal').modal("show");

  //   // 用户 id
  //   var id = $(this).parent().data("id");
  //   // 获取将来需要将用户置成什么状态
  //   var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
  //   console.log( id );
  //   console.log(isDelete);

  //   // 先解绑, 再绑定事件, 可以保证只有一个事件绑定在 按钮上
  //   $('#submitBtn').off("click").on("click", function() {

  //     $.ajax({
  //       type: "post",
  //       url: "/user/updateUser",
  //       data: {
  //         id: id,
  //         isDelete: isDelete,
  //       },
  //       success: function( info ) {
  //         console.log( info )
  //         if ( info.success ) {
  //           // 关闭模态框
  //           $('#userModal').modal("hide");
  //           // 重新渲染
  //           render();
  //         }
  //       }
  //     })
  //   })
  // })


})
