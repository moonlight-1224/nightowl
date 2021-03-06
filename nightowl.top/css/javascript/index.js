function upload() {
    //手动提交表单
    var form = document.getElementsByTagName("form")[0];
    form.submit();
}

function newLocation(index) {
    window.location.href = index;
}