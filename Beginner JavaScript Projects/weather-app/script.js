const input = document.querySelector('.location-input');
const searchBtn = document.querySelector('.search-button');

searchBtn.addEventListener('click', () => {
  getData(input.value, showData);
});

async function getData(location, callback) {
  const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${keyneeded}&contentType=json`);
  const result = await data.json();
  callback(result);
}

function showData(result) {
  const weatherStatsContainer = document.querySelector('.weather-stats-container');

  document.querySelector('.location').innerText = result.resolvedAddress;

  weatherStatsContainer.innerHTML = ``;

  weatherStatsContainer.innerHTML += `
    <div class="weather-stat">
      <span class="material-symbols-sharp">thermostat</span>
      <div>
        <p>Temperature</p>
        <p>${result.days[0].temp}</p>
      </div>
    </div>
  `;
  weatherStatsContainer.innerHTML += `
    <div class="weather-stat">
      <span class="material-symbols-sharp">wb_twilight</span>
      <div>
        <p>Time</p>
        <p>${result.days[0].icon}</p>
      </div>
    </div>
  `;
  weatherStatsContainer.innerHTML += `
    <div class="weather-stat">
      <span class="material-symbols-sharp">sunny</span>
      <div>
        <p>Condition</p>
        <p>${result.days[0].conditions}</p>
      </div>
    </div>
  `;
  weatherStatsContainer.innerHTML += `
    <div class="weather-stat">
      <span class="material-symbols-sharp">list</span>
      <div>
        <p>Description</p>
        <p>${result.description}</p>
      </div>
    </div>
  `;
}
