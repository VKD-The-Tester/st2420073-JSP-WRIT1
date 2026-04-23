// Accessing the elements for later use.
const tableOfPlayers = document.getElementById("table-players");
const playerCount = document.querySelector(".header-player-count");

let counter = 1;
let playerLimit = 4;

const addPlayer = () => {
  if (counter === playerLimit) return;
  counter++;
  playerCount.textContent = counter;
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <th scope="row">${counter}</th>
  <td contenteditable="true"></td>
  <td class="add-hover"><i class="bi bi-person-plus-fill"></i></td>
  <td class="delete-hover"><i class="bi bi-person-x-fill"></i></td>
  `;
  tableOfPlayers.appendChild(newRow);
};

const removePlayer = (e) => {
  if (counter === 1) return;
  counter--;
  playerCount.textContent = counter;
  const targetedRow = e.target.closest("tr");
  if (!targetedRow) return;
  targetedRow.remove();
};

const reorderRows = () => {
  const playerNumberCell = document.querySelectorAll("tbody tr th");
  playerNumberCell.forEach((cell, i) => {
    if (cell) {
      cell.textContent = i + 1;
    }
  });
};

tableOfPlayers.addEventListener("click", (e) => {
  if (e.target.closest(".add-hover")) {
    addPlayer();
    reorderRows();
  }

  if (e.target.closest(".delete-hover")) {
    removePlayer(e);
    reorderRows();
  }
});
