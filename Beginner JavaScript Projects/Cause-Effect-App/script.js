const container = document.getElementById('container');
const leftSection = document.getElementById('left-section');
const rightSection = document.getElementById('right-section');

const people = [
  {name: 'Mobin', street: '1', city: 'test1', state: 'test_state', country: 'test', telephone: '0999999999', birthday: '2000/1/1'},
  {name: 'John', street: '211', city: 'test2', state: 'test_state2', country: 'USA', telephone: '1231123213', birthday: '2000/1/2'},
  {name: 'David', street: '123', city: 'test3', state: 'test_state3', country: 'USA', telephone: '3265655', birthday: '2000/1/3'},
  {name: 'Sara', street: '897', city: 'test4', state: 'test_state4', country: 'USA', telephone: '6566', birthday: '2000/1/4'},
]


function showLeftSection() {
  leftSection.innerHTML = '';
  
  const ulElement = document.createElement('ul');
  
  people.forEach(value => {
    const liElement = document.createElement('li');

    liElement.classList.add('name');

    liElement.innerText = `${value.name}`;

    ulElement.appendChild(liElement);

    
  });
  
  leftSection.appendChild(ulElement);

  document.querySelectorAll('.name').forEach((name, index) => {
    name.addEventListener('click', () => {
      showRightSection(index);
    })
    
    /*
    name.addEventListener('mouseover', () => {
      showRightSection(index);
    })
    */
  });
  
}

showLeftSection();


function showRightSection(i) {
  rightSection.innerHTML = '';

  const ulElement = document.createElement('ul');

  ulElement.innerHTML = `
    <li>${people[i].name}</li>
    <li>${people[i].street}</li>
    <li>${people[i].city}</li>
    <li>${people[i].state}</li>
    <li>${people[i].country}</li>
    <li>${people[i].telephone}</li>
    <li>${people[i].birthday}</li>
  `;

  ulElement.querySelector('li:first-child').style.backgroundColor = 'red';

  rightSection.appendChild(ulElement);
}