chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
    var btn = document.querySelector('#btn');
    var db = document.querySelector('#db');
    var category = document.querySelector('#category');
    var user = document.querySelector('#user');

    // get browser local storage
    chrome.tabs.sendMessage(tabs[0].id, {action:'getStorage'}, function(resp){
        if(!resp) {
            return;
        }
        db.value = resp.db;
        category.value = resp.category;
        user.value = resp.user;
    }); 

    // send button click event handler
    btn.onclick = function () {
        var messageData = {
            action: 'clickSend',
            list: {
                db: db.value,
                category: category.value,
                user: user.value
            }
        };

        chrome.tabs.sendMessage(tabs[0].id, messageData); // chrome send message here
    }
});
