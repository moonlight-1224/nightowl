var orderNote = 1;
var currentText = "";
var submitCount = 0;
var IstooMuch = false;
var getSubmitTime = 0;

function getStyle(element, attr) {
    if (element.currentStyle) {
        return element.currentStyle[attr];
    } else {
        return getComputedStyle(element, false)[attr];
    }
}

function orderSelect(item) {
    if (orderNote == 10 || IstooMuch == true) return;
    var e = e || event;
    var orderElement = document.createElement("span");
    //插入相关的标签
    orderElement.setAttribute("class", "validate-order");
    orderElement.style.left = e.offsetX + "px";
    orderElement.style.top = e.offsetY + "px";
    orderElement.innerHTML = orderNote;
    orderElement.setAttribute("onclick", "resetOrder(this)");
    item.appendChild(orderElement);
    orderNote++;
    //取消冒泡处理
    event.stopPropagation();
}

function resetOrder(item) {
    var orderList = document.getElementsByClassName("validate-order");
    for (var i = orderList.length - 1; i >= item.innerHTML - 1; i--) {
        orderList[i].remove();
    }
    orderNote = item.innerHTML;
    event.stopPropagation();
}

function initValidate() {
    var fatherNode = document.getElementsByClassName("validate-zone")[0];
    var childList = fatherNode.childNodes;
    for (var i = childList.length - 1; i >= 0; i--) {
        fatherNode.removeChild(childList[i]);
    }
    orderNote = 1;
    var textList = ["凌空暗羽", "桂林山水", "杭州西湖", "万事如意", "牛气冲天", "平凡之路",
        "白月光", "朱砂痣", "古筝", "五谷丰登", "斗罗大陆", "床前明月光", "白日依山尽", "大漠孤烟直",
        "中国梦", "天人合一", "天道酬勤", "道法自然", "墨子号", "天眼"
    ];
    var textFontFamily = ['宋体', "楷体", "黑体", "微软雅黑", "仿宋"];
    var indexKey = Math.floor(textList.length * Math.random());
    currentText = textList[indexKey];
    document.getElementsByClassName("before-send-top")[0].getElementsByTagName("img")[0].setAttribute("src", "../images/validate/text-images/img" + (indexKey + 1) + ".png");
    document.getElementsByClassName("validate-zone")[0].style.backgroundImage = "url(" + "../images/validate/bk-images/img" + (Math.floor(textList.length * Math.random()) + 1) + ".jpg)";
    var itemArray = currentText.split("");
    var fontBox = document.getElementsByClassName("validate-zone")[0];
    var boxHeight = parseInt(getStyle(fontBox, "height"));
    var boxWidth = parseInt(getStyle(fontBox, "width"));
    for (var i = 0; i < itemArray.length; i++) {
        var setItemBox = document.createElement("div");
        var setItem = document.createElement("span");
        setItem.innerHTML = itemArray[i];
        //产生随机坐标和随机字体,颜色
        setItem.style.fontFamily = textFontFamily[Math.floor(Math.random() * textFontFamily.length)];
        setItem.style.transform = "rotateZ(" + Math.random() * 360 + "deg" + ")";
        //使用洗牌算法确定盒子的位置
        var setLeft = Math.random() * (boxWidth - 60) + 30;
        var setTop = Math.random() * (boxHeight - 60) + 30;
        var isValid = false;
        if (i > 0) {
            while (isValid == false) {
                for (var j = i - 1; j >= 0; j--) {
                    var nowLeft = parseInt(fontBox.children[j].style.left);
                    var nowTop = parseInt(fontBox.children[j].style.top);
                    if ((setLeft >= nowLeft - 30 && setLeft <= nowLeft + 30) && (setTop >= nowTop - 30 && setTop <= nowTop + 30)) {
                        setLeft = Math.random() * (boxWidth - 60) + 30;
                        setTop = Math.random() * (boxHeight - 60) + 30;
                        break;
                    } else {
                        isValid = true;
                    }
                }
            }
        }
        setItem.style.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        setItemBox.style.left = setLeft + "px";
        setItemBox.style.top = setTop + "px";
        setItemBox.setAttribute("class", "item-box");
        setItem.setAttribute("class", "item-text");
        setItemBox.setAttribute("onclick", "orderSelect(this)");
        setItemBox.appendChild(setItem);
        fontBox.appendChild(setItemBox);
    }
}

function selectToPhone() {
    var phoneBar = document.getElementsByClassName("select-phone")[0];
    if (phoneBar.classList.contains("btn-active") == false) {
        document.getElementsByClassName("select-box")[0].style.transform = "matrix(1,0,0,1,0,0)";
        phoneBar.setAttribute("class", "btn btn-active select-phone");
        phoneBar.nextElementSibling.setAttribute("class", "btn select-email");
        document.getElementsByClassName("validate-box")[0].getElementsByTagName("label")[0].innerHTML = "手机验证";
    }
}

function selectToEmial() {
    var emailBar = document.getElementsByClassName("select-email")[0];
    if (emailBar.classList.contains("btn-active") == false) {
        document.getElementsByClassName("select-box")[0].style.transform = "matrix3d(1,0,0,0,0,0,1,0,0,-1,0,0,0,0,0,1)";
        emailBar.setAttribute("class", "btn btn-active select-email");
        emailBar.previousElementSibling.setAttribute("class", "btn select-phone");
        document.getElementsByClassName("validate-box")[0].getElementsByTagName("label")[0].innerHTML = "邮箱验证";
    }
}

function getValidation() {
    document.getElementsByClassName("before-send")[0].style.display = "block";
    if (IstooMuch == false) initValidate();
}

function closeValidation() {
    document.getElementsByClassName("before-send")[0].style.display = "none";
}

function refreshValidation() {
    if (IstooMuch == false) initValidate();
}

function submitValidation() {
    var newDate = new Date();
    if (newDate.getTime() - getSubmitTime < 1500) return;
    if (IstooMuch == true) return;
    getSubmitTime = newDate.getTime();
    var testKey = true;
    var orderList = document.getElementsByClassName("validate-order");
    if (orderList.length == currentText.length) {
        for (var i = 0; i < orderList.length; i++) {
            var textContent = orderList[i].previousElementSibling.innerHTML;
            if (currentText.indexOf(textContent) != i) {
                testKey = false;
                break;
            }
        }
    } else {
        testKey = false;
    }
    if (testKey == true) {
        //验证成功
        var setResult = document.createElement("div");
        setResult.setAttribute("class", "validate-result-success");
        setResult.innerHTML = "验证成功";
        document.getElementsByClassName("validate-zone")[0].appendChild(setResult);
        document.getElementsByClassName("validate-result-success")[0].addEventListener("animationend", function() {
            document.getElementsByClassName("before-send")[0].style.display = "none";
            //进行页面之间的跳转
        })

    } else {
        var setResult = document.createElement("div");
        setResult.setAttribute("class", "validate-result-fail");
        setResult.innerHTML = "验证失败";
        document.getElementsByClassName("validate-zone")[0].appendChild(setResult);
        document.getElementsByClassName("validate-zone")[0].style.animation = "tremble .6s ease-in-out";
        document.getElementsByClassName("validate-zone")[0].addEventListener("animationend", function() {
            this.style.animation = "";
        })
        document.getElementsByClassName("validate-result-fail")[0].addEventListener("animationend", function() {
            if (IstooMuch == false) initValidate();
        })

    }
    submitCount++;
    if (submitCount == 5) {
        //每5次失败弹出提示框
        IstooMuch = true;
        var tooMuchIcon = document.createElement("div");
        tooMuchIcon.setAttribute("class", "tooMuch-icon");
        var tooMuchText = document.createElement("div");
        tooMuchText.setAttribute("class", "tooMuch-text");
        tooMuchText.innerHTML = "尝试过多";
        var tooMuchBtn = document.createElement("div");
        tooMuchBtn.innerHTML = "点击此处重试";
        tooMuchBtn.setAttribute("class", "tooMuch-btn");
        tooMuchBtn.addEventListener("click", function() {
            IstooMuch = false;
            submitCount = 0;
            event.stopPropagation();
            this.parentNode.remove();
        })
        var tooMuchBox = document.createElement("div");
        tooMuchBox.setAttribute("class", "validate-tooMuch");
        tooMuchBox.appendChild(tooMuchIcon);
        tooMuchBox.appendChild(tooMuchText);
        tooMuchBox.appendChild(tooMuchBtn);

        document.getElementsByClassName("validate-zone")[0].appendChild(tooMuchBox);
        return;
    }
}

function zoneClick() {
    if (orderNote == 10 || IstooMuch == true) return;
    var e = e || event;
    var orderElement = document.createElement("span");
    orderElement.setAttribute("class", "validate-order");
    orderElement.style.left = e.offsetX + "px";
    orderElement.style.top = e.offsetY + "px";
    orderElement.innerHTML = orderNote;
    orderElement.setAttribute("onclick", "resetOrder(this)");
    document.getElementsByClassName("validate-zone")[0].appendChild(orderElement);
    orderNote++;
}

function navigationTo(index) {
    window.location.href = index;
}