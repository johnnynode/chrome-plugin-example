chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "clickSend") {
            var postData = getInputsGui(document, request.list); // get data
            handlePostAjax(postData, request.list, 'http://127.0.0.1:3000/');
        }

        if (request.action === "getStorage") {
            var chromePluginStore = localStorage.chromePlugin;
            sendResponse(chromePluginStore ? JSON.parse(chromePluginStore) : null);
        }
    });

// get guis from chosen inputs
function getInputsGui(d, messageData) {
    var inputs = d.querySelectorAll('input[type="checkbox"]');
    var inputsArray = []; // input array list
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            inputsArray.push(inputs[i].getAttribute('gui'));
        }
    }
    var postData = [];
    for (var i = 0; i < inputsArray.length; i++) {
        var item = {};
        item.Gui = inputsArray[i] || 'test';
        item.Db = messageData.db || 'test';
        item.Category = messageData.category || 'test';
        item.User = messageData.user || 'test';
        postData.push(item);
    }
    return postData;
}

// handle post method
function handlePostAjax(postData, list, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url); // send an request
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // set request header
    xhr.send(JSON.stringify(postData)); // send to server

    xhr.onreadystatechange = function() {
        if ((xhr.readyState === 4) && (xhr.status === 200)) {
            localStorage.chromePlugin = JSON.stringify(list); // for local storage
            alert('send success!');
        } else if ((xhr.readyState === 4) && (xhr.status !== 200)) {
            alert('fail');
        }
    }
}
