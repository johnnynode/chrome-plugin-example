chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "clickSend") {
            var postData = getInputsGui(document, request.list); // 获取数据
            handlePostAjax(postData, request.list, 'http://127.0.0.1:3000/');
        }

        if (request.action === "getStorage") {
            var chromePluginStore = localStorage.chromePlugin;
            sendResponse(chromePluginStore ? JSON.parse(chromePluginStore) : null);
        }
    });

// 从input选中的获取gui
function getInputsGui(d, messageData) {
    var inputs = d.querySelectorAll('input[type="checkbox"]');
    var inputsArray = []; // input 数组集合
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

// 处理Post方法
function handlePostAjax(postData, list, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url); // 发起请求
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 设置请求头
    xhr.send(JSON.stringify(postData)); // 发送到服务器

    xhr.onreadystatechange = function() {
        if ((xhr.readyState === 4) && (xhr.status === 200)) {
            localStorage.chromePlugin = JSON.stringify(list); // 用于本地存储的数据
            alert('发送完成!');
        } else if ((xhr.readyState === 4) && (xhr.status !== 200)) {
            alert('fail');
        }
    }
}
