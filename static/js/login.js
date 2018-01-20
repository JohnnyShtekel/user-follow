
function onLoginSuccess(response) {
    var status = response["status"];
    if (status === "UserNotExist") {
        Materialize.toast('user not exist, please enter valid user name ', 4000)
    } else {
        var token = response["token"];
        setCookie("user",token,1);
        getUserData(token);
    }
}


function login() {
    var userName = document.getElementById("user_field").value;
    var type = "POST";
    var url = "login";
    var data = {'user': userName};
    setServerCall(type,url,data,onLoginSuccess);
}



window.onload = function GetLoginStatus() {
    var cookie =  getCookie("user");
    if(cookie === ""){
        handleView(Estatus.NOLOGIN);
    }
    else {
        handleView(Estatus.LOGIN);
        getUserData(cookie);
    }
};
