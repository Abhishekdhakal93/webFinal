 
      $(document).ready(function () {  
   
        //      let imageFile = '';
        //  $("#eventimage").on('change', function () {
        //      let formData = new FormData();
        //      let files = $("#eventimage").get(0).files;
        //      if (files.length > 0) {
        //          formData.append("imageFile", files[0]);
        //      }
             
        //      $.ajax({
        //          type: 'POST',
        //          url: 'http://localhost:9000/eventimage',
        //          contentType: false,
        //          cache: false,
        //          processData: false,
        //          data: formData,
        //          success: function (data) {
        //              imageFile = data.filename;
        //              // $("#add-hero").prop("disabled", false);
        //          },
        //          error: function () {
        //              alert("Event Image upload failed!");
        //          }
        //      });
        //  });
             $('#postadd').click(function (e) { 
             e.preventDefault();
             
        
             posts = $("#posts").val();
             image = $("#image").val();
             postdate= $("#postdate").val(); 
            // eventvenue= $("#eventvenue").val();
             postdetails= $("#postdetails").val();
            
             data = {
          //"eventimage" : imageFile,
             "posts" : posts,
            // "image" : image,
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
                         location.href="posts.html";            
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
                      $.each(res, function (index) {
                        $('#posttable').append(
                          '<br>'+
                           '<div class ="cardres1">'
                           +
                           '<div class="card-body">'+
                          '<stong></strong>'
                         +'<div class="col">'+
                           '<br/>' +
                         '<strong>Post</strong>'+':'
                         + res[index].posts+'</div>' +
                         '<div class ="col">' + 
                         '<strong>Post date</strong>'+':'
                         + res[index].postdate+'</div>' +'<div class ="col">' + 
                         '<strong>post details</strong>'+':'
                         + res[index].postdetails+'</div>' 
          
                      +'<hr>'+'</div>'+'</div>' // class name should be different
                        );
                      });
        
                    },
                    error: function (xhr, textStatus, errorThrown) {
                      console.log('Error in Operation');
                    }
                  });
                  
                  }); 
                   
        