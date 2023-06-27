function validateForm(event) {
  event.preventDefault();

  const usernameInput = document.querySelector('.username-input').value;
  const passwordInput = document.querySelector('.password-input').value;

  !usernameInput || !passwordInput ? alert('Both fields are required') : showPanel(usernameInput);
}

async function showPanel(username) {
  const IPAddress = await fetch(`http://ip-api.com/json/`);
  const IPData = await IPAddress.json();
  const getHelloWord = await fetch(`https://hellosalut.stefanbohacek.dev/?ip=${IPData.query}`);
  const helloData = await getHelloWord.json();
  
  const mainContainer = document.querySelector('.main-container');
  /* the API returns a unicode for certain languages hence why i've used these codes */
  const parser = await new DOMParser();
  const decodedMessage = await parser.parseFromString(`<!doctype html><body>${helloData.hello}`, 'text/html').body.textContent;

  mainContainer.innerHTML = ``;
  mainContainer.innerHTML = await `
    <h1 style="color:  #AEB0BF;">${decodedMessage} ${username} you have successfully logged in!</h1>

    <button class="logout-button btn">Log out</button>
  `;

  document.querySelector('.logout-button').addEventListener('click', () => {
    mainContainer.innerHTML = ``;
    mainContainer.innerHTML = `
      <h1 style="color: #AEB0BF;">
      Have a great day ${username}!
      </h1>

      <button class="reload-button btn" onclick="location.reload()">
      Sign in page
      </button>
    `;
  });
  
};



