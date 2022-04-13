const gridContainer = document.querySelector('.js-grid-container');
const modalOverlay = document.querySelector('.js-modal-overlay');
const modal = document.querySelector('.js-modal');
const searchBox = document.querySelector('.js-search-box');
let employee = null;
let index = 0;

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
    card.classList.add('card', 'js-card');

    const cardHtml = `
      <img src="${picture}">
      <address>
        <p class="employee-name js-employee-name">${firstName} ${lastName}</p>
        <a href="mailto:${email}">${email}</a>
        <p>${city}</p>
      </address>
    `;
    card.innerHTML = cardHtml;
    card.addEventListener('click', e => displayModal(data, e));
    gridContainer.appendChild(card);
  }
}

searchBox.addEventListener('keyup', () => {
  const cards = document.querySelectorAll('.js-card');
  const searchParam = searchBox.value.toLowerCase();

  cards.forEach(card => {
    const name = card.querySelector('.js-employee-name').textContent.toLowerCase();

    if (name.includes(searchParam)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});

function navigateEmployees(data, event) {
  const cards = document.querySelectorAll('.js-card');
  const cardsArr = Array.from(cards);
  const leftTriangle = document.querySelector('.js-left-triangle');

  if (event.target === leftTriangle) {
    if (index === 0) {
      index = cardsArr.length - 1;
      return data.results[index];
    } else {
      --index;
      return data.results[index];
    }
  } else {
    if (index === cardsArr.length - 1) {
      index = 0;
      return data.results[index];
    } else {
      ++index;
      return data.results[index];
    }
  }
}

function displayModal(data, event) {
  const cards = document.querySelectorAll('.js-card');
  const cardsArr = Array.from(cards);

  if (event.currentTarget.classList.contains('js-card')) {
    index = cardsArr.indexOf(event.currentTarget);
    employee = data.results[index];
  } else {
    employee = navigateEmployees(data, event);
  }

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

  modal.innerHTML = `
    <div class="left-triangle js-left-triangle">&ltri;</div>
    <div class="right-triangle js-right-triangle">&rtri;</div>
    <div class="modal-upper-section">
      <div class="modal-close js-modal-close">&times;</div>
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

  const modalCloseBtn = modal.querySelector('.js-modal-close');
  const leftTriangle = document.querySelector('.js-left-triangle');
  const rightTriangle = document.querySelector('.js-right-triangle');

  modalCloseBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
  leftTriangle.addEventListener('click', e => displayModal(data, e));
  rightTriangle.addEventListener('click', e => displayModal(data, e));

  modalOverlay.style.display = 'flex';
}

modalOverlay.addEventListener('click', e => {
  if (e.target.classList.contains('js-left-triangle') || e.target.classList.contains('js-right-triangle')) {
    modalOverlay.style.display = 'flex';
  } else if (!e.target.closest('.js-modal')) {
    modalOverlay.style.display = 'none';
  }
});
