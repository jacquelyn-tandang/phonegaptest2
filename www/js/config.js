
localStorage.setItem("application_env", "production"); //test or production

localStorage.setItem("_api_server", "http://188.166.215.70:82");
localStorage.setItem("_domain", "188.166.215.70:81");
localStorage.setItem("_api_key", "456");
localStorage.setItem("_user", "guest");
localStorage.setItem("_open_weather_map_apikey", "cdf61a76f093d1b3fc918e8cdd31bf4e");
localStorage.setItem("_ajaxRequestInProgress", "false");
//localStorage.setItem("_FB_app_id", "1631061333814819");
localStorage.setItem("_FB_app_id", "1685220765065542");


if (localStorage.getItem("application_env") == "test") {
    //localStorage.setItem("_FB_app_id", "152234701463266");
    localStorage.setItem("_api_server", "http://localhost:82");
    //localStorage.setItem("_api_server", "http://www.sarai.ph:82");
    localStorage.setItem("_domain", "localhost:3000");
}