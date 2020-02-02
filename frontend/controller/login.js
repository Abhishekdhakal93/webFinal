$(document).ready(function () {
  $('#login').click(function (e) {  
    e.preventDefault();
     username = $("#username").val();
     password = $("#password").val();
     data = {
     "username" : username,
     "password" : password 
     }
     if(username == "" || password == "" ) {
      alert("Please Fill out the required fields!!");
    }
    else {
  $.ajax({  
    url: 'http://localhost:9000/login/',
    type: 'post',  
    dataType: 'json',  
    data:data,  
    success: function (res, textStatus, xhr) {  
      if(res.token!=null){
       localStorage.setItem('token', res.token); 
      if(res.userdata.usertype=="admin"){
    location.href="admin.html"
    alert("welcome admin")
      } else if(res.userdata.usertype=="user"){
        location.href="home.html"
        alert("welcome")
      }
      }          
    },  
    error: function (xhr, textStatus, errorThrown) {  
      console.log('Error in Operation');  
    }  
  }); 
}
});
});
