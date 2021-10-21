var c = document.getElementsByClassName("collapse");

for (let i = 0; i < c.length; i++) {

    c[i].addEventListener("click", function() {

        var content = this.nextElementSibling;
        if (content.style.maxHeight) content.style.maxHeight = null;
        else content.style.maxHeight = content.scrollHeight + "px";

    });

}
