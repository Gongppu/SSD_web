document.getElementById('add_file').addEventListener('change', uploadFile, false);
document.getElementById('add_image').addEventListener('change', uploadImage, false);

var file_count = 0;
var image_count = 0;

function uploadFile() {

    $(function () {
        var file = document.getElementById('add_file');
        var formData = new FormData();
        formData.append("board_img", file.files[0]);

        var fileName = file.value;
        if (fileName == "") {
            alert("파일을 선택해주세요.")
            return false;
        }

        var fileTitle = fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.lastIndexOf("."));

        // 사이즈 체크
        var maxSize = 2 * 1024 * 1024 // 10MB
        var fileSize = file.files[0].size;

        var fileSize2 = (fileSize / 1024) / 1024;
        var fileSize_mb = fileSize2.toFixed(2);

        if (fileSize > maxSize) {
            alert("첨부하신 파일 사이즈는 " + fileSize_mb + "MB 입니다.\n첨부하실 파일 사이즈는 2MB 이내로 등록 가능합니다.");
            return false;
        }

        var fileEtx = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
        if (fileEtx != "pdf" && fileEtx != "doc" && fileEtx != "docx" && fileEtx != "hwp" && fileEtx != "txt") {
            alert("첨부할 수 있는 파일 형식은 pdf, doc, docx, hwp, txt 입니다.")

        }

        $.ajax({

            url: "https://sharesdocument.ml/doc/file",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,

            error: function () {

            },

            success: function (data) {

                var selection = window.getSelection();
                var range = selection.getRangeAt(0);

                var container = document.getElementById('docs_contents_container');
                var str = '<a href = "' + data.location +' " style="display: block; height: :100%; width: 100%"><div style=" display:flex; flex-direction:row; float: left; cursor: pointer;"><img src="images/attached.png" style="float: left; width: 15px; height: 15px; margin-right: 7px; cursor: pointer"><input id="file_name' + file_count + '" type="text" style="font-size: 12px; background-color:#f2f2f2; border:none; cursor: pointer; width: 310px; margin-right: 3px" value ="'+fileTitle + ' (' + fileSize_mb + 'MB)" readonly></div></a>'

                var _div = document.createElement("div");
                _div.setAttribute("class", "file_container")
                _div.setAttribute("id", "file" + file_count)
                _div.setAttribute("draggable", "true")
                _div.setAttribute("contenteditable", "false")
                _div.innerHTML = str;

                if (range.commonAncestorContainer.nodeName != 'SPAN') {
                    range.insertNode(_div);

                    var emptyDiv = document.createElement("div");
                    emptyDiv.innerHTML = '<br><br><br><br>'
                    container.appendChild(emptyDiv)

                    //setFileOpenListener(data.location, 0)

                    file_count++;
                }
            }
        });

    });
}

function setFileOpenListener(url, count){
    var file = document.getElementById('file'+ count);
    file.addEventListener('click', function(){
        window.open(url);
    })
}

function uploadImage() {
    $(function () {
        var file = document.getElementById('add_image');
        var formData = new FormData();
        formData.append("board_img", file.files[0]);

        var fileName = file.value;
        if (fileName == "") {
            alert("파일을 선택해주세요.")
            return false;
        }

        var fileTitle = fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.lastIndexOf("."));

        // 사이즈 체크
        var maxSize = 2 * 1024 * 1024 // 10MB
        var fileSize = file.files[0].size;

        var fileSize2 = (fileSize / 1024) / 1024;
        var fileSize_mb = fileSize2.toFixed(2);

        if (fileSize > maxSize) {
            alert("첨부하신 파일 사이즈는 " + fileSize_mb + "MB 입니다.\n첨부하실 파일 사이즈는 2MB 이내로 등록 가능합니다.");
            return false;
        }

        var fileEtx = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
        if (fileEtx != "png" && fileEtx != "jpg" && fileEtx != "jpeg") {
            alert("첨부할 수 있는 이미지 형식은 png, jpg, jpeg 입니다")

        }

        $.ajax({
            url: "https://sharesdocument.ml/doc/file",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,

            error: function () {

            },

            success: function (data) {

                //setImageUrl(image_count, input)

                var selection = window.getSelection();
                var range = selection.getRangeAt(0);

                var container = document.getElementById('docs_contents_container');

                var _div = document.createElement("img");
                _div.setAttribute("class", "image")
                _div.setAttribute("id", "imag" + file_count)
                _div.setAttribute("src", data.location);

                if (range.commonAncestorContainer.nodeName != 'SPAN') {
                    range.insertNode(_div);

                    var emptyDiv = document.createElement("div");
                    emptyDiv.innerHTML = '<br><br><br><br>'
                    container.appendChild(emptyDiv)

                    image_count++;

                }
            }
        });
    });
}

/*
function addImage(input) {
    var addFormDiv = document.getElementById("docs_contents_container");

    var str = '<img id="image'+ image_count +'"src=""/>';
    var addedDiv = document.createElement("div");
    addedDiv.setAttribute("id", "image");
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);

    uploadSubmit(false);


}*/

function setImageUrl(count, input){
    if (input.files && input.files[image_count]) {
        var reader = new FileReader();

        var size = prompt("사진의 크기를 입력해주세요");

        reader.onload = function(e) {
            var obj = document.getElementById('image' + count);
            obj.setAttribute('src', e.target.result);
            obj.setAttribute('width', size+'px');
            obj.setAttribute('height', size+'px');
        }
        reader.readAsDataURL(input.files[image_count]);
    }
}
