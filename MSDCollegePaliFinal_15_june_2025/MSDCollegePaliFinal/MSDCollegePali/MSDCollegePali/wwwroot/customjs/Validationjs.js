

var ValidationJS ={
    checkCurrency_Numeric: function (SourceId) {
        chargeField = document.getElementById(SourceId);
        if (chargeField) {
            chargeField.value = chargeField.value.replace(/[^0-9]/g, "");
        }
    },
}