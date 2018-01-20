function setServerCall(type, url, data, onSuccessFunction) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        success: function(response) {
            onSuccessFunction(response)
        }
    });
}