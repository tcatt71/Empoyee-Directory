const gridContainer = document.querySelector('.grid-container');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');

fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(Response => Response.json())
  .then(data => populateCards(data));

function populateCards(data) {
  for (let i = 0; i < data.results.length; i++) {
    const employee = data.results[i];

    const picture = employee.picture.medium;
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    const email = employee.email;
    const city = employee.location.city;

    const card = document.createElement('div');
    card.className = 'card';

    const cardHtml = `
      <img src="${picture}">
      <address>
        <p class="employee-name">${firstName} ${lastName}</p>
        <a href="mailto:${email}">${email}</a>
        <p>${city}</p>
      </address>
    `;
    card.innerHTML = cardHtml;
    card.addEventListener('click', (e) => displayModal(data, e));
    gridContainer.appendChild(card);
  }
}

searchBox.addEventListener('keyup', () => {
  const cards = document.querySelectorAll('.card');
  const searchParam = searchBox.value.toLowerCase();

  cards.forEach(card => {
    const name = card.querySelector('.employee-name').textContent.toLowerCase();

    if (name.startsWith(searchParam)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});

function displayModal(data, e) {
  const cards = document.querySelectorAll('.card');
  const cardsArr = Array.from(cards);
  const employee = data.results[cardsArr.indexOf(e.currentTarget)];

  const employeePicture = employee.picture.medium;
  const firstName = employee.name.first;
  const lastName = employee.name.last;
  const email = employee.email;
  const city = employee.location.city;
  const phoneNumber = employee.phone.replace('-', ' ');
  const streetNumber = employee.location.street.number;
  const streetName = employee.location.street.name;
  const state = employee.location.state;
  const zipCode = employee.location.postcode;
  const birthday = new Date(employee.dob.date).toLocaleDateString();

  modalOverlay.style.display = 'flex';
  modal.innerHTML = `
    <div class="left-triangle">&ltri;</div>
    <div class="right-triangle">&rtri;</div>
    <div class="modal-upper-section">
      <div class="modal-close">&times;</div>
      <img src="${employeePicture}">
      <address>
        <p class="employee-name">${firstName} ${lastName}</p>
        <a href="mailto:${email}">${email}</a>
        <p>${city}</p>
      </address>
    </div>
    <div class="additional-info">
      <address>
        <a href="tel:${phoneNumber}">${phoneNumber}</a>
        <p>${streetNumber} ${streetName}, ${state} ${zipCode}<p>
        <p>Birthday: <time>${birthday}</time></p>
      </address>
    </div>
  `;

  const modalCloseBtn = modal.querySelector('.modal-close');

  modalCloseBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
}

modalOverlay.addEventListener('click', e => {
  if (!e.target.closest('.modal')) {
    modalOverlay.style.display = 'none';
  }
});