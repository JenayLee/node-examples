function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        data: '',
        async: true,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(params) {

        },
        error: function(params) {

        }
    }

    var xhr = new XMLHttpRequest();
    Object.assign(defaults, options);
    var params = '';
    for (var key in defaults.data) {
        params += key + '=' + defaults.data[key] + '&'
    }
    if (defaults.type == 'get' && params) {
        params = params.substr(0, params.length - 1)
        defaults.url += '?' + params
    }
    xhr.open(defaults.type, defaults.url, defaults.async)
    var contentType = defaults.header['Content-Type']
    xhr.setRequestHeader('Content-Type', contentType)
    if (defaults.type == 'post') {
        if (contentType.includes('application/json')) {
            xhr.send(JSON.stringify(defaults.data))
        } else {
            xhr.send(params)
        }
    } else {
        xhr.send()
    }
    xhr.onload = function() {
        var res = JSON.parse(xhr.responseText)
        if (xhr.status == 200) {
            defaults.success(res)
        } else {
            defaults.error(res)
        }
    }
}