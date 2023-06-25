// https://www.githubstatus.com/api/v2/summary.json

const getStatusButton = document.querySelector('.get-status');

getStatusButton.addEventListener('click', () => {
	getData(showStatus)
});

async function getData(callback) {
  const data = await fetch(`https://www.githubstatus.com/api/v2/summary.json`);
  const result = await data.json();
  callback(result);
}

function showStatus(result) {	
	const statusElementsWrapper = document.querySelector('.status-elements-wrapper');

	statusElementsWrapper.innerHTML = ``;

  result.components.forEach(component => {
		statusElementsWrapper.innerHTML += `
			<div class="status">
				<div>
					<span class="material-symbols-sharp">query_stats</span>
					<p>${component.name}</p>
				</div>
				<div class="operational-wrapper ${component.status == `operational` ? 'operating' : ''} ${component.status == `partial_outage` ? 'partial_outage' : ''} ${component.status == `major_outage` ? 'major_outage' : ''}">
					<p>${component.status}</p>
					<span class="material-symbols-sharp">${component.status == `operational` ? 'done' : 'info'}</span>
				</div>
				<div>
					<p>Updated at: ${new Date(component.updated_at).toLocaleString()}</p>
				</div>
			</div>
		`;
	})
}

