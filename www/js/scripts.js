
/** Auto include sidebar **/
/**@TODO: Cache o this does not always load**/
$( "#menu-div" ).load( "sidebar-menu.html" );
$( "#user-info" ).load( "user-info.html" );
$( "#alert-modal" ).load( "alert-modal.html" );

/** Facebook **/
function isLoggedIn() {
    var loggedIn = false;
    var token = localStorage.getItem("token");
    if (token !== null) loggedIn = true;
    return loggedIn;
}

function errorHandler(error) {
    alert(error.message);
}

function throwError(title, message) {
    $('#alert-push-modal .modal-header').hide();
    $('#alert-push-modal #alert-title').html(title);
    $('#alert-push-modal #alert-msg').html(message);
    $('#alert-push-modal').modal('show');
    $('#alert-push-modal #read-more').hide();        
}

function getCrops() {
    var crops = '';
    $('input[name="crops"]:checked').each(function() {
        crops += this.value + ',';
    });
    crops = crops.slice(0,-1);

    return crops;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

function doRequest(url, params, callback) {
    console.log("doing request");
    if (params == null) {
        params = {};
    }

    params.token = localStorage.getItem("token");

    //Flag that an ajax request is in process
    localStorage.setItem("_ajaxRequestInProgress", "true");

    $.ajax({
        type: 'POST',
        dataType: "json",
        url: url,
        data: params,
        success: function(result) {

            localStorage.setItem("_ajaxRequestInProgress", "false");

            if (result.status != "failed") {
                //If request was made to alerts api server, save token
                if (url.indexOf(localStorage.getItem("_api_server")) >= 0) {
                    localStorage.setItem("token",result.token); 
                }

                if (callback) {
                    callback(result);
                }
            }
            else{
                if (result.data.token != null) {
                    throwError('Error', 'Your session token is either invalid or expired. Please log in again to continue.'); 
                    $('#alert-push-modal button.btn-default').click(function() {
                        $('#alert-push-modal').modal('hide');
                        logout();
                    });
                }
                else {
                    throwError('Error', result.data); 
                }
            }              
        },
        error: function () { 
            localStorage.setItem("_ajaxRequestInProgress", "false");
            throwError('Error', 'Could not connect to API server. <br/>Please try again later.');
        } 
    });

}



function request(url, params, callback) {

    if (localStorage.getItem("_ajaxRequestInProgress") == "false") {
        doRequest(url, params, callback);
    }
    else{
        setTimeout(function(){
            request(url, params, callback)
        },250);
    }
}

function subscribe(tag) {
    request(
        localStorage.getItem("_api_server") + "/user/subscription/add" , 
        {tagid: tag}, 
        null
    );
}

function unsubscribe(tag) {
    request(
        localStorage.getItem("_api_server") + "/user/subscription/remove" , 
        {tagid: tag}, 
        null
    );
}

function formatDate(date){
    var month = date.getMonth() + 1,
        day = date.getDate()
        output = date.getFullYear() + '-' +
            (month<10 ? '0' : '') + month + '-' +
            (day<10 ? '0' : '') + day ;

    return output;
}

function showAlerts(alerts){
    $.each(alerts, function( index, alert ) {
        var alertBox = populateAlert(alert);
        $('#active-alerts').append(alertBox);

        localStorage.setItem(
            "alert_" + alert.id,
            JSON.stringify(alert)
        );
    });



    //Setup onclick for alert pages
    $('.alert-link').click(function(){
        var id = this.id;
        window.location.replace("alert.html?id=" + id);
    });
}

function logout() {
    if (isLoggedIn()) {
        openFB.init({appId: localStorage.getItem("_FB_app_id")});
        openFB.logout();
    }
    localStorage.clear();
    window.location.replace("index.html");
}


function populateAlert(alert) {

    return html = 
        '<li class="alert-link" id="' + alert.id + '">' +
            '<div class="block ' + alert.level.toLowerCase() + '">' +
                '<div class="block_content">' +
                    '<h2 class="title ' + alert.level.toLowerCase() + ' ' + alert.type.toLowerCase() + ' ">' +
                    '<a>' + alert.title + '</a>' +
                    '</h2>' +
                    '<div class="byline">' +
                    '<span>' + alert.datesent.substring(0, 10) + '</span> by <a>' + alert.author + '</a>' +
                    '</div>' +
                    '<p class="excerpt">' + alert.details.substring(0, 150) + '...' +
                    '<br/><a>Read more</a></p>' +
                '</div>' +
            '</div>' +
        '</li>';

}

function getTagIDsString() {
    var subscription = JSON.parse(localStorage.getItem("settings_subscription")),
        tags = $.map(subscription, function(element,index) {return index}),
        tags_string = tags.join(',');

    return tags_string;
}

function fetchTags() {
                request(
                    localStorage.getItem("_api_server") + "/tags", 
                    null, 
                    function(result) {
                        
                        //@TODO: Remove crop tags
                        tags = result.data;
                        localStorage.setItem("locations", JSON.stringify(tags));
                        console.log(localStorage.getItem("locations"));

                        setLocationAutoComplete(tags);              
                    }
                );
                
            }

function setLocationAutoComplete(tags) {

    var tagsArray = $.map(
        tags, 
        function (value, key) {
            return {
                value: value,
                data: key
            };
        });

        $('.location').unbind();

        // Initialize autocomplete with custom appendTo:
        $('.location').autocomplete({
                lookup: tagsArray,
                appendTo: '#autocomplete-container'
            });
        }
        
function mapLocations() {
    return locations = JSON.parse(localStorage.getItem("locations")),
        array = $.map(locations, function(value, index) {
            return [value];
        });
}

function getLocationID(locations, loc) {

    var id = null

    $.each(locations, function(key, value) {
        if (value == loc) {
            id = key;                       
        }
    });

    return id;
}


