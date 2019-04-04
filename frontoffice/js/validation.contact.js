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
    });
}

$(function() {
    var fields_required = {
        "email": {
            validators: {
                notEmpty: {},
                regexp: {
                    regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                }
            }
        }
    };

    validatorBootstrap("contact-form", fields_required);
});