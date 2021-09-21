var data = [];
var allSkills = null;

var checkboxProjects;
var checkboxPeople;
var checkboxEvents;

function prepare() {
    let info = null;
    try {
        info = read('https://auth.dilanxd.com/sgdg/api?q=all');
    } finally {
        if (!info) {
            document.getElementById('noconnect').style.display = '';
            return;
        }
    }

    let jsonData = JSON.parse(info);

    allSkills = jsonData.skills;

    let pr = jsonData.projects;

    checkboxProjects = document.getElementById('searchprojects');
    checkboxPeople = document.getElementById('searchpeople');
    checkboxEvents = document.getElementById('searchevents');

    for (let i = 0; i < pr.length; i++) {
        let item = pr[i];
        data.push(
            new ProjectItem(item.name, item.url, item.type, item.description)
        );
    }

    let pe = jsonData.people;

    for (let i = 0; i < pe.length; i++) {
        let item = pe[i];
        data.push(
            new PersonItem(item.name, item.url, item.role, item.description, item.skills)
        );
    }

}

window.onload = function() {

    var res = document.getElementById('searchresults');

    for (let i = 0; i < data.length; i++) {
        res.appendChild(data[i].element);
    }

    search();

}

function search() {

    var inputField = document.getElementById('searchbox');

    var showAny = false;

    var inp = null;

    if (inputField.value) {

        showAny = true;

        if (inputField.value.includes(',')) {

            inp = [];

            let x = inputField.value.split(',');
            for (let i = 0; i < x.length; i++) {
                inp[inp.length] = x[i].trim().toLowerCase();
            }

        } else {

            inp = [inputField.value.trim().toLowerCase()];

        }

    }

    for (let i = 0; i < data.length; i++) {

        let item = data[i];

        if (!showAny) {

            item.element.style.display = 'none';
            continue;

        }

        let name = item.name.toLowerCase();
        let type = item.type.toLowerCase();

        let desc = null;

        let skills = null;

        let done = false;

        if (item instanceof ProjectItem) {
            if (!checkboxProjects.checked) {
                item.element.style.display = 'none';
                done = true;
            }
            desc = item.description.toLowerCase();
        }
        if (item instanceof PersonItem) {
            if (!checkboxPeople.checked) {
                item.element.style.display = 'none';
                done = true;
            }
            skills = item.skills;
        }


        if (!done) {
            for (let y = 0; y < inp.length; y++) {
                let x = inp[y];

                if (name.includes(x) || type.includes(x) || x === 'all') {
                    item.element.style.display = '';
                    done = true;
                    break;
                }

                if (desc !== null && desc.includes(x)) {
                    item.element.style.display = '';
                    done = true;
                    break;
                }

                if (skills !== null) {
                    for (let s = 0; s < skills.length; s++) {
                        if (allSkills[skills[s]].text.toLowerCase().includes(x)) {
                            item.element.style.display = '';
                            done = true;
                            break;
                        }
                    }
                    if (done) {
                        break;
                    }
                }

            }
        }

        if (!done) item.element.style.display = 'none';


    }

    feather.replace();

}

class ProjectItem {

    constructor(name, url, type, description) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.description = description;

        var element = document.createElement('div');
        element.setAttribute('class', 'searchblock');

        var s1 = document.createElement('span');
        s1.setAttribute('class', 'notscream');
        s1.textContent = ' ' + type;
        var p1 = document.createElement('p');
        p1.setAttribute('class', 'sub');
        p1.textContent = 'PROJECT';
        p1.appendChild(s1);
        element.appendChild(p1);

        var a2 = document.createElement('a');
        a2.setAttribute('href', url);
        a2.textContent = name;
        var p2 = document.createElement('p');
        p2.setAttribute('class', 'main');
        p2.appendChild(a2);
        element.appendChild(p2);

        var p3 = document.createElement('p');
        p3.setAttribute('class', 'moresub');
        p3.textContent = description;
        element.appendChild(p3);
        this.element = element;

    }

}

class PersonItem {

    constructor(name, url, type, description, skills) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.description = description;
        this.skills = skills;

        let element = document.createElement('div');
        element.setAttribute('class', 'searchblock');

        let typeSpan = document.createElement('span');
        typeSpan.setAttribute('class', 'notscream');
        typeSpan.textContent = ' ' + type;
        let typeP = document.createElement('p');
        typeP.setAttribute('class', 'sub');
        typeP.textContent = 'PERSON';
        typeP.appendChild(typeSpan);
        element.appendChild(typeP);

        let nameLink = document.createElement('a');
        nameLink.setAttribute('href', url);
        nameLink.textContent = name;

        let nameP = document.createElement('p');
        nameP.setAttribute('class', 'main');
        nameP.appendChild(nameLink);
        element.appendChild(nameP);

        let skillsDiv = document.createElement('div');
        skillsDiv.className = 'skills';
        for (let i = 0; i < skills.length; i++) {

            let skillDiv = document.createElement('div');
            skillDiv.className = 'hover-wrap';
            let skillItem = allSkills[skills[i]];
            //let p = document.createElement('p');
            //p.setAttribute('class', 'subright');
            let ic = document.createElement('i');
            ic.className = 'skill-icon';
            ic.setAttribute('data-feather', skillItem.icon);
            ic.setAttribute('width', 24);
            ic.setAttribute('height', 24);
            skillDiv.appendChild(ic);

            let tooltip = document.createElement('div');
            tooltip.className = 'hover-content';
            let tooltipP = document.createElement('p');
            tooltipP.textContent = skillItem.text;
            tooltip.appendChild(tooltipP);
            skillDiv.appendChild(tooltip);
            skillsDiv.appendChild(skillDiv);
            //p.textContent = skillItem.text;
            //div.appendChild(p);
            //p2.appendChild(div);

        }
        element.appendChild(skillsDiv);

        let descP = document.createElement('p');
        descP.setAttribute('class', 'moresub');
        descP.textContent = description;
        element.appendChild(descP);

        this.element = element;

    }



}

function read(file) {

  var result = null;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open('GET', file, false);
  xmlhttp.send();

  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }

  return result;
}
