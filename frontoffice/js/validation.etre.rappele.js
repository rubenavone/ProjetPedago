/**
 * Vérification captcha
 * @param string data
 * @todo get value after accepte captcha
 */
function submitCaptchaEtreRappele(data) {
    // $("input[name='g-recaptcha-response-etre-rappele']").val(data);
    // $(".kl-etre-rappele-btn-submit").removeAttr('disabled');
    // $(".kl-etre-rappele-btn-submit").click();
}

/**
 *
 * @param {string} _id_form
 * @param {object} $fields
 * @returns {undefined}
 * @todo for validator form
 */
function validatorBootstrapEtreRappele(_id_form, $fields) {
    $("#"+_id_form).bootstrapValidator({
        //message: 'Cette valeur est pas valable',
        fields: $fields
    }).on('error.field.bv', function(e, data) {
        data.bv.disableSubmitButtons(true); // disable submit buttons on errors
    }).on('status.field.bv', function(e, data) {
        data.bv.disableSubmitButtons(false); // enable submit buttons on valid
    }).on('success.field.bv', function(e, data) {
        var formValidator = $('#'+_id_form).data('bootstrapValidator');
    }).on('success.form.bv', function (e, t) {
        // if ($("input[name='g-recaptcha-response-etre-rappele']").val() == '') {
        //     e.preventDefault();
        // }
    });
}

$(function() {
    var fields_required = {};

    validatorBootstrapEtreRappele("id-form-etre-rappele", fields_required);
});