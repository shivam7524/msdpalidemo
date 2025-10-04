
    $(document).ready(function () {
        $('.team-item img').hover(function () {
            $(this).css({ 'transform': 'rotate(360deg)', 'transition': 'transform 0.6s ease-in-out' });
        }, function () {
            $(this).css({ 'transform': 'rotate(0deg)', 'transition': 'transform 0.6s ease-in-out' });
        });
    });

