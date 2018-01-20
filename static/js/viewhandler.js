function show(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = "block";
}

function hide(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = "none";
}

function notLoginView() {
    show("login");
    hide("dashboard");
    hide("loader");
}

function LogedinView() {
    show("loader");
    hide("login");
    hide("dashboard");
}


function showDashboard() {
    show("dashboard");
    hide("loader");
    hide("login");
}

function handleView(status) {
    switch(status) {
    case Estatus.NOLOGIN:
        notLoginView();
        break;
    case Estatus.LOGIN:
        LogedinView();
        break;
    case Estatus.DATASET:
        showDashboard();
        break;
    default:
        notLoginView();
    }
}
