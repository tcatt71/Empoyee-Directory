const cards = document.querySelectorAll('.card');

fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(Response => Response.json())
  // .then(data => console.log(data))
  .then(data => populateCards(data));

function populateCards(data) {
  for (let i = 0; i < data.results.length; i++) {
    const employee = data.results[i];

    const picture = employee.picture.medium;
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    const email = employee.email;
    const city = employee.location.city;

    const cardHtml = `
      <img src="${picture}">
      <address>
        <p class="employee-name">${firstName} ${lastName}</p>
        <a href="mailto:${email}">${email}</a>
        <p>${city}</p>
      </address>
    `;
    cards[i].innerHTML = cardHtml;
  }
}

