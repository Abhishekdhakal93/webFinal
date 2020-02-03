
        $(document).ready(function () {
          var tok = localStorage.getItem('token');
          //alert(tok)
          let userid = ''
    
          $.ajax({
            url: 'http://localhost:9000/adddestination',
            type: 'get',
            beforeSend: function (xhr) {
              if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
              }
            },
    
            success: function (res, textStatus, xhr) {
              $.each(res, function (index) {
                $('#destinationtable').append(
                  '<div class="col-md-4 mx-auto">'
                      +'<div class="card mb-4 bg-dark text-white">'
                       +'<div class=" card-body">'+

                     '<img class="card-img grid p-3" src="http://localhost:9000/'+res[index].destinationimage+'">' + '<br/>' 
                    +
                 '<div class ="col card-title">' + 
                    
                 '<strong>destination Name</strong>'+
                 ':'
                 + res[index].destinationname+'</div>' +
                 '<strong>City</strong>'+':'
                 + res[index].city+'</div>' +
                 '<div class ="">' + 
                 '<strong>Location</strong>'+':'
                 + res[index].address+'</div>'
                //  '<div class ="col">' + 
                //  '<strong>Email</strong>'+ ':'
                //  +res[index].email+'</div>' +
                //  '<div class ="col">' + 
                //  '<strong>Details</strong>'+ ':'
                //  +res[index].details+'</div>' +'<div class ="col">' + 
                  // "<button class='btn btn-success clickme details'  det_id='"+res[index]._id+"'>More Details</button>"
                    // +'<hr>'
                     +"<button class='btn btn-success clickme details'  book_id='"+res[index]._id+"'>Book</button>"
  
              +'<hr>'+'</div>'  +'</div>'   // class name should be different
                );
            //     $('#destinationtable').on('click','.details',function(){
            //   id=$(this).attr('det_id');
            //   location.href="booking.html?id="+id;
            // })
            // $('#destinationtable').on('click','.details',function(){
                  
            //       id=$(this).attr('book_id');
            //       location.href="booking.html?id="+id;
            //    })
              });

            },
            error: function (xhr, textStatus, errorThrown) {
              console.log('Error in Operation');
            }
          });
        
        });
      