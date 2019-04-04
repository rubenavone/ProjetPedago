var map_json_style = [
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dcdcdc"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#80ff80"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#80ff80"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "weight": 4
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fbbcb9"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f7f4f7"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "visibility": "on"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dcdcdc"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c0ccc4"
            },
            {
                "visibility": "simplified"
            },
            {
                "weight": 0.5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c0c0c0"
            },
            {
                "visibility": "simplified"
            },
            {
                "weight": 0.5
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#c0c0c0"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#c0c0c0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c0c0c0"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#3ebcef"
            },
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

$(function() {
    // Set active tab selon type de recherche
    $('#id-type-batiment').click(function() {
        $('#id-type-recherche').val('building');
        updateMap();
    });
    $('#id-type-groupe').click(function() {
        $('#id-type-recherche').val('group');
        updateMap();
    });

    $("#area").ionRangeSlider({
        postfix : " m&sup2;",
        min : _min_area,
        max : _max_area,
        type: 'double',
        to: $('#area-max').val(),
        from: $('#area-min').val(),
        onChange : function (data) {
            // Chargement
            var _loading = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
            $("#id-list-result").html(_loading);
        },
        onFinish : function (data) {
            $("#area").val(data.from);
            $("#area-min").val(data.from);
            $("#area-max").val(data.to);
            updateMap();
        }
    });

    // Affichage choix liste spécialisation
    $("#search-advanced").click(function() {
        $("#choice-activity").slideToggle(500);
    });

    // Ajax date de disponibilité
    // $('body').delegate('#date-available', 'dp.change', function(){
    //     $("#id-type-date").val('')
    //     updateMap();
    // });
    $('#date-available').on('dp.change', function(e){
        $("#id-type-date").val('')
        updateMap();
    })

    // Ajax choix secteur
    if (_id_sector_selected != '') {
        // Chargement
        var _loading = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
        $("#list-choice-activity").html(_loading);
        $.ajax({
            type: "POST",
            url: _ajax_uri_search_list_activity_by_sector,
            data: { 'id_sector' : _id_sector_selected },
            cache: false,
            success: function(_response) {
                $("#list-choice-activity").html('');
                $.each(_response, function(k, v) {
                    var div = '<div class="col-md-4">';
                    var checkbox = '<input type="checkbox" id="'+v.id+'" value="'+v.id+'" class="hide kl-default-checkbox">';
                    var label = '<label for="'+v.id+'" class="kl-default-checkbox-label" >'+v.name+' </label>';
                    var toappend = div + checkbox + label + '</div>';
                    $('#list-choice-activity').append(toappend);
                });
                if (_response.length == 0)
                    $('#list-choice-activity').append("<span>" + _msg_aucun + "</span>");

                $('#list-choice-activity').append('<div class="clearfix"></div>');
            }
        });
    }
    $('body').delegate('#id-sector', 'change', function(){
        // Chargement
        var _loading = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
        $("#list-choice-activity").html(_loading);
        // Afficher liste activité selon secteur
        var _id_sector = $(this).val();
        $.ajax({
            type: "POST",
            url: _ajax_uri_search_list_activity_by_sector,
            data: { 'id_sector' : _id_sector },
            cache: false,
            success: function(_response) {
                $("#list-choice-activity").html('');
                $.each(_response, function(k, v) {
                    var div = '<div class="col-md-4">';
                    var checkbox = '<input type="checkbox" id="'+v.id+'" value="'+v.id+'" class="hide kl-default-checkbox">';
                    var label = '<label for="'+v.id+'" class="kl-default-checkbox-label" >'+v.name+' </label>';
                    var toappend = div + checkbox + label + '</div>';
                    $('#list-choice-activity').append(toappend);
                });
                if (_response.length == 0)
                    $('#list-choice-activity').append("<span>" + _msg_aucun + "</span>");

                $('#list-choice-activity').append('<div class="clearfix"></div>');
            }
        });
        $("#id-sector").val(_id_sector);
        // Ajax recherche globale
        updateMap();
    });

    // Ajax choix activité
    $('body').delegate('input[type=checkbox]', 'change', function(){
        var _activities = $('input:checkbox:checked').map(function(){
            return this.value; }).get().join(",");
        $("#id-activities").val(_activities);
        // Ajax recherche globale
        updateMap();
    });

    /*
     * Afficher les espaces disponible dans un bâtiment
     */
    $('body').delegate('#quick-view-building', 'click', function(){
        var _titre       = $(this).attr("title");
        var _data_post   = {
            id_building : $(this).attr("id-building"),
            id_sector : $("#id-sector").val(),
            id_activities : $("#id-activities").val(),
            area_min : $("#area-min").val(),
            area_max : $("#area-max").val(),
            date : $("#date-available").val(),
            type_date : $("#id-type-date").val(),
            latitude : $("#latitude").val(),
            longitude : $("#longitude").val(),
            rayon : 30 // rayon à calculer selon zoom
        };

        // Afficher le popin
        $('#detail-building-modal').modal('show');

        // Chargement
        var _loading = '<i class="fa fa-spinner fa-spin" style="font-size:24px; color:#f59a00;"></i>';
        $("#result-space-available").show();
        $("#result-space-available").html(_loading);
        $("#id-listing-espace-modal").html(_loading);

        $.ajax({
            type: "POST",
            url: _ajax_uri_search_space_available_by_building,
            data: _data_post,
            cache: false,
            success: function(data) {
                $("#id-listing-espace-modal").html(data);
                $("#id-title-building").text(_titre);
                $('body').find(".kl-modal-owl-carousel").owlCarousel({
                    items : 3,
                    autoPlay : 7000,
                    itemsDesktop : [1000,3],
                    itemsDesktopSmall : [900,3],
                    itemsTablet : [600,2],
                    itemsMobile : [479,1]
                });
            }
        });
    });
});

/**
 * Ajax pour la recherche globale
 */
function ajaxSearch(_data_post) {
    // Chargement
    var _loading = '<i class="fa fa-spinner fa-spin" style="font-size:24px; color:#fff; "></i>';
    $("#id-list-result").html(_loading);

    $.ajax({
        type: "POST",
        url: _ajax_uri_search,
        data: _data_post,
        cache: false,
        success: function(_response) {
            $("#id-list-result").html(_response.view);
            $("#json-result").val(_response.json_results);
        }
    });
}

var map;

function initMap() {
    var location = $.parseJSON($('#json-result').val());
    var zoom_is_disable = $('#id-zoom').val();
    var map = new google.maps.Map(document.getElementById('map-search'), {
        zoom: zoom_is_disable != '' ? parseInt(zoom_is_disable) : 9,
        center: new google.maps.LatLng(_user_profil_latitude, _user_profil_longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_json_style
    });

    document.getElementById('latitude').value = _user_profil_latitude;
    document.getElementById('longitude').value = _user_profil_longitude;

    /*Autocomplete gmap*/
    var input = (document.getElementById('localisation'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        var center = map.getCenter();
        if (bounds && center) {
            var ne = bounds.getNorthEast();
            // Calculate radius (in meters).
            var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
            var radius_km = Math.floor(radius/1000);
            $("#id-radius").val(radius_km);
            updateMap();
        }
    });
}

function updateMap() {
    var radius_val = $("#id-radius").val();
    var zoom_val = $("#id-zoom").val();
    var rayon_set = !isNaN(parseFloat(radius_val)) && parseFloat(radius_val) != 0.000 ?  parseFloat(radius_val) : 0.3;
    var _data_post = {
        type_recherche : $("#id-type-recherche").val(),
        id_sector : $("#id-sector").val(),
        id_activities : $("#id-activities").val(),
        area_min : $("#area-min").val(),
        area_max : $("#area-max").val(),
        date : $("#date-available").val(),
        type_date : $("#id-type-date").val(),
        longitude : $("#longitude").val(),
        latitude : $("#latitude").val(),
        rayon : rayon_set
    };
    var icon_center_home = $('#id-icon-center-home').val();
    var icon_home = $('#id-icon-home').val();
    var icon_marker = $('#id-icon-marker').val();
    var center_latitude = _data_post.latitude;
    var center_longitude = _data_post.longitude;
    var zoom_init = !isNaN(parseInt($("#id-zoom").val())) ? parseInt($("#id-zoom").val()) : 9 ;

    var map = new google.maps.Map(document.getElementById('map-search'), {
        zoom: zoom_init,
        center: new google.maps.LatLng(center_latitude, center_longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_json_style
    });
    document.getElementById('latitude').value =  center_latitude;
    document.getElementById('longitude').value =  center_longitude;
    /*Autocomplete gmap*/
    var input = (document.getElementById('localisation'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    var bounds = map.getBounds();
    var center = map.getCenter();
    if (bounds && center) {
        var ne = bounds.getNorthEast();
        // Calculate radius (in meters).
        var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
        var radius_km = Math.floor(radius/1000);
        $("#id-radius").val(radius_km);

    }

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        document.getElementById('latitude').value = place.geometry.location.lat();
        document.getElementById('longitude').value = place.geometry.location.lng();
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
           // map.setZoom(50);  // Why 50? Because it looks greater.
        }
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        updateMap();


        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    });

    var info_content = [];
    var arrMarkers = {};

    var _loading = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    $("#id-list-result").html(_loading);

    $.ajax({
        type: "POST",
        url: _ajax_uri_search,
        data: _data_post,
        cache: false,
        success: function(_response) {
            $("#id-list-result").html(_response.view);
            //var location = _response.json_results;
            var locations = $.parseJSON(_response.json_results);
            var markers = locations.map(function (location, i) {
                var item = location;
                var url_icon = item.icon;
                if (item.type == 'building') {
                    url_icon = $('#id-icon-spec').val();
                }
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item.latitude, item.longitude),
                    uniq_id: item.uniq_id,
                    id: item.id,
                    map: map,
                    title: item.title,
                    type: item.type,
                    icon: url_icon,
                    label: item.nbr_space
                });

                arrMarkers[item.uniq_id] = marker;

                // Animation bounce
                $('.kl-result-selected').mouseover(function () {
                    var id_hover = $(this).attr('id');
                    arrMarkers[id_hover].setAnimation(google.maps.Animation.BOUNCE);
                    if (marker.uniq_id == id_hover) {
                        arrMarkers[id_hover].setAnimation(google.maps.Animation.BOUNCE);
                        return;
                    }
                });
                $('.kl-result-selected').mouseleave(function () {
                    var id_hover = $(this).attr('id');
                    var type_hover = $(this).attr('type');
                    arrMarkers[id_hover].setAnimation(null);
                    if (marker.uniq_id == id_hover) {
                        arrMarkers[id_hover].setAnimation(null);
                        return;
                    }
                });

                var id = item.id;
                var type = item.type;
                var titre = item.title;
                var link  = item.url_detail;
                var desc = item.description;
                var photos = item.images;
                var images_carousel = '';
                if(photos != null && photos.length > 0){
                    $.each(photos, function( index, value ) {
                        var is_active = index == 0 ? 'active' : '';
                        images_carousel += "<div class='item "+ is_active +" kl-carousel'><img width='250' height='250' src='"+ value +"' alt='"+titre+"'></div>";
                    });
                } else {
                    var src_default_img = '/img/no-image-space.jpg';
                    images_carousel = "<div class='item active kl-carousel'><img width='250' height='250' src='"+ src_default_img +"' alt='"+titre+"'></div>"
                }

                var infowindow = new google.maps.InfoWindow();

                // Afficher lien voir aperçu rapide
                var _link_quick_view = '';
                var _resume_description = '';
                if (type == 'building') {
                    _link_quick_view = "<a title='" + titre + "'id='quick-view-building' type='" + type
                        + "' + id-building='" + id + "' href='javascript:void(0)'>" + _message_quick_view
                        + " (" + item.nbr_space + " " + _message_available_space + ")</a></h3>";

                    _resume_description = "<span class='garages'>" + item.nbr_parking + "</span>";
                }
                if (type == 'group') {
                    _resume_description = "<span class='area'>" + item.area + "<sup>2</sup></span>";
                }

                info_content[i] = "<div class='kl-box-window'>"+
                    "<div class='kl-img-slide'>"+
                    "<div id='myCarousel' class='carousel slide relative' data-ride='carousel'>"+
                    "<div class='kl-quick-view absolute'>"+
                    "<div class='table'> "+
                    "<div class='table-cell'>"+_link_quick_view+
                    "<a href='" + link + "'>" + _message_view_detail + "</a> "+
                    "</div>"+
                    "</div>"+
                    "<div class='kl-item-specific'>"+_resume_description+
                    "</div>"+
                    "</div>"+
                    "<div class='carousel-inner' role='listbox'>"+ images_carousel +
                    "</div>"+
                    "<a class='left carousel-control hide' href='#myCarousel' role='button' data-slide='prev'><span><</span></a>"+
                    "<a class='right carousel-control hide' href='#myCarousel' role='button' data-slide='next'><span>></span></a>"+
                    "</div>"+
                    "<div class='kl-window-text'>"+
                    "<h3><a style='color: #f59a00' href='" + link + "'>" + titre + "</a>"
                "</div>"+
                "</div>";
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(info_content[i]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));

                return marker;
            });

            var marker_cluster = new MarkerClusterer(map, markers,
                {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                }
            );

            // Dragend map
            google.maps.event.addListener(map, 'dragend', function() {
                var bounds = map.getBounds();
                var center = map.getCenter();
                if (bounds && center) {
                    var ne = bounds.getNorthEast();
                    // Calculate radius (in meters).
                    var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
                    //var radius_km = Math.floor(radius/1000);
                    var radius_km = radius/1000;
                    $("#id-radius").val(radius_km);
                }

                document.getElementById('latitude').value = map.getCenter().lat();
                document.getElementById('longitude').value = map.getCenter().lng();
                updateMap();
            });
            // zoom map
            google.maps.event.addListener(map, 'zoom_changed', function() {
                var bounds = map.getBounds();
                var center = map.getCenter();
                var zoom_set = map.getZoom();
                if (bounds && center) {

                    var ne = bounds.getNorthEast();
                    // Calculate radius (in meters).
                    var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
                    //var radius_km = Math.floor(radius/1000);
                    var radius_km = radius/1000;
                    $("#id-radius").val(radius_km);
                }
                $("#id-zoom").val(zoom_set);
                document.getElementById('latitude').value = map.getCenter().lat();
                document.getElementById('longitude').value = map.getCenter().lng();
                updateMap();
            });
        }
    });
}
