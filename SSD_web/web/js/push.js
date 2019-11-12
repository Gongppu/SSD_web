var temp;
chrome.alarms.create("alarm", {
        delayInMinutes: 3.0, periodInMinutes: 3.0

    });

    var doc_id;
var user_no;
chrome.alarms.onAlarm.addListener(function(alarm) {
    load();
});
function load(){
    chrome.storage.sync.get('temp', async function (items) {
        temp = items.temp;
        if (!chrome.runtime.error) {
        }
        if(temp==1)
            loadno();
    });
}
function loadno(){
    chrome.storage.sync.get('user_no', async function (items) {
        user_no = items.user_no;
        if (!chrome.runtime.error) {
        }
        if(user_no)
            load2();
    });
}
function load2() {
        var xhttp = new XMLHttpRequest();
        try {
            xhttp.open("GET", "https://sharesdocument.ml/push/" + user_no,false);
            xhttp.send(null);
            //alert(xhttp.readyState);
            //alert(xhttp.status);
            if(xhttp.readyState == 4 && xhttp.status == 201){
                var response = JSON.parse(xhttp.responseText);
                //alert(response.message);
                if(response.doc_title){
                    doc_id=response.doc_id;
                    notify(response.doc_title);
                }
            }
            //alert("hi");
        }catch (e) {
            alert(e.toString());
        }

}

function notify(title){
    var notifOptions={
        type: 'basic',
        iconUrl: 'images/logo.png',
        title: title,
        message: "공유문서가 수정되었습니다",
        buttons: [{
            title: "확인",

        }, {
            title: "닫기",

        }]
    }

    chrome.notifications.create("limitnoitif",notifOptions);
    chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {

    });
}
