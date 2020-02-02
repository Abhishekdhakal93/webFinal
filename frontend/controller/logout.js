$(document).ready(function () {  
    $("#logout").click(function(){
        var tok=localStorage.getItem('token'); 
        $.ajax( {
     type: 'post',
     url: 'http://localhost:9000/users/logout',
     beforeSend: function(xhr) {
       if (tok) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
       }
     },
     success: function(data) {
    location.href="login.html";
                                     
        },
     error: function() {
       alert("Sorry, you are not logged in.");
     }
    });
      });
    })
    