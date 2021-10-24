
var listingsDiv = document.getElementById('listing');

function loadListing(file) {

    let data = JSON.parse(read(file));

    let colors = data['colors'];

    let listing = data.listing;

    let last = null;

    for (let i = 0; i < listing.length; i++) {

        let curr = listing[i];
        if (curr.repeat && curr.repeat == "last") {
            if (last == null) {
                console.log(`Can't repeat last listing if there hasn't been one yet.`);
                return;
            }
            curr = last;
        } else {
            last = curr;
        }

        let lDiv = document.createElement('div');
        lDiv.id = `listing-div-${i}`;
        lDiv.className = 'listing-item';


        let lButton = document.createElement('button');
        lButton.id = `listing-button-${i}`;
        lButton.className = 'main-button';
        lButton.style.backgroundColor = colors[curr.color];

        lButton.addEventListener('click', () => {

            var button = document.getElementById(`listing-button-${i}`);
            var next = document.getElementById(`listing-desc-${i}`);
            if (next.style.maxHeight) {
                next.style.maxHeight = null;
            }
            else {
                next.style.maxHeight = next.scrollHeight + 'px';
            }
            button.classList.toggle('active');
        })

        let lButton_name = document.createElement('p');
        lButton_name.className = 'name';
        lButton_name.innerText = curr.name;
        lButton.appendChild(lButton_name);

        let lButton_sub = document.createElement('p');
        lButton_sub.className = 'sub';
        lButton_sub.innerText = curr.sub;
        lButton.appendChild(lButton_sub);

        lDiv.appendChild(lButton);

        let lLink = document.createElement('a');
        lLink.className = 'link-button ' + (curr.button.enabled ? '' : 'disabled');
        lLink.innerText = curr.button.text;
        if (curr.button.enabled) {
            lLink.href = curr.button.link;
            lLink.target = '_blank';
        }
        lDiv.appendChild(lLink);

        let lInner = document.createElement('div');
        lInner.id = `listing-desc-${i}`
        lInner.className = 'inner';

        let lInner_text = document.createElement('p');
        lInner_text.className = 'text';
        let lInner_text_html = '';
        let desc = curr.desc;
        for (let i = 0; i < desc.length; i++) {
            lInner_text_html += desc[i] + '<br>';
        }
        lInner_text.innerHTML = lInner_text_html;
        lInner.appendChild(lInner_text);

        let lInner_sub = document.createElement('p');
        lInner_sub.className = 'sub';
        lInner_sub.innerText = curr.desc_sub;
        lInner_sub.style.color = colors[curr.color];
        lInner.appendChild(lInner_sub);

        lDiv.appendChild(lInner);

        listingsDiv.appendChild(lDiv);

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