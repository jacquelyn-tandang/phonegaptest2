/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    tokenHandler:function(msg) {
        //alert("Token Handler " + msg);
        localStorage.setItem("device_token", msg);
    },
    errorHandler:function(error) {
        alert("Error Handler  " + error);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        //alert('Success! Result = '+result)
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"174923399449","ecb":"app.onNotificationGCM"});
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"false","ecb":"app.onNotificationAPN"});
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //alert('Received Event: ' + id);
    },
    // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        if (event.alert) {
            //navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }

        this.showAlert(event);
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    //Successfully registered Device token
                    localStorage.setItem("device_token", e.regid);
                }
            break;

            case 'message':
                // this is the actual push notification. its format depends on the data model
                // of the intermediary push server which must also be reflected in GCMIntentService.java
                
                this.showAlert(e.payload);

            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    },
    showAlert: function(alert_details) {

        //Show alert dialog
        $('#alert-push-modal #modal-title').html('New alert received!'); 
        $('#alert-push-modal #alert-title').html(alert_details.title); 
        $('#alert-push-modal #alert-msg').html(alert_details.message); 
        $('#alert-push-modal #read-more').show(); 
        $('#alert-push-modal #read-more').click(function() {
        $('#alert-push-modal').modal('hide');
                    
            //Save alert details
            localStorage.setItem("alert_" + alert_details.id, JSON.stringify(alert_details));
                    
            //Load alert page
            window.location.replace("alert.html?id=" + alert_details.id);
                    
            //Clear today's forecast cache
            var date = new Date();
            date = formatDate(date);
            localStorage.removeItem("alerts_" + date);
        });
                
        $('#alert-push-modal').modal('show');
                
        //Update unread count
        var count = $('span#unread').html();

        //newCount;
        if (count == '') {
            count = 1;
            $('#unread-alerts').attr("class", "fa fa-envelope-o");
        }
        else {
            count = parseInt(count) + 1;
        }

        localStorage.removeItem("settings_subscription");
        localStorage.removeItem("forecast");
        localStorage.setItem("received_alert", "alert.html?id=" + alert_details.id);

        $('span#unread').html(count);
    }

};
