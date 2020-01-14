$(function(){
    var currentPage = 1; // 当前页
    var pageSize = 4; // 一页多少条
    var picArr = []; // 专门用来保存图片对象
  
    // 1. 一进入页面就进行页面渲染
    render();
  
    function render() {
      $.ajax({
        url: "/product/queryProductDetailList",
        type: "get",
        data: {
          page: currentPage,
          pageSize: pageSize
        },
        success: function( info ) {
          console.log(info);
          // 将模板与数据对象相结合, 渲染到页面中
          var htmlStr = template( "productTpl", info );
          $('.lt_content tbody').html( htmlStr );
  
          // 进行分页初始化
          $('#paginator').bootstrapPaginator({
            // 指定版本
            bootstrapMajorVersion: 3,
            // 当前页
            currentPage: info.page,
            // 总页数
            totalPages: Math.ceil(  info.total / info.size ),
            // 给下面的页码添加点击事件
            onPageClicked: function( a, b, c, page ) {
              currentPage = page;
              render();
            },
            // 配置按钮大小 large
            size: "normal",
            // 配置每个按键的文字
            // 每个按钮, 都会调用一次这个方法, 他的返回值, 就是按钮的文本内容
            itemTexts: function( type, page, current ) {
              // first 首页 last 尾页, prev 上一页, next 下一页, page 普通页码
              // page 是当前按钮指向第几页
              // current 是指当前是第几页 (相对于整个分页来说的)
              switch( type ) {
                case "first":
                  return "首页";
                case "last":
                  return "尾页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "page":
                  return page;
              }
            },
            // 配置提示框
            tooltipTitles: function( type, page, current) {
              switch( type ) {
                case "first":
                  return "首页";
                case "last":
                  return "尾页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "page":
                  return "前往第" + page + "页";
              }
            },
            // 使用 bootstrap 样式的提示框组件
            useBootstrapTooltip: true
          })
        }
      })
    };

    $('#addBtn').click(function(){
    //  $('#addModal').show();
    $('#addModal').modal("show");
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
          page:1,
          pageSize:100,
      },
      success:function(info){
        var htmlStr = template( "dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })
    })
    $('.dropdown-menu').on('click','.brand-a',function(){
      var txt=$(this).text();
      var id=$(this).data("id");
      $('#dropdownText').text(txt);
      
      $('[name="brandId"]').val(id);
     

    })


 
  $('#fileupload').fileupload({
    dataType: "json",
    done: function( e, data ) {
      console.log( data );     
      var picObj = data.result;     
      var picAddr = picObj.picAddr;     
      picArr.unshift( picObj );   
      $('#imgBox').prepend('<img src="'+ picAddr +'" width="100">');     
     if( picArr.length > 3 ) {  
       picArr.pop();  
       $("#imgBox img:last-of-type").remove();
     }
      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
      }

    }
  });

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
 
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
 
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
         
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
    
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
     
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
     
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });



  // $('#btn-add').click(function(e){
    $("#form").on("success.form.bv", function( e ) {
    e.preventDefault();
    var params = $('#form').serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
   $.ajax({
    type:"post",
    url:"/product/addProduct",
    data:params,
  
    success:function(info){
      if(info.success){
        $('#addModal').modal("hide");
        $('#form').data("bootstrapValidator").resetForm(true);
        currentPage = 1;
        render();
        $('#dropdownText').text("请选择二级分类")
        $('#imgBox img').remove();
        // 重置数组 picArr
        picArr = [];
      }
    }
   })
  })




})