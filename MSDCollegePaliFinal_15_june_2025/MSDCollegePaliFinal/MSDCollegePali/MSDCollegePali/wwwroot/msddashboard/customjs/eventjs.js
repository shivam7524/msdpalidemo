


    $(document).ready(function () {
        $('#progressPopup').addClass('d-none');
        $(function () {
            $(document).on('click', '[data-toggle="lightbox"]', function (event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true
                });
            });

            $('.filter-container').filterizr({ gutterPixels: 3 });
            $('.btn[data-filter]').on('click', function () {
                $('.btn[data-filter]').removeClass('active');
                $(this).addClass('active');
            });
        })
    })

    function uploadImage() {
        var formData = new FormData();
        var fileInput = document.getElementById('Imagefile');

        if (fileInput.files.length > 0) {
            formData.append("Imagefile", fileInput.files[0]);

            $.ajax({
                url: "/AdminDashboard/UploadImage",
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response)
                {
                    $("#imageshow").attr("src", "/Files/" + response);
                    $("#Image").val("/Files/" + response);
                },
                error: function (error) {
                    alert("Error: " + error.responseText);
                }
            });
        }
        else {
            alert("Please select a file to upload.");
        }
    }



    function GetImageByPosition()
    {

        var Position = $("#Position").val();

        var formData = new FormData();
        formData.append("Position", Position);

        $.ajax({
            url: '/AdminDashboard/Getimagebypostion',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response)
            {
                $("#imageshow").attr("src", response);
                $("#Image").val(response);
            },
            error: function () {
                alert("Error occurred while saving data.");
            }
        });
    }

    function Save()
    {
        $('#progressPopup').removeClass('d-none');
        var Position = $("#Position").val();
        var Image = $("#Image").val();


        if (!Position || Position.trim() === "")
        {
            $('#progressPopup').addClass('d-none');
            GLOBAL.DangerMessage('Select Position ...!');
            return false;
        }

        if (!Image || Image.trim() === "" || Image.trim() === "/files/download.png")
        {
            $('#progressPopup').addClass('d-none');
            GLOBAL.DangerMessage('Please select Image...!');
            return false;
        }

        var formData = new FormData();
        formData.append("Position", Position);
        formData.append("Image", Image);

        $.ajax({
            url: '/AdminDashboard/SaveUpdateGallery',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data)
            {

               if(data == "1")
               {
                   $('#progressPopup').addClass('d-none');
                   GLOBAL.SuccessMessage('Save Successfully');
                   location.reload();

               }
               else if (data == "2")
               {
                   $('#progressPopup').addClass('d-none');
                   GLOBAL.SuccessMessage('Update Successfully');
                   location.reload();
               }
               else
               {
                   $('#progressPopup').addClass('d-none');
                   GLOBAL.DangerMessage('Something Went Wrong');
               }
            },
            error: function () {
                $('#progressPopup').addClass('d-none');
                GLOBAL.DangerMessage('Error occurred while saving data.');
            }
        });
    }




