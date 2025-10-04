

var interVal;
GLOBAL = {

    timer: 2500,
    timer2: 5000,
    SuccessMessage: function (message, time) {
        time = $.isNumeric(time) ? time : GLOBAL.timer;
        $('.message-box').removeClass('danger').addClass('success');
        $('.message-box').find('span').html(message);
        $('.message-box').show();
        $('.message-box').fadeOut(time);
        setTimeout(function () {
            $('.message-box').find('span').html('');
        }, time);
    },
    DangerMessage: function (message, time) {
        time = $.isNumeric(time) ? time : GLOBAL.timer2;
        $('.message-box').removeClass('success').addClass('danger');
        $('.message-box').find('span').html(message);
        $('.message-box').show();
        $('.message-box').fadeOut(time);
        setTimeout(function () {
            $('.message-box').find('span').html('');
        }, time);

    },
}