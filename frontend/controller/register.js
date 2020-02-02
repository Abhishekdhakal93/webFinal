$(document).ready(function () {  
         
    let imageFile = '';
$("#imageupload").on('change', function () {
    let formData = new FormData();
    let files = $("#imageupload").get(0).files;
    if (files.length > 0) {
        formData.append("imageFile", files[0]);
    }
    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:9000/uploadImg',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (data) {
            imageFile = data.filename;
            // $("#add-hero").prop("disabled", false);
        },
        error: function () {
            alert("Profile Image upload failed!");
        }
    });
});

    $('#register').click(function (e) { 
    e.preventDefault();

    userfname = $("#userfname").val();
    userlname = $("#userlname").val();
    email= $("#email").val();
    username = $("#username").val(); 
    password= $("#password").val();
    passwordconf= $("#passwordconf").val();

    data = {
 "imageupload" : imageFile,
    "userfname" : userfname,
    "userlname" : userlname,
    "email":email,
    "username" : username,
    "password":password,
    "passwordconf":passwordconf,
    }
    console.log(data);
    // if(imageupload == "" || userfname == "" || userlname == "" || email == "" ||username == "" || password == "" || passwordconf == "")
    //  {
    //     alert("Please Fill out the required fields!!");
    //   }
    //   else if
    //       (password !== passwordconf){
    //           alert( "Password and confirm Password doesnot match" );
    //             }
        
    //   else 
    {      
             $.ajax({  
                 url: 'http://localhost:9000/register',
                 type: 'post',  
                 dataType: 'json',  
                 data:data,  
                 success: function (res, textStatus, xhr) {  
                         alert('User Registered Successfully');          
                location.href="login.html";            
                 },  
                 error: function (xhr, textStatus, errorThrown) {  
                     console.log('Error in Operation');  
                 } 
                 
             })
              
            } 
        });
        
         }); 