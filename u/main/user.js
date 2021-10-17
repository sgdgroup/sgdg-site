var user = null;
var allSkills = null;
var allLinks = null;
var allExtra = null;

var userDiv = document.getElementById('user');

function load(username) {
    let sk = null;
    try {
        user = JSON.parse(read(`https://portal.sgdgroup.org/api/user?name=${username}`));
        sk = JSON.parse(read('https://portal.sgdgroup.org/api/skills'));
    } catch (e) {
        document.getElementById('noconnect').style.display = '';
        document.getElementById('noconnect').innerText = 'Unable to connect to the SGDG API. (WG100)';
        return;
    }

    allSkills = sk.skills;
    allLinks = sk.links;
    allExtra = sk.extra;

    if (user.error) {
        document.getElementById('noconnect').style.display = '';
        document.getElementById('noconnect').innerText = user.error;
        return;
    }
    name();
    about();
    skills();
    links();
    extra();

}

function name() {
    let div = document.createElement('div');
    div.className = 'name-div';

    let avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.setAttribute('src', `https://www.gravatar.com/avatar/` + user.gravatar_hash + '?s=150&d=mp');
    div.appendChild(avatar);

    let name = document.createElement('p');
    name.className = 'name';
    name.innerText = user.name;
    div.appendChild(name);

    let role = document.createElement('p');
    role.className = 'role';
    role.innerText = user.role;
    div.appendChild(role);

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


    let linkSection = user.links;
    let links = Object.keys(linkSection);


    for (let i = 0; i < links.length; i++) {

        let linkKey = links[i];
        let linkValue = linkSection[linkKey];
        let linkStatic = allLinks[linkKey];

        let anchor = document.createElement('a');
        anchor.className = 'card-link';
        if (linkStatic.url) {
            anchor.setAttribute('href', linkStatic.url.replaceAll('%VALUE%', linkValue));
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
        value.innerText = linkValue;
        link.appendChild(value);

        anchor.appendChild(link);
        linkList.appendChild(anchor);
    }

    div.appendChild(linkList);

    userDiv.appendChild(div);

}

function extra() {

    let div = document.createElement('div');
    div.className = 'extra';

    let title = document.createElement('p');
    title.className = 'title';
    title.innerText = 'More Information';
    div.appendChild(title);

    let extraSection = user.extra;
    let extra = Object.keys(extraSection);

    let extraList = document.createElement('div');
    for (let i = 0; i < extra.length; i++) {

        let extraKey = extra[i];
        let extraValue = extraSection[extraKey];
        let extraDisplay = allExtra[extraKey].title;

        let text = document.createElement('p');
        text.className = 'extra-text';
        text.innerHTML = `<span style="font-weight: bold;">${extraDisplay}: </span>${extraValue}`;
        div.appendChild(text);
    }

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
