
$(document).ready(function () {

  let imageFile = '';
  $("#eventimage").on('change', function () {
    let formData = new FormData();
    let files = $("#eventimage").get(0).files;
    if (files.length > 0) {
      formData.append("imageFile", files[0]);
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:9000/eventimage',
      contentType: false,
      cache: false,
      processData: false,
      data: formData,
      success: function (data) {
        imageFile = data.filename;
        // $("#add-hero").prop("disabled", false);
      },
      error: function () {
        alert("Event Image upload failed!");
      }
    });
  });
  $('#eventadd').click(function (e) {
    e.preventDefault();


    eventname = $("#eventname").val();
    eventlocation = $("#eventlocation").val();
    eventdetails = $("#eventdetails").val();
    // eventvenue= $("#eventvenue").val();
    eventimage = $("#eventimage").val();

    data = {
      //"eventimage" : imageFile,
      "eventname": eventname,
      "eventlocation": eventlocation,
      "eventdetails": eventdetails
    }
    console.log(data);


    $.ajax({
      url: 'http://localhost:9000/eventadd/',
      type: 'post',
      dataType: 'json',
      data: data,
      success: function (res, textStatus, xhr) {
        alert('Event Added Successfully');
        location.href = "home.html";
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log('Error in Operation');
      }
    });
  });
  $.ajax({
    url: 'http://localhost:9000/eventadd',
    type: 'get',
    success: function (res, textStatus, xhr) {
      $.each(res, function (index) {
        $('#eventtable').append(
          '<br>' +
          '<div class ="cardres1">'
          +
          '<div class="card-body">' +
          '<stong></strong>'
          + '<div class="col">' +
          '<br/>' +
          '<strong>Event Name</strong>' + ':'
          + res[index].eventname + '</div>' +
          '<div class ="col">' +
          '<strong>location</strong>' + ':'
          + res[index].eventlocation + '</div>' + '<div class ="col">' +
          '<strong>Event details</strong>' + ':'
          + res[index].eventdetails + '</div>'

          + '<hr>' + '</div>' + '</div>' // class name should be different
        );
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log('Error in Operation');
    }
  });

});

