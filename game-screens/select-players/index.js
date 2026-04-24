// Accessing the elements for later use.
const tableOfPlayers = document.getElementById("table-players");
const playerCount = document.querySelector(".header-player-count");

let counter = 1;
const playerLimit = 4;

let globalCurrentPlayers = [];

const addPlayer = () => {
  if (counter === playerLimit) return;
  counter++;
  playerCount.textContent = counter;
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <th scope="row" class="player-number">${counter}</th>
  <td contenteditable="true" class="player-nickname"></td>
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

const getCurrentPlayersOnPage = () => {
  const currentRows = document.querySelectorAll("#table-players tr");

  const playerRelatedData = [];

  currentRows.forEach((currentRow) => {
    const numberCell = currentRow.querySelector(".player-number");
    const nicknameCell = currentRow.querySelector(".player-nickname");

    if (!numberCell || !nicknameCell) return;

    playerRelatedData.push({
      number: Number(numberCell.textContent.trim()),
      nickname: nicknameCell.textContent.trim(),
    });
  });

  return playerRelatedData;
};

const saveCurrentPlayersToStorage = (playerData) => {
  localStorage.setItem("players", JSON.stringify(playerData));
};

tableOfPlayers.addEventListener("click", (e) => {
  if (e.target.closest(".add-hover")) {
    addPlayer();
    reorderRows();
    saveCurrentPlayersToStorage(getCurrentPlayersOnPage());
  }

  if (e.target.closest(".delete-hover")) {
    removePlayer(e);
    reorderRows();
    saveCurrentPlayersToStorage(getCurrentPlayersOnPage());
  }
});

tableOfPlayers.addEventListener(
  "blue",
  (e) => {
    if (e.target.contains("player-nickname")) {
      saveCurrentPlayersToStorage(getCurrentPlayersOnPage());
    }
  },
  true,
);

const getPlayersFromStorage = () => {
  const retrievedPlayers = JSON.parse(localStorage.getItem("players"));
  if (!retrievedPlayers) return [];

  return retrievedPlayers;
};

const manageTableState = (playerData) => {
  const tableBody = document.getElementById("table-players");
  tableBody.innerHTML = "";

  playerData.forEach((player) => {
    const row = document.createElement("tr");

    row.innerHTML = `<th scope="row" class="player-number">${player.number}</th>
            <td contenteditable="true" class="player-nickname">${player.nickname}</td>
            <td class="add-hover"><i class="bi bi-person-plus-fill"></i></td>
            <td class="delete-hover"><i class="bi bi-person-x-fill"></i></td>`;

    tableBody.appendChild(row);
  });

  playerCount.textContent = playerData.length;
};

window.addEventListener("DOMContentLoaded", () => {
  const players = getPlayersFromStorage() || [];
  manageTableState(players);
});
