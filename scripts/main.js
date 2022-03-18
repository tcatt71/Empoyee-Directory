const cards = document.querySelectorAll('.card');

fetch('https://randomuser.me/api/?results=12')
  .then(Response => Response.json())
  .then(data => populateCards(data));

function populateCards(data) {
  for (let i = 0; i < data.results.length; i++) {
    const cardHtml = `
      <img src="${data.results[i].picture.thumbnail}">
      <address>
        <p class="employee-name">${data.results[i].name.first} ${data.results[i].name.last}</p>
        <a href="mailto:${data.results[i].email}">${data.results[i].email}</a>
        <p>${data.results[i].location.city}</p>
      </address>
    `;
    cards[i].innerHTML = cardHtml;
  }
}

