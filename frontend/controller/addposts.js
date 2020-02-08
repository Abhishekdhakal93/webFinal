 
      $(document).ready(function () {
      

          let imageFile = '';
          $("#postimage").on('change', function () {
              let formData = new FormData();
              let files = $("#postimage").get(0).files;
              if (files.length > 0) {
                  formData.append("imageFile", files[0]);
              }
              $.ajax({
                  type: 'POST',
                  url: 'http://localhost:9000/image',
                  contentType: false,
                  cache: false,
                  processData: false,
                  data: formData,
                  success: function (data) {
                      imageFile = data.filename;
                      
                      // $("#add-hero").prop("disabled", false);
                  },
                  error: function () {
                      alert("Post Image upload failed!");
                  }
              });
          });
             $('#postadd').click(function (e) { 
             e.preventDefault();
             
        
             posts = $("#posts").val();
             postimage = $("#postimage").val();
             postdate= $("#postdate").val(); 
            // eventvenue= $("#eventvenue").val();
             postdetails= $("#postdetails").val();
            
             data = {
         "postimage" : imageFile,
             "posts" : posts,
             "postdate":postdate,
             "postdetails":postdetails
             }
             console.log(data);
         
                             
                      $.ajax({  
                          url: 'http://localhost:9000/postadd/',
                          type: 'post',  
                          dataType: 'json',  
                          data:data,  
                          success: function (res, textStatus, xhr) {  
                                  alert('post Added Successfully');          
                         location.href="home.html";            
                          },  
                          error: function (xhr, textStatus, errorThrown) {  
                              console.log('Error in Operation');  
                          }  
                      });  
                  });
                  $.ajax({
                    url: 'http://localhost:9000/postadd',
                    type: 'get',
            
                    success: function (res, textStatus, xhr) {
                      console.log(res);
                      $.each(res, function (index) {
                        //posttable is id to connect with html
                        $('#posttable').append(
                          '<br>'+
                           '<div class ="cardres1">'
                           +
                           '<div class="card-body">'+
                          '<stong></strong>'
                         +'<div class="col">'+
                           '<br/>' +
                           '<div class=" card-body">'+

                           '<img class="card-img grid p-3" src="http://localhost:9000/'+res[index].postimage+'">' + '<br/>' + 
                         '<strong>Post</strong>'+':'
                         + res[index].posts+'</div>' +
                         '<div class ="col">' + 
                         '<strong>Post date</strong>'+':'
                         + res[index].postdate+'</div>' +'<div class ="col">' + 
                         '<strong>post details</strong>'+':'
                         + res[index].postdetails+'</div>' +
                         '<button class="btn btn-block btn-primary>' +'Delete' + '</button>'
          
                      +'<hr>'+'</div>'+
                      '</div>' // class name should be different
                        );
                      });
        
                    },
                    error: function (xhr, textStatus, errorThrown) {
                      console.log('Error in Operation');
                    }
                  });
                  
                  }); 
                   
        