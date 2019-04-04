/**
 * Initialisation google map
 */
function initialize() {
    var input_local                = document.getElementById('id-local');
    var input_local_refined        = document.getElementById('txt-lieu');
    var autocomplete_local         = new google.maps.places.Autocomplete(input_local);
    var autocomplete_local_refined = new google.maps.places.Autocomplete(input_local_refined);

    google.maps.event.addListener(autocomplete_local, 'place_changed', function () {
        var place       = autocomplete_local.getPlace();
        var lat         = place.geometry.location.lat();
        var lng         = place.geometry.location.lng();
        if (!place.geometry) {
            // Inform the user that the place was not found and return.
            input.className = 'notfound form-control controls';
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            $("#latitude").val(lat);
            $("#longitude").val(lng);
        }
    });

    google.maps.event.addListener(autocomplete_local_refined, 'place_changed', function () {
        var place       = autocomplete_local_refined.getPlace();
        var lat         = place.geometry.location.lat();
        var lng         = place.geometry.location.lng();
        if (!place.geometry) {
            // Inform the user that the place was not found and return.
            input.className = 'notfound form-control controls';
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            $("#latitude").val(lat);
            $("#longitude").val(lng);
        }
    });
}

// Onload handler to fire off the app.
google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(function () {
    //initialize();
});