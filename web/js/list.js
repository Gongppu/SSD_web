var list_count;
var list;
var temp = 0;
var user_no;
var doc_id;

function structlist(){
    var id;
    var title;;
    var share;
}

var user_no;
var user_id = "";
var isTrue;

window.onload = function () {
    chrome.storage.sync.get('user_id', async function (items) {
        user_id = items.user_id;

        if (!chrome.runtime.error) {
            if (user_id == null) {
                alert("문서를 생성해 슫을 이용해 보세요!");
            }
        }
        await load();
    });


}

function callcall(){

    chrome.storage.sync.set({"user_no": user_no}, function () {

        console.log("user_no"+user_no);
        if (chrome.runtime.error) {
            console.log("Runtime error");
        }
    });

}
document.getElementById('docs_create_button').addEventListener('click', create, false);
function create() {

    chrome.storage.sync.get('temp', async function (items) {
        temp = items.temp;

        if (!chrome.runtime.error) {
            await move_new();
        }
    });
}

async function move_new(){
    if(temp == 1){
        document.location.replace("new_docs_login.html");
    }
    else{
        document.location.replace("new_docs.html");
    }
}

async function load() {

    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "https://sharesdocument.ml/doc/list/" + user_id + "/" + doc_id, false);
        xhttp.send(null);

        if (xhttp.readyState == 4 && xhttp.status == 201) {
            var response = JSON.parse(xhttp.responseText);
            user_id = response.user_id;
            user_no = response.user_no;
            list_count = response.list.length;
            list = new Array(list_count);
            //isTrue = response.isTrue;

            for (var i = 0; i < list_count; i++) {
                list[i] = new structlist();

                list[i].doc_img = response.list[i].doc_img;
                list[i].id = response.list[i].doc_id;
                list[i].title = response.list[i].doc_title;
                list[i].share = response.list[i].doc_is_share;
            }
        }
    } catch (e) {
        alert(e.toString());
    }

    callcall();

    for (var i = 0; i < list_count; i++) {

        if (list[i].share == 0) {
            var container = document.getElementById("docs_list")

            //수정
            var str = '<div class="doc" style="height: 40px; padding-top: 4px; padding-bottom: 13px;"> <span class="doc_emoji" style="float: left; font-size: 30px; margin-left: 12px">&#x1F601;</span> <div class="doc_title">' + list[i].title + '</div> </div>'
            var _div = document.createElement('div');
            _div.setAttribute("id", list[i].id);
            _div.setAttribute("class", "docdoc");
            _div.innerHTML = str;

            _div.addEventListener('click', function(ev){
                doc_id = this.id;

                chrome.storage.sync.set({"doc_id": doc_id}, function () {
                    if (chrome.runtime.error) {
                        console.log("Runtime error");
                    }
                });

                chrome.storage.sync.get('temp', async function (items) {
                    temp = items.temp;
                    if (!chrome.runtime.error) {
                    }
                    await dfdf();
                });
            })
            container.appendChild(_div);
        } else {

            var container = document.getElementById("docs_list")

            var str = '<div class="doc" style="height: 40px; padding-top: 13px; padding-bottom: 13px;"> <span class="doc_emoji" style="float: left; font-size: 30px; margin-left: 16px">&#x1F601;</span> <div class="doc_title">' + list[i].title + '</div> <img src="images/shared_docs/shared_docs@3x.png" style="width: 16px; height: 16px; float: right; margin-right: 20px; margin-top: 10px;"> </div>'
            var _div = document.createElement('div');
            _div.setAttribute("id", list[i].id);
            _div.setAttribute("class", "docdoc");
            _div.innerHTML = str;
            _div.addEventListener('click', function(ev){
                doc_id = this.id;

                chrome.storage.sync.set({"doc_id": doc_id}, function () {
                    if (chrome.runtime.error) {
                        console.log("Runtime error");
                    }
                });

                chrome.storage.sync.get('temp', async function (items) {
                    temp = items.temp;
                    if (!chrome.runtime.error) {
                    }
                    await dfdf();
                });
            })

            container.appendChild(_div);

        }
    }
    chrome.storage.sync.set({"user_id": user_id}, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error");
        }
    });
}

async function dfdf() {
    if(temp == 1){
        document.location.replace("docs_login.html");
    }
    else{
        document.location.replace("docs.html");
    }
}
var tab_id=0;
var url='https://sharesdocument.ml/naver';
var tab_url;
var check=0;
function createtab(){
    var width=450;
    var height=400;
    var popupX = parseInt( (window.screen.width / 2) - (width / 2));
    var popupY= parseInt((window.screen.height  / 2) - (height / 2));

    chrome.windows.create({url:"https://sharesdocument.ml/naver/naverlogin", type:"popup",width:width, height:height,left:popupX,top:popupY},function(popup){
        tab_id=popup.tabs[0].id;
    });
}
chrome.tabs.onUpdated.addListener( function(tabId, info) {
    if(tabId==tab_id){
        chrome.tabs.get(tabId, function(tabs){
            if(!chrome.runtime.error || tabs){
                console.log(tabs.url);
                if(tabs.url.includes(url+"/temp/",0)){
                    tab_url=tabs.url;
                    chrome.tabs.remove(tabId);
                }
            }
        });
    }
});

var getuserno=-1;
function getno(){
    chrome.storage.sync.get("user_no",function (items) {
        console.log("here");
        if (!chrome.runtime.error) {
            getuserno=items.user_no;
            console.log("first "+getuserno)
            store();
        }
    });
}

function store(){
    var tempurl=url+"/temp/"
    if(!tab_url)
        return;
    var token=tab_url.substr(tempurl.length);
    console.log(token);
    console.log("userno"+getuserno);
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("POST", url+"/member",false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("email=" + token + "&user_no=" + getuserno); //doc_alarm 추가

        if(xhttp.readyState == 4 && xhttp.status == 201){
            var response = JSON.parse(xhttp.responseText);

            temp = 1;
            chrome.storage.sync.set({"temp": temp}, function () {
                if (chrome.runtime.error) {
                    console.log("Runtime error");
                }
            });


            document.location.replace("list_login.html");

        }
    }catch (e) {
        alert(e.toString());
    }
}
chrome.tabs.onRemoved.addListener(function(tabid){
    console.log("come in ");
    if(tabid==tab_id)
        getno();
});


document.getElementById("login_button").onclick=function() {
    createtab();
}


