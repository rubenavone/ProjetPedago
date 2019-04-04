$(function (e) {
    e.preventDefault;
    $('#landing').submit(function (event) {
        /*var compagny = $('#entreprise');
        var phone = $('#phone');
        var email = $('#email');
        var prenom = $('#firstName');
        var nom = $('#lastName');*/

        /*
        * Empêche html d'envoyer le mail à la place d'ajax
        * */
        event.preventDefault();
        $.ajax({
            type: 'POST',
            /*
            * Récupère l'url de l'action du formulaire
            * */
            url: $(this).attr('action'),
            /*
            * Serialise les données
            * */
            data: $(this).serialize(),
            success : function () {
                /*
                * Si le mail s'est bien envoyé, une notification est envoyée
                * */
                console.log('Le mail s est bien envoyé');
                $('#landing').notify('Le message s\'est bien envoyé', 'success');
            },
            error: function () {
                /*
                * Même chose si le message ne s'envoie pas avec un message d'erreur
                * */
                console.log('pas ok');
                $('#landing').notify('Une erreur est survenue', 'error');
            }
        })

    })
});