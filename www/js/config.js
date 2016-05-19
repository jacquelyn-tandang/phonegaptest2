
localStorage.setItem("application_env", "production"); //test or production

localStorage.setItem("_api_server", "http://sarai.ph:82");
localStorage.setItem("_has_commodity", "false");
//localStorage.setItem("_api_server", "http://localhost:82");
localStorage.setItem("_domain", "sarai.ph:83");
localStorage.setItem("_api_key", "456");
localStorage.setItem("_user", "guest");
localStorage.setItem("_open_weather_map_apikey", "cdf61a76f093d1b3fc918e8cdd31bf4e");
localStorage.setItem("_ajaxRequestInProgress", "false");
localStorage.setItem("_FB_app_id", "1631061333814819");
localStorage.setItem("gps_enabled", "true");
localStorage.setItem("application_name", "PCAARRD Alerts");
localStorage.setItem("all_location_id", "1783");
//localStorage.setItem("all_location_id", "150");


if (localStorage.getItem("application_env") == "test") {
    //localStorage.setItem("_FB_app_id", "152234701463266");
    localStorage.setItem("_api_server", "http://localhost:82");
    //localStorage.setItem("_api_server", "http://www.sarai.ph:82");
    localStorage.setItem("_domain", "localhost:3000");
}