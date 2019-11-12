var temp;

window.onload = function () {
    chrome.storage.sync.get('temp', async function (items) {
        temp = items.temp;
        if (!chrome.runtime.error) {
        }
        await loading();
    });
}

async function loading() {
    if(temp == 1){
        window.location.replace("list_login.html");
    }
    else{
        window.location.replace("list.html");
    }
}
