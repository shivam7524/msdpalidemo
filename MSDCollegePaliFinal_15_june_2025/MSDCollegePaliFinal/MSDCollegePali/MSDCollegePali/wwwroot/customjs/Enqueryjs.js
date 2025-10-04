var IsValid = false;
var EnqueryJS = {
    GetEnqueryList: function () {
        var i = 1;
        _dataTable = $('#example1').DataTable({
            "bAutoWidth": false,
            "bScrollCollapse": true,
            "bFilter": false,
            "destroy": true,
            lengthMenu: [
                [10, 25, 50, 100, 250, 500, 1000],
                [10, 25, 50, 100, 250, 500, 1000]
            ],
            language: true,
            language: {
                emptyTable: 'No matching records found!'
            },
            "fixedColumns": {
                left: 2,
            },
            "sScrollY": "500px",
            scrollCollapse: true,
            scrollX: true,
            "paging": true,
            "info": true,
            "lengthChange": true,
            "processing": false,
            "serverSide": false,
            "seaching":true,
            language: {
                emptyTable: 'No data available',
                paginate: {
                    first: '<i class="fa fa-angle-double-left"></i>',
                    previous: '<i class="fa fa-angle-left"></i>',
                    next: '<i class="fa fa-angle-right"></i>',
                    last: '<i class="fa fa-angle-double-right"></i>',
                }
            },
            "ajax": {
                "url": "/AdminDashboard/GetEnquery",
                "type": 'GET',
                "dataType": 'json',
            },
            columns: [
                {

                    data: "enqueryId",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data: 'name', name: 'name', "autoWidth": true },
                { data: 'mobile', name: 'mobile', "autoWidth": true },
                { data: 'email', name: 'email', "autoWidth": true },
                { data: 'courseName', name: 'courseName', "autoWidth": true },
                {
                    data: "enqueryId",
                    render: function (data, type, row, meta) {
                        var contactstatus = row.isContact ? "checked disabled" : "";
                        return `<input type='checkbox' data-enqueryid='${row.enqueryid}' id='ddl_enquery${row.enqueryid}' onclick='EnqueryJS.SaveEnqueryDetails(this,2)' ${contactstatus}>`;
                    }
                },
              
            ],
          
            createdRow: function (row, data, index) {
                // $('td', row).addClass('ellipsis-cell');
                $('td:eq(3)', row).addClass('ellipsis-cell').on('click', function () {
                    // Get message text from the clicked <td>
                    var messageText = $(this).text();

                    // Populate modal with message text details
                    $('#messageTextDetails').text(messageText);
                    $('#detailsModalLabel').text('Feedback');
                    // Show modal
                    $('#detailsModal').modal('show');
                });
                
            },
        });
    },
    SaveEnqueryDetails: function (obj,flag) {
        debugger;
        IsValid = flag == 2 ? true : EnqueryJS.ValidateEnqueryForm();
       $('#progressPopup').removeClass('d-none');
        if (IsValid) {
            var category = "";
            var ddlName = $('#inputName').val();
            var ddlMobile = $('#inputMobile').val();
            var ddlEmail = $('#inputEmail').val();
            var ddlCourse = $('#inputCourse').val();
            var ddlenqueryid = $(obj).attr('data-enqueryid');
            var msg = "Success! Your details has been submitted. We will contact you soon.";
            var obj = {
                Name: ddlName,
                Mobile: ddlMobile,
                Email: ddlEmail,
                Course: ddlCourse,
                Action: flag,
                EnqueryId: ddlenqueryid 
            }
            $.ajax({
                url: "/Home/SaveEnquery",
                type: "POST",
                data: obj,
                //async: false,
                success: function (result) {
                    debugger;
                    if (result.data != "" && result.data != null && result.data != undefined) {
                        if (result.msg == 1) {
                            ResetEnqueryForm();
                            HideLunchInquery();
                            alert(msg);
                            $('#progressPopup').addClass('d-none');
                        }
                        else if (result.msg == 2) {
                            EnqueryJS.GetEnqueryList();
                            GLOBAL.SuccessMessage('All changes saved successfully!');
                            setTimeout($('#progressPopup').addClass('d-none'), 2000);
                        }
                        else {
                            alert("Some error occured!");
                            $('#progressPopup').addClass('d-none');
                        }
                    }
                    else {
                        alert("Some error occured!");
                        $('#progressPopup').addClass('d-none');
                    }
                }
            });
        }
    },
    ValidateEnqueryForm: function () {
        if ($('#inputName').val() == "" || $('#inputName').val() == null || $('#inputName').val() == undefined) {
            alert('Please fill name!');
            IsValid = false;
            return false;
        }
        else if ($('#inputMobile').val() == "" || $('#inputMobile').val() == null || $('#inputMobile').val() == undefined) {
            alert('Please fill mobile!');
            IsValid = false;
            return false;
        }
        else if ($('#inputEmail').val() == "" || $('#inputEmail').val() == null || $('#inputEmail').val() == undefined) {
            alert('Please fill email!');
            IsValid = false;
            return false;
        }
        else if ($('#inputCourse').val() == "" || $('#inputCourse').val() == null || $('#inputCourse').val() == undefined) {
            alert('Please seelct course!');
            IsValid = false;
            return false;
        }
        else {
            IsValid = true;
            return true;
        }
    },
}