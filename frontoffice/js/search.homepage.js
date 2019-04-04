$(function() {
    $("#btn-return-choice-sector, #affine-surface, #affine-date, #affine-lieu").hide();
    $("#bloc-search").removeClass('hide');

    $('#id-surface').keypress(function(event){
        if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
            event.preventDefault();
    }});

    $('#jobModal').on('hidden.bs.modal', function () {
        $(".kl-recherche-btn").removeAttr('disabled');
    });

    $("#id-surface").ionRangeSlider({
        postfix : " m&sup2;",
        min : _min_area,
        max : _max_area,
        type: 'double',
        from: _min_area,
        to: _max_area,
        onFinish : function (data) {
            $("#area-min").val(data.from);
            $("#area-max").val(data.to);
        }
    });

    /* Counter home */
    $('.kl-counter').counterUp({
        delay: 10,
        time: 3000
    });
});

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
        $('#jobModal').modal('show');
        var _success = $("#success").val();
        if (_success == '')
            return false;
    });
}

$( ".kl-recherche-btn" ).click(function() {
    var fields_required = {};

    validatorBootstrap("form-search", fields_required);

    // var _min_area = parseInt($("#id-surface").attr('min'));
    // var _max_area = parseInt($("#id-surface").attr('max'));
    // var _area     = $("#id-surface").val();
    // var _city     = $("#id-local").val();
    //
    // // Validation ville
    // if (_city == '') {
    //     _area.tooltip();
    //
    //     return false;
    // }
    //
    // // Validation surface
    // if (_area != '') {
    //     var _area = parseInt($("#id-surface").val());
    //     if ((_area >= _min_area) & (_area <= _max_area)) {
    //         $('#jobModal').modal('show');
    //
    //         return false;
    //     } else {
    //         _area.tooltip();
    //
    //         return false;
    //     }
    // } else {
    //     $('#jobModal').modal('show');
    //
    //     return false;
    // }
});

/**
 * Afficher la liste d'activité
 * @param integer _id
 * @param string _type
 */
function displayList(_id, _type) {
    // Récuperation url ajax
    var _url_ajax = $("#id-" + _id).attr("ajax-url");

    // Chargement
    var _loading  = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    $("#loading").show();
    $("#loading").html(_loading);

    $.ajax({
        type: "POST",
        url: _url_ajax,
        data: { 'id': _id, 'type': _type },
        cache: false,
        success: function(_response) {
            // Envoyer le formulaire
            $("#success").val("success");
            $('#jobModal').modal('toggle');
            $("#id-search-sector").val(_id);
            $("#form-search").submit();

            // if (_type == 'activity') {
            //     $("#loading, #affine-sector").hide();
            //     $("#affine-activity").show();
            //     $("#btn-return-choice-sector").show();
            //     $("#affine-activity").html(_response);
            // } else if (_type == 'specialization') {
            //     $("#loading, #affine-activity").hide();
            //     $("#affine-specialization").show();
            //     $("#btn-return-choice-sector").show();
            //     //$("#affine-specialization").html(_response);
            //
            //     // Envoyer le formulaire
            //     $('#jobModal').modal('toggle');
            //     $("#id-search-activity").val(_id);
            //     $("#form-search").submit();
            // }
        }
    });
}

/**
 * Récupérer les séléctions spécialisations dans le recherche popin affiné
 */
function getSpecializationPopin() {
    var _selected_values = $("#choice-specialization").val();

    $("#id-specialization").val(_selected_values);

    $("#affine-specialization").hide();
    $("#affine-lieu").show();
}

/**
 * Récupérer les séléctions spécialisations dans le formulaire de recherche
 */
function getSpecialization() {
    var _selected_values = $("#id-poste").val();

    $("#id-specialization").val(_selected_values);
}

/**
 * Valider le choix lieu
 */
function validPlace() {
    var _place = $("#txt-lieu").val();

    $("#id-local").val(_place);

    $("#affine-lieu").hide();
    $("#affine-date").show();
}

/**
 * Valider la date disponible
 */
function validDate() {
    var _date = $("#txt-quand").val();

    $("#id-quand").val(_date);

    $("#affine-date").hide();
    $("#affine-surface").show();
}

/**
 * Valider la surface
 */
function validArea() {
    var _area = $("#txt-surface").val();

    $("#id-surface").val(_area);

    $("#affine-surface").hide();

    $('#jobModal').modal('toggle');

    // Envoyer le formulaire
    $("#form-search").submit();
}

/**
 * Envoyer la formulaire de recherche (sans filtre)
 */
function sendFormSearchWithoutFilter() {
    // Vider les valeurs de recherche
    // $("#id-specialization").val('');
    // $("#longitude").val('');
    // $("#latitude").val('');
    // $("#id-quand").val('');
    // $("#id-surface").val('');

    $("#success").val("success");
    $('#jobModal').modal('toggle');

    // // Envoyer le formulaire
    $("#form-search").submit();
}

/**
 * Revenir au précédent
 * @param string _type
 */
function returnStep(_type) {
    // Secteur
    if (_type == 'sector') {
        $("#affine-activity").hide();
        $("#affine-sector").show();
    }

    // Activité
    if (_type == 'activity') {
        $("#affine-specialization").hide();
        $("#affine-activity").show();
    }

    // Spécialisation
    if (_type == 'specialization') {
        $("#affine-lieu").hide();
        $("#affine-specialization").show();
    }

    // Lieu
    if (_type == 'place') {
        $("#affine-date").hide();
        $("#affine-lieu").show();
    }

    // Date disponibilité
    if (_type == 'date') {
        $("#affine-lieu").hide();
        $("#affine-date").show();
        $("#affine-surface").hide();
    }
}

/**
 * Revenir au choix secteur
 */
function returnChoiceSector() {
    $("#affine-specialization, #affine-activity, #btn-return-choice-sector, #btn-valid-specialization").hide();
    $("#affine-sector").show();
}