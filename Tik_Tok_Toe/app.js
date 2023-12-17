player = "X";

gamebord = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const mainfunc = (i, j) => {
  if (gamebord[i][j] === "") {
    gamebord[i][j] = player;
    document.getElementsByClassName("cell")[i * 3 + j].innerText = player;
    if (player === "X") {
      document.getElementsByClassName("cell")[i * 3 + j].style.color = "Blue";
    } else {
      document.getElementsByClassName("cell")[i * 3 + j].style.color = "Red";
    }
    if (ckeckwin()) {
      alert(`The player ${player} is win`);
      reset();
    } else if (checkDraw()) {
      alert("Game is draw");
      reset();
    } else {
      player = player === "X" ? "O" : "X";
    }
  } else {
    return;
  }
};

const ckeckwin = () => {
  for (let c = 0; c < 3; c++) {
    if (
      gamebord[c][0] === player &&
      gamebord[c][1] === player &&
      gamebord[c][2] === player
    ) {
      return true;
    }
  }
  for (let c = 0; c < 3; c++) {
    if (
      gamebord[0][c] === player &&
      gamebord[1][c] === player &&
      gamebord[2][c] === player
    ) {
      return true;
    }
  }
  if (
    gamebord[0][0] === player &&
    gamebord[1][1] === player &&
    gamebord[2][2] === player
  ) {
    return true;
  } else if (
    gamebord[0][2] === player &&
    gamebord[1][1] === player &&
    gamebord[2][0] === player
  ) {
    return true;
  } else {
    return false;
  }
};
function checkDraw() {
  for (let row of gamebord) {
    if (row.includes("")) {
      return false;
    }
  }
  return true;
}

const reset = () => {
  location.reload();
};
