var resetElm = document.getElementsByClassName("reset");
for(var i = 0; i < resetElm.length; i++) {
    resetElm[i].addEventListener("click", function (e){
        var input = e.target.parentNode.parentNode.firstChild;
        if ("default" in input.dataset) {
            input.value = input.dataset.default
        }
    });
}