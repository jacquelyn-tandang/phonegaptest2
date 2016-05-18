/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/** ******  left menu  *********************** **/
$(function () {
    $('#sidebar-menu li ul').slideUp();
    $('#sidebar-menu li').removeClass('active');

    $('#sidebar-menu li').click(function () {
        if ($(this).is('.active')) {
            $(this).removeClass('active');
            $('ul', this).slideUp();
            $(this).removeClass('nv');
            $(this).addClass('vn');
        } else {
            $('#sidebar-menu li ul').slideUp();
            $(this).removeClass('vn');
            $(this).addClass('nv');
            $('ul', this).slideDown();
            $('#sidebar-menu li').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#menu_toggle').click(function () {
        if ($('body').hasClass('nav-md')) {
            $('body').removeClass('nav-md');
            $('body').addClass('nav-sm');
            $('.left_col').removeClass('scroll-view');
            $('.left_col').removeAttr('style');
            $('.sidebar-footer').hide();

            if ($('#sidebar-menu li').hasClass('active')) {
                $('#sidebar-menu li.active').addClass('active-sm');
                $('#sidebar-menu li.active').removeClass('active');
            }
        } else {
            $('body').removeClass('nav-sm');
            $('body').addClass('nav-md');
            $('.sidebar-footer').show();

            if ($('#sidebar-menu li').hasClass('active-sm')) {
                $('#sidebar-menu li.active-sm').addClass('active');
                $('#sidebar-menu li.active-sm').removeClass('active-sm');
            }
        }
    });
});

/* Sidebar Menu active class */
$(function () {
    var url = window.location;
    $('#sidebar-menu a[href="' + url + '"]').parent('li').addClass('current-page');
    $('#sidebar-menu a').filter(function () {
        return this.href == url;
    }).parent('li').addClass('current-page').parent('ul').slideDown().parent().addClass('active');
});

/** ******  /left menu  *********************** **/



/** ******  tooltip  *********************** **/
$(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    /** ******  /tooltip  *********************** **/
    /** ******  progressbar  *********************** **/
if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar(); // bootstrap 3
}
/** ******  /progressbar  *********************** **/
/** ******  switchery  *********************** **/
if ($(".js-switch")[0]) {
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function (html) {
        var switchery = new Switchery(html, {
            color: '#26B99A'
        });
    });
}
/** ******  /switcher  *********************** **/
/** ******  collapse panel  *********************** **/
// Close ibox function
$('.close-link').click(function () {
    var content = $(this).closest('div.x_panel');
    content.remove();
});

// Collapse ibox function
$('.collapse-link').click(function () {
    var x_panel = $(this).closest('div.x_panel');
    var button = $(this).find('i');
    var content = x_panel.find('div.x_content');
    content.slideToggle(200);
    (x_panel.hasClass('fixed_height_390') ? x_panel.toggleClass('').toggleClass('fixed_height_390') : '');
    (x_panel.hasClass('fixed_height_320') ? x_panel.toggleClass('').toggleClass('fixed_height_320') : '');
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    setTimeout(function () {
        x_panel.resize();
    }, 50);
});
/** ******  /collapse panel  *********************** **/
/** ******  iswitch  *********************** **/
if ($("input.flat")[0]) {
    $(document).ready(function () {
        $('input.flat').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });
    });
}
/** ******  /iswitch  *********************** **/
/** ******  star rating  *********************** **/
// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function ($, window) {
    var Starrr;

    Starrr = (function () {
        Starrr.prototype.defaults = {
            rating: void 0,
            numStars: 5,
            change: function (e, value) {}
        };

        function Starrr($el, options) {
            var i, _, _ref,
                _this = this;

            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            _ref = this.defaults;
            for (i in _ref) {
                _ = _ref[i];
                if (this.$el.data(i) != null) {
                    this.options[i] = this.$el.data(i);
                }
            }
            this.createStars();
            this.syncRating();
            this.$el.on('mouseover.starrr', 'span', function (e) {
                return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
            });
            this.$el.on('mouseout.starrr', function () {
                return _this.syncRating();
            });
            this.$el.on('click.starrr', 'span', function (e) {
                return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
            });
            this.$el.on('starrr:change', this.options.change);
        }

        Starrr.prototype.createStars = function () {
            var _i, _ref, _results;

            _results = [];
            for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
            }
            return _results;
        };

        Starrr.prototype.setRating = function (rating) {
            if (this.options.rating === rating) {
                rating = void 0;
            }
            this.options.rating = rating;
            this.syncRating();
            return this.$el.trigger('starrr:change', rating);
        };

        Starrr.prototype.syncRating = function (rating) {
            var i, _i, _j, _ref;

            rating || (rating = this.options.rating);
            if (rating) {
                for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                    this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                }
            }
            if (rating && rating < 5) {
                for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                    this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                }
            }
            if (!rating) {
                return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            }
        };

        return Starrr;

    })();
    return $.fn.extend({
        starrr: function () {
            var args, option;

            option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return this.each(function () {
                var data;

                data = $(this).data('star-rating');
                if (!data) {
                    $(this).data('star-rating', (data = new Starrr($(this), option)));
                }
                if (typeof option === 'string') {
                    return data[option].apply(data, args);
                }
            });
        }
    });
})(window.jQuery, window);

$(function () {
    return $(".starrr").starrr();
});

$(document).ready(function () {

    $('#stars').on('starrr:change', function (e, value) {
        $('#count').html(value);
    });


    $('#stars-existing').on('starrr:change', function (e, value) {
        $('#count-existing').html(value);
    });

});
/** ******  /star rating  *********************** **/
/** ******  table  *********************** **/
$('table input').on('ifChecked', function () {
    check_state = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    check_state = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var check_state = '';
$('.bulk_action input').on('ifChecked', function () {
    check_state = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    check_state = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    check_state = 'check_all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    check_state = 'uncheck_all';
    countChecked();
});

function countChecked() {
        if (check_state == 'check_all') {
            $(".bulk_action input[name='table_records']").iCheck('check');
        }
        if (check_state == 'uncheck_all') {
            $(".bulk_action input[name='table_records']").iCheck('uncheck');
        }
        var n = $(".bulk_action input[name='table_records']:checked").length;
        if (n > 0) {
            $('.column-title').hide();
            $('.bulk-actions').show();
            $('.action-cnt').html(n + ' Records Selected');
        } else {
            $('.column-title').show();
            $('.bulk-actions').hide();
        }
    }
    /** ******  /table  *********************** **/
    /** ******    *********************** **/
    /** ******    *********************** **/
    /** ******    *********************** **/
    /** ******    *********************** **/
    /** ******    *********************** **/
    /** ******    *********************** **/
    /** ******  Accordion  *********************** **/

$(function () {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

/** ******  Accordion  *********************** **/
/** ******  scrollview  *********************** **/
$(document).ready(function () {
  
    /*        $(".scroll-view").niceScroll({
                touchbehavior: true,
                cursorcolor: "rgba(42, 63, 84, 0.35)"
            });
*/
});
/** ******  /scrollview  *********************** **/


/** Auto include sidebar **/
/**@TODO: Cache o this does not always load**/
$( "#menu-div" ).load( "sidebar-menu.html" );
$( "#user-info" ).load( "user-info.html" );
$( "#alert-modal" ).load( "alert-modal.html" );

if (localStorage.getItem("received_alert")) {
    var page = localStorage.getItem("_received_alert");
    localStorage.removeItem("received_alert");
    window.location.replace(page);
}

function errorHandler(error) {
    alert(error.message);
}

function throwError(title, message) {
    $.LoadingOverlay("hide");
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
                    if (result.token != null) {
                        localStorage.setItem("token",result.token); 
                    }
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
        function(){
            $.LoadingOverlay("hide");
            $("#success-msg").removeClass("hidden");
            $(".bs-callout-info").addClass("hidden");
        }
    );
}

function unsubscribe(tag) {
    request(
        localStorage.getItem("_api_server") + "/user/subscription/remove" , 
        {tagid: tag}, 
        function(){
            $.LoadingOverlay("hide");
            $("#success-msg").removeClass("hidden");
            $(".bs-callout-info").addClass("hidden");
        }
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

    $("#active-alerts-div").LoadingOverlay("hide");
}

function showReports(alerts){
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
        window.location.replace("view-report.html?id=" + id);
    });

    $("#active-alerts-div").LoadingOverlay("hide");
}

function logout() {

    if (localStorage.getItem("_user") == "loggedin") {
        openFB.getLoginStatus(function(result){
            if (result.status == "connected") {
                openFB.init({appId: localStorage.getItem("_FB_app_id")});
                openFB.logout(function(){
                    openFB.getLoginStatus(function(result){
                        console.log("status after logout :" + result.status);
                    });
                    localStorage.clear();
                    console.log("FB logout");
                    console.log(localStorage);
                    window.location.replace("index.html");
                });
                
            }
        });  
    }
    else{
        localStorage.clear();
        window.location.replace("index.html");
    }
    
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

function getLocationID(locations, loc) {

    var id = null

    $.each(locations, function(key, value) {
        if (value == loc) {
            id = key;                       
        }
    });

    return id;
}

function apiLogin(data, redirect) {

    var params = {};
    params.apikey = localStorage.getItem("_api_key");
    params.pushtoken = localStorage.getItem("device_token");
            
    if (typeof device !== "undefined") {
        params.platform = device.platform;
        params.deviceid = device.uuid;
    }
    else {
        params.deviceid = "";
        params.pushtoken = "";

        if (data != null) {
            params.deviceid = data.id;
        }
        
        params.platform = "Browser";
    }

    if (data != null) {
        params.facebookid = data.id;
        params.name = data.name;
        params.email = data.email;
        params.gender = data.gender;
        params.picture = data.picture.data.url;
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_name", data.name);
        localStorage.setItem("_user", "loggedin");
    }

    request(
        localStorage.getItem("_api_server") + "/login", 
        params, 
        function(result) {
                    
            if (result.status == "failed") {
                var errormsg = "";
                $.each( result.data, function( key, value ) {
                    errormsg += value + "<br/>";
                });

                throwError('Login Error', errormsg);

                if (data != null) {
                    openFB.logout();
                    localStorage.clear();
                }

                $.LoadingOverlay("hide");
            }
            else{

                if (result.data.isadmin == "1") {
                    localStorage.setItem("_user", "admin");
                }
                        
                window.location.replace(redirect);          
            }
        }    
    );
}

function login() {

    return openFB.login(function(response) {
        var fbData = null;
        if(response.status === 'connected') {

            localStorage.setItem("token", response.authResponse.accessToken);

            openFB.api({
                path: '/me',
                params: {fields : 'name,email,id,gender,age_range,picture'},
                success: function(result) {
                    apiLogin(result, 'forecast.html');
                },
                error: errorHandler
            });

        } else {
            //alert('Facebook login failed: ' + response.error);
            $.LoadingOverlay("hide");
        }

        return fbData;

    }, {scope: 'email,publish_actions'});
}

// onSuccess Geolocation
    //
    function onGeoLocSuccess(position) {
        alert("geoloc");
        var APIKey = "AIzaSyBuILof_f707A6UoGFyjuZjkxSC5obq7SA";
        var longitude = position.coords.latitude;
        var latitude = position.coords.longitude;
        var query_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + longitude + "," + latitude + "&location_type=ROOFTOP&result_type=street_address&key=" + APIKey;

        $.ajax({
            type: 'GET',
            dataType: "json",
            url: query_url,
            data: {},
            success: function(data) {
                alert("ajax1success");
                var city = "Unknown";
                var town = "Unknown";

                $.each( data['results'],function(i, val) {
                    $.each( val['address_components'],function(i, val) {
                        
                        if ((val['types'] == "locality,political") && (val['long_name']!="")) {

                            town = val['long_name'];
                            

                            if ($("input#location").length) {
                                $("input#location").val(town); //If in reports page...autopopulate detected location
                            }
                            else {
                                localStorage.setItem("town", town);
                                $("#town").html(town);
                            }

                            
                            alert("request forecast");
                            requestForecast(town);
                            //@TODO: Use current location and register device async
                            //@TODO: DO not register location if in report page
                            
                            if (localStorage.getItem("locations")) {
                                //@TOD:Use cache if there is cache
                                 alert("has cache");
                                registerLocation(town);
                            }
                            else{
                                request(
                                    localStorage.getItem("_api_server") + "/tags", 
                                    null, 
                                    function(result){
                                        alert("ajax2success");
                                        localStorage.setItem("locations", JSON.stringify(tags));
                                        registerLocation(town);
                                    }
                                );
                            }

                        }
                    });
                });
            },
            error: function () { alert('Error fetching location. Please try again later'); } 
        });        
    }

    function registerLocation(loc) {

        var locations = JSON.Parse(localStorage.setItem("locations"));

        $.each(locations, function(key, value) {
                            
            if (value == loc) {

                request(
                    localStorage.getItem("_api_server") + "/tags", 
                    null, 
                    function(result) {
                        
                        var subscription = JSON.parse(localStorage.getItem("settings_subscription"));  
                        $.each( subscription, function( index, value ) {
                            if (index > 10) {
                                unsubscribe(index);
                            }
                        });
                        subscribe(key);
                        
                    }
                );


                
            }
        });

    }

    


