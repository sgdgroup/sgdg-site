function load(name) {
    let user = null;
    try {
        user = JSON.parse(read(`https://auth.dilanxd.com/sgdg/api?q=user&u=${name}`));
        console.log('test');
    } catch (e) {
        document.getElementById('noconnect').style.display = '';
        document.getElementById('noconnect').innerText = 'Unable to connect to the SGDG API. (AUTH-S100)';
        return;
    }

    if (user.error) {
        document.getElementById('noconnect').style.display = '';
        document.getElementById('noconnect').innerText = user.error;
        return;
    }



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
