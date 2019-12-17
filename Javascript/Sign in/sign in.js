window.addEventListener("load", () => {
    let UIController = (function() {
        //Private

        //Public
        return {
            getInputData: function() {
                return {
                    username: document.getElementById("username").value,
                    pin: document.getElementById("pin").value
                }
            },
            addError: function(element) {
                document.getElementById(element).style.borderBottomColor = "red";
            },
            removeError: function(element) {
                document.getElementById(element).style.borderBottomColor = "steelblue";
            }

        }
    })();
    let DataController = (function() {
        //Private

        //Public
        return {
            validateUserData: function(userdata) {

                if (userdata.username.includes(" ") || userdata.username.length < 8) {
                    return {
                        error: "username",
                        returnAnswer: false
                    };
                }
                if (userdata.pin.length != 4) {
                    return {
                        error: "pin",
                        returnAnswer: false
                    };
                }
                return {
                    error: "",
                    returnAnswer: true
                };
            }

        }
    })();
    let AppController = (function(UI, Data) {
        //Private
        function handler() {
            let userdata;
            userdata = UI.getInputData();
            if (Data.validateUserData(userdata).error == "pin") {
                UI.addError("pin")
            } else {
                UI.removeError("pin")
            }
            if (Data.validateUserData(userdata).error == "username") {
                UI.addError("username")
            } else {
                UI.removeError("username")
            }
            if (Data.validateUserData(userdata).returnAnswer) {
                window.location = "examination system.html"
            }

        }
        //Public
        return {
            init: function() {
                window.alert("The username is 8 characters or more\nThe ID is four numbers\nYou got 15 seconds to finish");
                document.getElementById("sign_in").addEventListener("click", handler);
            }

        }
    })(UIController, DataController);

    AppController.init();
})