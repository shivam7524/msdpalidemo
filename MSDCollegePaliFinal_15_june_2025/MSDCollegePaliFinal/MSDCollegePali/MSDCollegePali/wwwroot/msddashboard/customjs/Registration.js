
var registrationJS = {
    GetRegisteredUserList: function () {
        var i = 1;
        _dataTable = $('#ddlUserList').DataTable({
            "bAutoWidth": false,
            "bScrollCollapse": true,
            // "bLengthChange": false,
            "bFilter": false,
            "destroy": true,
            lengthMenu: [
                [10, 25, 50, 100, 250, 500, 1000],
                [10, 25, 50, 100, 250, 500, 1000]
            ],
            order: [[2, 'desc']],
            language: true,
            language: {
                emptyTable: 'No data available',
            },
            fixedColumns: true,
            fixedColumns: {
                left: 2,
            },
            fixedHeader: true,
            "sScrollY": "500px",
            scrollCollapse: true,
            scrollX: true,
            // "searching": true,
            "paging": true,
            "info": true,
            "lengthChange": true,
            "processing": false,
            "serverSide": false,
            language: {
                paginate: {
                    first: '<i class="fa fa-angle-double-left"></i>',
                    previous: '<i class="fa fa-angle-left"></i>',
                    next: '<i class="fa fa-angle-right"></i>',
                    last: '<i class="fa fa-angle-double-right"></i>',
                }
            },
            "ajax": {
                "url": "/Registration/GetUserList",
                "type": 'GET',
                "dataType": 'json',
            },
            columns: [
                {

                    data: "userId",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data: 'name', name: 'name', "autoWidth": true },
                { data: 'gender', name: 'gender', "autoWidth": true },
                { data: 'mobileNo', name: 'mobileNo', "autoWidth": true },
                { data: 'email', name: 'email', "autoWidth": true },
                { data: 'city', name: 'city', "autoWidth": true },
                { data: 'state', name: 'state', "autoWidth": true },
                { data: 'pinCode', name: 'pinCode', "autoWidth": true },
                {
                    data: 'registeredOn',
                    render: function (data, type, row) {
                        if (!data) {
                            return '';
                        }
                        return moment(data).format('MM/DD/YYYY h:mm A');
                    }
                },
            ],
            columnDefs: [
                { orderable: false, targets: [7] },
            ]
        });
        _dataTable.on('page.dt', function () {
        });
        $('#loader_page').addClass('d-none');
        $('#loader_page').hide();
    },
}
$("#ddlSaveUserDetails").click(function () {
    debugger;
    $('#progressPopup').removeClass('d-none');
    var name = $("#ddlName").val();
    var gender = $("#ddlGender").val();
    var mobileNo = $("#ddlMobileNo").val();
    var email = $("#ddlEmail").val();
    var password = $("#ddlPassword").val();
    var city = $("#ddlCity").val();
    var state = $("#ddlState").val();
    var address = $('#ddlAddress').val();
    var pinCode = $('#ddlPinCode').val();
    var formdata = {
        Name: name,
        Gender: gender,
        MobileNo: mobileNo,
        Email: email,        
        Password: password,
        City: city,
        State: state,
        Address: address,
        pinCode: pinCode
    };
    $.ajax({
        url: "/Registration/SaveUserRegistrationDetails",
        type: "POST",
        data: formdata,
        success: function (result) {
            debugger;
            if (result.data != "" && result.data != null && result.data != undefined) {
                if (result.data == "Insert Successfully") {
                    $('#progressPopup').addClass('d-none');
                    GLOBAL.SuccessMessage('All changes saved successfully');
                   // window.location.reload();
                }
                else {
                    $('#progressPopup').addClass('d-none');
                    GLOBAL.DangerMessage('Some error occured!');
                   
                }
            }
            else {
                $('#progressPopup').addClass('d-none');
                GLOBAL.DangerMessage('Some error occured!');
            }
        }
    });
});