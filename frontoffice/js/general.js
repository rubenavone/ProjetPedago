/**
 * Javascript général
 */

$(function() {
    // Plugins select2
    $(".select2").select2();

    //custom ScrollBar
    $('.kl-content-popin .kl-info-box-popin').mCustomScrollbar();
    $('.kl-sidebar-left-search').mCustomScrollbar();
    $("#news-letter-form").submit(function(e) {
        $("#id-news-letter-mail").attr("required", "required");
        if ($("#id-news-letter-mail").val() == "") {
            return false;
        }
        $.ajax({
            type: "POST",
            url: _url,
            data: $("#news-letter-form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                if (data.success == true) {
                    bootbox.alert(_message_email_newsletter_success);

                } else {
                    bootbox.alert(_message_email_newsletter_failure);
                }
                $("#id-news-letter-mail").val("");
                $("#id-news-letter-mail").removeAttr("required");
            }
        });
        $("#id-news-letter-mail").attr("required", "required");
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

});

function invalidMsg(textbox) {
    if (textbox.value == '') {
        textbox.setCustomValidity(_message_email_newsletter_required);
    } else if (textbox.validity.typeMismatch) {
        textbox.setCustomValidity(_message_email_newsletter_typemismatch);
    } else if (textbox.validity.patternMismatch) {
        textbox.setCustomValidity(_message_email_newsletter_patternmismatch);
    } else {
        textbox.setCustomValidity('');
    }
    return true;
}