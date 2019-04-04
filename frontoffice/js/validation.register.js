/**
 *
 * @param string data
 * @todo get value after accepte captcha
 */
function submitCaptcha(data) {
    // $("input[name='g-recaptcha-response']").val(data);
    // $(".kl-recherche-btn").removeAttr('disabled');
}

/**
 *
 * @param {string} _id_form
 * @param {object} $fields
 * @returns {undefined}
 * @todo for validator form
 */
function validatorBootstrap(_id_form, $fields) {
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
        // if ($("input[name='g-recaptcha-response']").val() == '') {
        //     e.preventDefault();
        // }
    });
}

$(function() {
    var password         = document.getElementById("user-password"),
        confirm_password = document.getElementById("user-confirm-password");
    var fields_required  = {
        "user-confirm-password": {
            validators: {
                notEmpty: {},
                callback: {
                    callback: function(value, validator, $field) {
                        if ($('#user-password').val() == value) {
                            return {
                                valid: true
                            };
                        } else {
                            return {
                                valid: false,
                                message : message_not_identical
                            };
                        }
                    }
                }
            }
        }
    };

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Mot de passe n'est pas identique");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange        = validatePassword;
    confirm_password.onkeyup = validatePassword;

    validatorBootstrap("id-create-compte-form", fields_required);
});