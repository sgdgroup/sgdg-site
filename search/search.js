var data = {};

var all = [];

function prepare() {

    var list = read("registry.txt").split("\n");
    
    
    for (var i = 0; i < list.length; i++) {
    
        var profile = read("/" + list[i] + "/profile.txt").split("\n");
        
        if (!(profile[0] in data)) data[profile[0]] = [];
        
        var item = new SearchItem(profile[0], profile[1], profile[2], profile[3]);
        
        data[profile[0]].push(item);
        all.push(item);
        
    }
    

}

window.onload = function() {
    
    var res = document.getElementById("searchresults");
    
    var projs = data["Project"];
    
    for (var i = 0; i < projs.length; i++) {
    
        var el = element(projs[i]);
        
        res.appendChild(el);        
//         if (i < projs.length - 1) {
//             var line = document.createElement("hr");
//             line.setAttribute("class", "searchline");
//             res.appendChild(line);
//         }
    
    }
    
    // var largeline = document.createElement("hr");
//     largeline.setAttribute("class", "largesearchline");
//     res.appendChild(largeline);
    
    var pers = data["Person"];
    
    for (var i = 0; i < pers.length; i++) {
    
        var el = element(pers[i]);
        
        res.appendChild(el);        
        
//         if (i < pers.length - 1) {
//             var line = document.createElement("hr");
//             line.setAttribute("class", "searchline");
//             res.appendChild(line);
//         }
    }
    
    search();

}

function element(item) {

    var newEl = document.createElement("div");
    newEl.setAttribute("class", "searchblock");
    
    var s1 = document.createElement("span");
    s1.setAttribute("class", "notscream");
    s1.textContent = " " + item.desc;
    var p1 = document.createElement("p");
    p1.setAttribute("class", "sub");
    p1.textContent = item.type.toUpperCase();
    p1.appendChild(s1);
    newEl.appendChild(p1);
        
    var p2 = document.createElement("p");
    p2.setAttribute("class", "main");
    p2.textContent = item.name;
    newEl.appendChild(p2);
        
    var p3 = document.createElement("p");
    p3.setAttribute("class", "moresub");
    p3.textContent = item.keywords;
    newEl.appendChild(p3);
        
    item.element = newEl;
        
    return newEl;

}

function search() {

    var input = document.getElementById("searchbox");
    
    var cont = false;
    
    var inp = null;
    
    if (input.value) {
    
        cont = true;
        
        if (input.value.includes(",")) {
        
            inp = [];
            
            var x = input.value.split(",");
            
            for (var i = 0; i < x.length; i++) {
            
                inp[inp.length] = x[i].trim().toLowerCase();
            
            }
        
        } else {
        
            inp = [input.value.toLowerCase()];
        
        }
        
    }
    

    for (var i = 0; i < all.length; i++) {
    
        var item = all[i];
        
        if (!cont) {
        
            item.element.style.display = "none";
            continue;
        
        }
        
        var name = item.name.toLowerCase();
        
        var desc = item.desc.toLowerCase();
        
        var keys = null;
        
        if (item.type !== "Project")
        
            keys = item.keywords.toLowerCase();
        
        var done = false;
        
        for (var y = 0; y < inp.length; y++) {
        
            var x = inp[y];
            
            if (name.includes(x) || desc.includes(x) || (keys && keys.includes(x))) {
        
                item.element.style.display = "";
                done = true;
                break;
            }
        
        }
        
        if (!done) item.element.style.display = "none";
    
    }

}

function read(file) {

  var result = null;
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.open("GET", file, false);
  xmlhttp.send();
  
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  
  return result;
}

class SearchItem {

    constructor(type, name, desc, keywords) {
    
        this.type = type;
        this.name = name;
        this.desc = desc;
        this.keywords = keywords;
        this.element = null;
    
    }
    
    

}