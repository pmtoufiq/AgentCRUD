
$(document).ready(function () {

    loadData();

    $('.a').on('change', function () {
        $('.a').not(this).prop('checked', false);
    });
    jQuery('.numbersOnly').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $("#imageBrowse").change(function () {

        var File = this.files;

        if (File && File[0]) {
            ReadImage(File[0]);
        }

    })

    
});

var ReadImage = function (file) {

    var reader = new FileReader;
    var image = new Image;

    reader.readAsDataURL(file);
    reader.onload = function (_file) {

        image.src = _file.target.result;
        image.onload = function () {

            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";

            $("#targetImg").attr('src', _file.target.result);
            $("#description").text("Size:" + size + ", " + height + "X " + width + ", " + type + "");
            $("#imgPreview").show();

        }

    }

}

var ClearPreview = function () {
    $("#imageBrowse").val('');
    $("#description").text('');
    $("#imgPreview").hide();

}


//Load Data function

function loadData() {

    $.ajax({

        url: "/Home/List",

        type: "GET",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            var html = '';

            $.each(result, function (key, item) {

                html += '<tr>';

                html += '<td>' + item.BusinessId + '</td>';

                html += '<td>' + item.Code + '</td>';

                html += '<td>' + item.Email + '</td>';

                html += '<td>' + item.Name + '</td>';

                html += '<td>' + item.Street + '</td>';
                html += '<td>' + item.City + '</td>';
                html += '<td>' + item.State + '</td>';
                html += '<td>' + item.Country + '</td>';
                html += '<td>' + item.Mobile + '</td>';
                html += '<td>' + item.ContactPerson + '</td>';
                html += '<td>' + item.ReferredBy + '</td>';
                html += '<td> <img width="100" height="100" src=/Content/UploadedImage/' + item.Logo + '> </td>';
                html += '<td>' + item.LoginUrl + '</td>';
                html += '<td>' + item.CurrentBalance + '</td>';

                html += '<td><a href="#" onclick="return getbyID(' + item.BusinessId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.BusinessId + ')">Delete</a></td>';

                html += '</tr>';

            });

            $('.tbody').html(html);

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Add Data Function

function Add() {

    var res = validate();

    if (res == false) {

        return false;

    }
    

    
    var BusinessId = $('#BusinessId').val();

    var Code = $('#Code').val();

    var Email = $('#Email').val();

    var Name = $('#Name').val();

    var Street = $('#Street').val();
    var City = $('#City').val();
    var State = $('#State').val();
    var Zip = $('#Zip').val();
    var Country = $('#Country').val();
    var Mobile = $('#Mobile').val();
    var Phone = $('#Phone').val();
    var ContactPerson = $('#ContactPerson').val();
    var ReferredBy = $('#ReferredBy').val();
    var Status = $('#Status:checked').val();
    var Balance = $('#Balance').val();
    var LoginUrl = $('#LoginUrl').val();
    var SecurityCode = $('#SecurityCode').val();
    var SMTPPort = $('#SMTPPort').val();
    var CurrentBalance = $('#CurrentBalance').val();
    

    var formData = new FormData();
    formData.append("BusinessId", BusinessId);
    formData.append("Code", Code);
    formData.append("Email", Email);
    formData.append("Name", Name);
    formData.append("Street", Street);
    formData.append("City", City);
    formData.append("State", State);
    formData.append("Zip", Zip);
    formData.append("Country", Country);
    formData.append("Mobile", Mobile);
    formData.append("Phone", Phone);
    formData.append("ContactPerson", ContactPerson);
    formData.append("ReferredBy", ReferredBy);
    formData.append("Status", Status);
    formData.append("Balance", Balance);
    formData.append("LoginUrl", LoginUrl);
    formData.append("SecurityCode", SecurityCode);
    formData.append("SMTPPort", SMTPPort);
    formData.append("CurrentBalance", CurrentBalance);
    var totalFiles = document.getElementById("imageBrowse").files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById("imageBrowse").files[i];
        formData.append("imageBrowse", file);
    }
    
    $.ajax({
        type: "POST",
        url: "/Home/Add",
        data: formData,
        contentType: 'json',
        datatype: "json",
        contentType: false,
        processData: false,

        success: function (result) {
            
            $('#myModal').modal('hide');
            loadData();
            

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Function for getting the Data Based upon Business ID

function getbyID(BusID) {

    $('#Code').css('border-color', 'lightgrey');

    $('#Email').css('border-color', 'lightgrey');

    $('#Name').css('border-color', 'lightgrey');

    $('#City').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Zip').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#Mobile').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#ContactPerson').css('border-color', 'lightgrey');
    $('#ReferredBy').css('border-color', 'lightgrey');
    $('#Balance').css('border-color', 'lightgrey');
    $('#LoginUrl').css('border-color', 'lightgrey');
    $('#SecurityCode').css('border-color', 'lightgrey');
    $('#SMTPPort').css('border-color', 'lightgrey');
    $('#CurrentBalance').css('border-color', 'lightgrey');

    $("#Status[value=0]").attr("checked", false);
    $("#Status[value=1]").attr("checked", false);
    $.ajax({

        url: "/Home/getbyID/" + BusID,

        type: "GET",

        contentType: "application/json;charset=UTF-8",

        dataType: "json",

        success: function (result) {

            $('#BusinessId').val(result.BusinessId);

            $('#Code').val(result.Code);

            $('#Email').val(result.Email);

            $('#Name').val(result.Name);

            $('#Street').val(result.Street);
            $('#City').val(result.City);
            $('#State').val(result.State);
            $('#Zip').val(result.Zip);
            $('#Country').val(result.Country);
            $('#Mobile').val(result.Mobile);
            $('#Phone').val(result.Phone);
            $('#ContactPerson').val(result.ContactPerson);
            $('#ReferredBy').val(result.ReferredBy);
            //$('#imageBrowse').val(result.Logo);
            if (result.Status == 0) {
                $("input[type=checkbox][value=0]").prop("checked", true);
            } else if (result.Status == 1) {
                $("input[type=checkbox][value=1]").prop("checked", true);
            }
            else if (result.Status == 2) {
                $("input[type=checkbox][value=2]").prop("checked", true);
            } else if (result.Status == 3) {
                $("input[type=checkbox][value=3]").prop("checked", true);
            } 

                

            $('#Balance').val(result.Balance);
            $('#LoginUrl').val(result.LoginUrl);
            $('#SecurityCode').val(result.SecurityCode);
            $('#SMTPPort').val(result.SMTPPort);
            $('#CurrentBalance').val(result.CurrentBalance);

            $('#myModal').modal('show');

            $('#btnUpdate').show();

            $('#btnAdd').hide();

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

    return false;

}

//function for updating employee's record

function Update() {

    var res = validate();

    if (res == false) {

        return false;

    }

    var BusinessId = $('#BusinessId').val();

    var Code = $('#Code').val();

    var Email = $('#Email').val();

    var Name = $('#Name').val();

    var Street = $('#Street').val();
    var City = $('#City').val();
    var State = $('#State').val();
    var Zip = $('#Zip').val();
    var Country = $('#Country').val();
    var Mobile = $('#Mobile').val();
    var Phone = $('#Phone').val();
    var ContactPerson = $('#ContactPerson').val();
    var ReferredBy = $('#ReferredBy').val();
    var Status = $('#Status:checked').val();
    var Balance = $('#Balance').val();
    var LoginUrl = $('#LoginUrl').val();
    var SecurityCode = $('#SecurityCode').val();
    var SMTPPort = $('#SMTPPort').val();
    var CurrentBalance = $('#CurrentBalance').val();


    var formData = new FormData();
    formData.append("BusinessId", BusinessId);
    formData.append("Code", Code);
    formData.append("Email", Email);
    formData.append("Name", Name);
    formData.append("Street", Street);
    formData.append("City", City);
    formData.append("State", State);
    formData.append("Zip", Zip);
    formData.append("Country", Country);
    formData.append("Mobile", Mobile);
    formData.append("Phone", Phone);
    formData.append("ContactPerson", ContactPerson);
    formData.append("ReferredBy", ReferredBy);
    formData.append("Status", Status);
    formData.append("Balance", Balance);
    formData.append("LoginUrl", LoginUrl);
    formData.append("SecurityCode", SecurityCode);
    formData.append("SMTPPort", SMTPPort);
    formData.append("CurrentBalance", CurrentBalance);
    var totalFiles = document.getElementById("imageBrowse").files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById("imageBrowse").files[i];
        formData.append("imageBrowse", file);
    }

    $.ajax({
        type: "POST",
        url: "/Home/Update",
        data: formData,
        contentType: 'json',
        datatype: "json",
        contentType: false,
        processData: false,

        success: function (result) {

            loadData();

            $('#myModal').modal('hide');

            $('#BusinessId').val("");

            $('#Code').val("");

            $('#Email').val("");

            $('#Name').val("");

            $('#Street').val("");
            $('#City').val("");
            $('#State').val("");
            $('#Zip').val("");
            $('#Country').val("");
            $('#Mobile').val("");
            $('#Phone').val("");
            $('#ContactPerson').val("");
            $('#ReferredBy').val("");
            $('#Balance').val("");
            $('#LoginUrl').val("");
            $('#SecurityCode').val("");
            $('#SMTPPort').val("");
            $('#CurrentBalance').val("");

            
        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function Delele(ID) {

    var ans = confirm("Are you sure you want to delete this Record?");

    if (ans) {

        $.ajax({

            url: "/Home/Delete/" + ID,

            type: "POST",

            contentType: "application/json;charset=UTF-8",

            dataType: "json",

            success: function (result) {

                loadData();

            },

            error: function (errormessage) {

                alert(errormessage.responseText);

            }

        });

    }

}

//Function for clearing the textboxes

function clearTextBox() {

    $('#BusinessId').val("");

    $('#Code').val("");

    $('#Email').val("");

    $('#Name').val("");

    $('#Street').val("");
    $('#City').val("");
    $('#State').val("");
    $('#Zip').val("");
    $('#Country').val("");
    $('#Mobile').val("");
    $('#Phone').val("");
    $('#ContactPerson').val("");
    $('#ReferredBy').val("");
    $('#Balance').val("");
    $('#LoginUrl').val("");
    $('#SecurityCode').val("");
    $('#SMTPPort').val("");
    $('#CurrentBalance').val("");

    $('#btnUpdate').hide();

    $('#btnAdd').show();

    $('#Code').css('border-color', 'lightgrey');

    $('#Email').css('border-color', 'lightgrey');

    $('#Name').css('border-color', 'lightgrey');

    $('#Street').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Zip').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#Mobile').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#ContactPerson').css('border-color', 'lightgrey');
    $('#ReferredBy').css('border-color', 'lightgrey');
    $('#Logo').css('border-color', 'lightgrey');
    //$('#Status').css('border-color', 'lightgrey');
    $('#Balance').css('border-color', 'lightgrey');
    $('#LoginUrl').css('border-color', 'lightgrey');
    $('#SecurityCode').css('border-color', 'lightgrey');
    $('#SMTPPort').css('border-color', 'lightgrey');
    $('#CurrentBalance').css('border-color', 'lightgrey');

}

//Valdidation using jquery

function validate() {

    var isValid = true;
    if ($('#Code').val().trim() == "") {

        $('#Code').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Code').css('border-color', 'lightgrey');

    }

    if ($('#Email').val().trim() == "") {

        $('#Email').css('border-color', 'Red');

        isValid = false;

    } 
    else {

        $('#Email').css('border-color', 'lightgrey');

    }

    if ($('#Name').val().trim() == "") {

        $('#Name').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Name').css('border-color', 'lightgrey');

    }

    if ($('#Street').val().trim() == "") {

        $('#Street').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Street').css('border-color', 'lightgrey');

    }
    if ($('#City').val().trim() == "") {

        $('#City').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#City').css('border-color', 'lightgrey');

    }
    if ($('#State').val().trim() == "") {

        $('#State').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#State').css('border-color', 'lightgrey');

    }
    if ($('#Zip').val().trim() == "") {

        $('#Zip').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Zip').css('border-color', 'lightgrey');

    }
    if ($('#Country').val().trim() == "") {

        $('#Country').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Country').css('border-color', 'lightgrey');

    }
    if ($('#Mobile').val().trim() == "") {

        $('#Mobile').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Mobile').css('border-color', 'lightgrey');

    }
    if ($('#Phone').val().trim() == "") {

        $('#Phone').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Phone').css('border-color', 'lightgrey');

    }
    if ($('#ContactPerson').val().trim() == "") {

        $('#ContactPerson').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#ContactPerson').css('border-color', 'lightgrey');

    }
    if ($('#ReferredBy').val().trim() == "") {

        $('#ReferredBy').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#ReferredBy').css('border-color', 'lightgrey');

    }
    if ($('#Balance').val().trim() == "") {

        $('#Balance').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Balance').css('border-color', 'lightgrey');

    }
    if ($('#LoginUrl').val().trim() == "") {

        $('#LoginUrl').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#LoginUrl').css('border-color', 'lightgrey');

    }
    if ($('#SecurityCode').val().trim() == "") {

        $('#SecurityCode').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#SecurityCode').css('border-color', 'lightgrey');

    }
   
    if ($('#SMTPPort').val().trim() == "") {

        $('#SMTPPort').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#SMTPPort').css('border-color', 'lightgrey');

    }
    if ($('#CurrentBalance').val().trim() == "") {

        $('#CurrentBalance').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#CurrentBalance').css('border-color', 'lightgrey');

    }


    return isValid;

}