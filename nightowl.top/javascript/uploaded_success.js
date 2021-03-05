function breakLock(myStr) {
    var keyArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '_'
    ];
    var breakedStr = "";
    for (var i = 0; i < myStr.length; i++) {
        breakedStr += keyArray[keyArray.length - 1 - keyArray.indexOf(myStr[i])];
    }
    return breakedStr;
}

function getCookieValue(name) {
    var cookieData = document.cookie;
    var cookieArray = cookieData.split("; ");

    for (var i = 0; i < cookieArray.length; i++) {
        var coupleData = cookieArray[i].split("=");
        if (breakLock(coupleData[0]) == name) {
            return breakLock(coupleData[1]);
        }
    }
    return null;
}

function urlContentInit(name) {
    var list = document.getElementsByTagName("input");
    list[0].value = "https://nightowl.top/uploaded_images/" + name;
    list[1].value = "<a href=\"https://nightowl.top\"><img src=\"https://nightowl.top/uploaded_images/" + name + "\"" + "alt=\"" + name + "\"" + "/></a>";
    list[2].value = "<a href=\"https://nightowl.top\"><image src=\"https://nightowl.top/uploaded_images/" + name + "\"" + "alt=\"" + name + "\"" + "></image></a>";
    list[3].value = "[url=https://nightowl.top][img]https://nightowl.top/uploaded_images/" + name + "[/img][/url]";
    list[4].value = "[![" + name + "](https://nightowl.top/uploaded_images/" + name + ")]" + "(https://nightowl.top)";
}
//点击复制链接部分
function copyUrl(Obj) {
    var copyContent = Obj.previousSibling.previousSibling.firstChild;
    copyContent.select();
    document.execCommand("Copy");

}
window.onload = function() {
    var getString = location.search; //跨页面传值图片名称
    var image_name = breakLock(getString.substr(getString.indexOf('=') + 1));
    var myPhoto = document.getElementById("myImage");
    var photoWidth = 0;
    var photoHeight = 0;
    //预加载图片，获取图片的宽高
    var img = new Image();
    img.src = '../uploaded_images/' + image_name;
    myPhoto.src = img.src;
    //直接获取图片的原始宽高
    photoWidth = parseFloat(img.naturalWidth);
    photoHeight = parseFloat(img.naturalHeight);
    //下面设计以图片的宽高的最小值260px作为准线
    if (photoWidth / photoHeight > 2) myPhoto.style.height = parseInt(myPhoto.style.height) * 2 + "px"; //最大宽度520px
    myPhoto.style.width = myPhoto.style.height / photoHeight * photoWidth + "px";
    urlContentInit(image_name);
    console.log("输出图片的大小", "宽度：", myPhoto.style.width, "高度：", myPhoto.style.height);
}