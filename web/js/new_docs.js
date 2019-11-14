var user_id;
var doc_id;
var doc_img;
var todo_count = 0;
var toggle_count = 0;
var doc_title;
var temp;
var doc_body;
var emoji_array =[
    "1F600",
    "1F603",
    "1F601",
    "1F606",
    "1F609",
    "1F607",
    "1F970",
    "1F929",
    "1F61A",
    "1F61C",
    "1F911",
    "1F4A9",
    "1F47B",
    "1F63B",
    "1F63C",
    "1F496",
    "1F49F",
    "1F49C",
    "1F4A5",
    "1F4AF",
    "1F4AB",
    "1F4AC",
    "1F44B",
    "1F9AF",
    "1F918",
    "1F44D",
    "1F64F",
    "1F70D",
    "1F440",
    "1F647",
    "1F937",
    "1F468",
    "1F9D1",
    "1F468",
    "1F469",
    "1F9DC",
    "1F9DE",
    "1F483",
    "1F46F",
    "1F98A",
    "1F981",
    "1F984",
    "1F404",
    "1F42D",
    "1F430",
    "1F43C",
    "1F423",
    "1F989",
    "1F33C",
    "1F337",
    "1F34A",
    "1F352",
    "1F33D",
    "1F35E"
]

document.getElementById('docs_back_button').addEventListener('click', new_back, false);

window.onload = function () {

    document.getElementById("docs_contents_container").focus();
    $(function (){
        $("#ff").on("change", function () {
            insertNode('<font style="font-family: ' + $(this).val() + '">')
        });
        $("#fs").on("change", function (){
            insertNode('<font style="font-size: '+ $(this).val() + 'px">')
        });
    });

    chrome.storage.sync.get('user_id', async function (items) {
        user_id = items.user_id;
        if (!chrome.runtime.error) {
        }
        await new_emoji_choose();
    });
}

async function new_emoji_choose(){

    var emoji_num = emoji_array.length;
    var random = parseInt(Math.random() * emoji_num);
    doc_img = emoji_array[random];

    chrome.storage.sync.set({"doc_img": doc_img}, async function () {
        if (chrome.runtime.error) {
            console.log("Runtime error");
        }
        await new_emoji_show();
    });

}

async function new_emoji_show(){

    var addemoji = document.createElement('p');
    var emoji_hexa = String.fromCodePoint(parseInt(doc_img, 16));
    addemoji.innerHTML = emoji_hexa;
    //alert(emoji_hexa);
    //alert(addemoji.innerHTML);
    document.getElementById('docs_title_emoji').value = addemoji.innerHTML;

    await create();
}


async function create() {
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "https://sharesdocument.ml/doc/add/" + user_id,false);
        xhttp.send(null);
        if(xhttp.readyState == 4 && xhttp.status == 201){
            var response = JSON.parse(xhttp.responseText);
            doc_id = response.doc_id;
        }
    }catch (e) {
        alert(e.toString());
    }
}

async function new_back() {
    if(document.getElementById("docs_title").value.length === 0) {

        doc_title = "제목없음";
        doc_body =  document.getElementById("docs_contents_container").innerHTML;
    }else{

        doc_title = document.getElementById("docs_title").value;
        doc_body =  document.getElementById("docs_contents_container").innerHTML;
    }

    chrome.storage.sync.get('doc_content', async function (items) {
        doc_content = items.doc_content;
        if (!chrome.runtime.error) {
        }
        await new_save();
    });

}

async function new_save() {

    var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + doc_title + "&doc_body=" + doc_body + "&todo_count=" + todo_count + "&toggle_count=" + toggle_count + "&doc_img=" + doc_img); //doc_alarm 추가

        if(http.readyState === 4 && http.status === 201){

            var response = JSON.parse(http.responseText);

            chrome.storage.sync.get('temp', async function (items) {
                temp = items.temp;
                if (!chrome.runtime.error) {
                }
                await new_list();
            });
        }
    }catch (e) {
        alert(e.toString());
    }
}

async function new_list(){
    if(temp == 1){
        document.location.replace("list_login.html");
    }
    else{
        document.location.replace("list.html");
    }
}

var div_ = document.getElementById('docs_title');
div_.onkeyup = function () {
    var strValue = document.getElementById('docs_title').value;
    var strLen = strValue.length;
    var totalByte = 0;
    var len = 0;
    var oneChar = "";
    var str2 = "";
    var maxByte = 10;

    for (var i = 0; i < strLen; i++){
        oneChar = strValue.charAt(i);
        if(escape(oneChar).length > 10){
            totalByte += 2;
        } else{
            totalByte++;
        }

        if(totalByte <= maxByte){
            len = i + 1;
        }
    }

    if(totalByte > maxByte){
        alert(maxByte + "자를 초과 입력 할 수 없습니다.");
        str2 = strValue.substr(0, len);
        obj.value = str2;
    }
}
