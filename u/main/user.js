var user = null;
var allSkills = null;
var allLinks = null;

var userDiv = document.getElementById('user');

function load(username) {
    let sk = null;
    try {
        user = JSON.parse(read(`https://auth.dilanxd.com/sgdg/api?q=user&u=${username}`));
        sk = JSON.parse(read('https://auth.dilanxd.com/sgdg/api?q=skills'));
    } catch (e) {
        document.getElementById('noconnect').style.display = '';
        document.getElementById('noconnect').innerText = 'Unable to connect to the SGDG API. (AUTH-S100)';
        return;
    }

    allSkills = sk.skills;
    allLinks = sk.links;

    if (user.error) {
        document.getElementById('noconnect').style.display = '';
        document.getElementById('noconnect').innerText = user.error;
        return;
    }
    name();
    about();
    skills();
    links();

}

function name() {
    let div = document.createElement('div');
    div.className = 'name-div';

    let avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.setAttribute('src', `https://www.gravatar.com/avatar/` + user.gravatar_hash + '?s=100&d=mp');
    div.appendChild(avatar);

    let name = document.createElement('p');
    name.className = 'name';
    name.innerText = user.name;
    div.appendChild(name);

    // let skills = document.createElement('div');
    // skills.className = 'skills';
    //
    // let sk = user.skills;
    // for (let i = 0; i < sk.length; i++) {
    //
    //     let skill = document.createElement('div');
    //     skill.className = 'hover-wrap';
    //     let skillItem = allSkills[sk[i]];
    //     let ic = document.createElement('i');
    //     ic.className = 'skill-icon';
    //     ic.setAttribute('data-feather', skillItem.icon);
    //     ic.setAttribute('width', 24);
    //     ic.setAttribute('height', 24);
    //     skill.appendChild(ic);
    //
    //     let tooltip = document.createElement('div');
    //     tooltip.className = 'hover-content';
    //     let tooltipP = document.createElement('p');
    //     tooltipP.textContent = skillItem.text;
    //     tooltip.appendChild(tooltipP);
    //     skill.appendChild(tooltip);
    //     skills.appendChild(skill);
    //
    // }
    // div.appendChild(skills);

    userDiv.appendChild(div);

}

function about() {

    let div = document.createElement('div');
    div.className = 'about';

    let title = document.createElement('p');
    title.className = 'title';
    title.innerText = 'About';
    div.appendChild(title);

    let text = document.createElement('p');
    text.className = 'about-text';
    text.innerText = user.description;
    div.appendChild(text);

    userDiv.appendChild(div);
}

function skills() {

    let div = document.createElement('div');
    div.className = 'skills';

    let title = document.createElement('p');
    title.className = 'title';
    title.innerText = 'Skills and Interests';
    div.appendChild(title);

    let skillList = document.createElement('div');
    skillList.className = 'cards';


    let skills = user.skills;
    for (let i = 0; i < skills.length; i++) {
        let skill = document.createElement('div');
        skill.className = 'card';

        let skillItem = allSkills[skills[i]];
        let icon = document.createElement('i');
        icon.className = 'card-icon';
        icon.setAttribute('data-feather', skillItem.icon);
        icon.setAttribute('width', '32');
        icon.setAttribute('height', '32');
        skill.appendChild(icon);

        let text = document.createElement('p');
        text.className = 'card-text';
        text.innerText = skillItem.text;
        skill.appendChild(text);

        skillList.appendChild(skill);
    }

    div.appendChild(skillList);

    userDiv.appendChild(div);

}

function links() {

    let div = document.createElement('div');
    div.className = 'links';

    let title = document.createElement('p');
    title.className = 'title';
    title.innerText = 'Web Presence';
    div.appendChild(title);

    let linkList = document.createElement('div');
    linkList.className = 'long-cards linked';


    let links = user.links;
    for (let i = 0; i < links.length; i++) {

        let linkItem = links[i];
        let linkStatic = allLinks[linkItem.type];

        let anchor = document.createElement('a');
        anchor.className = 'card-link';
        if (linkStatic.url) {
            anchor.setAttribute('href', linkStatic.url.replaceAll('%VALUE%', linkItem.value));
        }

        let link = document.createElement('div');
        link.className = 'long-card linked';

        let icon = document.createElement('i');
        icon.className = linkStatic.icon;
        link.appendChild(icon);

        let text = document.createElement('p');
        text.className = 'card-text';
        text.innerText = linkStatic.text;
        link.appendChild(text);

        let value = document.createElement('p');
        value.className = 'card-value';
        value.innerText = linkItem.value;
        link.appendChild(value);

        anchor.appendChild(link);
        linkList.appendChild(anchor);
    }

    div.appendChild(linkList);

    userDiv.appendChild(div);

}

function text(id, text) {
    document.getElementById(id).innerText = text;
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
