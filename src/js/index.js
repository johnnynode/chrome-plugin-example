chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
    var btn = document.querySelector('#btn');
    var db = document.querySelector('#db');
    var category = document.querySelector('#category');
    var user = document.querySelector('#user');

    // 获取浏览器本地存储
    chrome.tabs.sendMessage(tabs[0].id, {action:'getStorage'}, function(resp){
        db.value = resp.db;
        category.value = resp.category;
        user.value = resp.user;
    }); // 用于获取存储

    // 点击按钮的发送
    btn.onclick = function () {
        var messageData = {
            action: 'openx',
            list: {
                db: db.value,
                category: category.value,
                user: user.value
            }
        };

        chrome.tabs.sendMessage(tabs[0].id, messageData); // 用于调用ajax
    }
});
