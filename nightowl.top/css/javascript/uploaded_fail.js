document.getElementsByClassName("feedback")[0].addEventListener("animationend", function() {
    document.getElementsByTagName("button")[0].style.display = "block";
})

function navigationTo(index) {
    window.location.href = index;
}