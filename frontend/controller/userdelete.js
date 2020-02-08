

    $(document).ready(function () {



        $.getJSON('http://localhost:9000/users', function (res) {
          console.log(res)

               $.each(res, function (index) {
                $('#table').append("<tr><td>"+res[index].username+"</td><td>" + 
               "<Button class='delete' del_id='"+res[index]._id+"'>Delete</Button></td><td>"
               );
            });
        });
        //id table is defined in userprofile.html
        $('#table').on('click','.details',function(){
          id=$(this).attr('det_id');
          location.href="userdetails.html?id="+id;
        })
        $('#table').on('click','.delete',function(){
            id=$(this).attr('del_id');
            $.ajax({
              url:'http://localhost:9000/userdelete/'+id,
              type:'delete',
              success:function(res){
                alert('User deleted Successfully');
                  if(res.message=="success"){
                    location.href="userprofile.html"
                  }
              },
              error: function(xhr){

              }
            })
        })
    });
 

   


    