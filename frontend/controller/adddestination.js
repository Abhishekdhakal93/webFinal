$(document).ready(function () {

    let imageFile = '';
    $("#destinationimage").on('change', function () {
        let formData = new FormData();
        let files = $("#destinationimage").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/destinationimage',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                // $("#add-hero").prop("disabled", false);
            },
            error: function () {
                alert("destination Image upload failed!");
            }
        });
    });
    $('#adddestination').click(function (e) {
        e.preventDefault();


        destinationname = $("#destinationname").val();
        city = $("#city").val();
        address = $("#address").val();
        category = $("#category").val();
        details = $("#details").val();

        data = {
            "destinationimage": imageFile,
            "destinationname": destinationname,
            "city": city,
            "address": address,
            "category": category,
            "details": details,
        }
        console.log(data);

        $.ajax({
            url: 'http://localhost:9000/adddestination',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res, textStatus, xhr) {
                alert('destination Added Successfully');
                location.href = "home.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    });
});
