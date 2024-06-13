$(document).ready(function() {
    var start_box = "";
    var start_box_url = "";

    function validate_myself() {
        var valids = true;
        $('.insurance-step-1 .error').hide();
        if ($('[name="myself_first_date"]').val() == "") {
            valids = false;

            $('.error.first_birth_date').show();
        }
        if ($('[name="myself_first_stay"]').val() == "") {
            valids = false;
            $('.error.first_city').show();
        }
        return valids;
    }


    $('.insurance-step-1 .start-box').click(function() {

        if ($(this).find('h2').text() == "Myself") {
            start_box_url = 'myself-2.html';
            start_box = 'myself';
            $('#myself-container').slideDown('fast');
        } else {
            start_box_url = 'myfamily-2.html';
            start_box = 'family';
            $('#myself-container').slideUp('fast');
        }
        $('.start-section1').addClass('remove-height')
        $('.insurance-step-1 .continue-btn').removeClass('grey-background').addClass('red-background')
    })
    $('.insurance-step-1 .continue-btn').click(function() {
        if (start_box != '') {
            if (start_box == 'family') {
                window.location.href = start_box_url;
            } else {
                if (validate_myself()) {
                    window.location.href = start_box_url;
                }
            }

        }
    })




});