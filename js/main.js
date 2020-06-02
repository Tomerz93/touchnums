"use strict";

var gGameBoard = [];
var gItemAmount = 2;
var numbertoPress = 1;
var numberPointer = document.querySelector("h1");
var container = document.querySelector(".main-content");
var timer = document.querySelector(".timer");
var victoryText = document.querySelector(".vicory-header");
var timerInterval;
// var timerInterval = setInterval(startTimer, 100);

var buttonInterval;
var appRunTime = new Date();

function resetData() {
  // currentTime = new Date();
  appRunTime = new Date();
  // timerInterval = setInterval(startTimer, 100);
  victoryText.style.display = "none";
  victoryText.innerText = "";
  gGameBoard = [];
  numbertoPress = 1;
  numberPointer.innerText = "The next number is : " + numbertoPress;
}

// function initGame(itemAmount) {
//   resetData();
//   startTimer();
//   clearInterval(buttonInterval);
//   createGameBoard(itemAmount);
//   shuffle();
//   renderTable();
// }

function initGame(itemAmount) {
  var currentTime = new Date();
  timerInterval = setInterval(() => {
    var newDate = new Date();
    timer.innerText =
      "Time Passed : " + Math.floor(newDate - currentTime) / 1000 + " seconds";
  }, 100);
  resetData();
  clearInterval(buttonInterval);
  createGameBoard(itemAmount);
  shuffle();
  renderTable();
}
function createGameBoard(boardLength) {
  for (let index = 1; index <= boardLength; index++) {
    gGameBoard.push(index);
  }
}
function setDifficulty(difficulity) {
  gItemAmount = difficulity;
  if (difficulity === 16) {
    container.style.width = "400px";
  }
  if (difficulity === 24) {
    container.style.width = "800px";
  }
  if (difficulity === 35) {
    console.log(container.style.width);
    container.style.width = "1200px";
  }
  clearInterval(timerInterval);
  initGame(gItemAmount);
}
function shuffle() {
  var currentIndex = gGameBoard.length;
  var temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = gGameBoard[currentIndex];
    gGameBoard[currentIndex] = gGameBoard[randomIndex];
    gGameBoard[randomIndex] = temporaryValue;
  }
}
function renderTable() {
  var strHtml = "";
  for (let index = 0; index < gGameBoard.length; index++) {
    strHtml += `<div class='box' data-value=${gGameBoard[index]} onclick="cellClicked(this)">${gGameBoard[index]}</div>`;
  }
  container.innerHTML = strHtml;
}
function cellClicked(elBtn) {
  var value = parseInt(elBtn.dataset.value);
  if (value === numbertoPress) {
    elBtn.classList.add("pressed");
    numbertoPress++;
    numberPointer.innerText = "The next number is : " + numbertoPress;
    checkForVictory();
  } else {
    elBtn.classList.toggle("wrong");
    setTimeout(() => {
      elBtn.classList.toggle("wrong");
    }, 500);
  }
}
function checkForVictory() {
  if (numbertoPress === gItemAmount + 1) {
    numberPointer.innerText = `You did it!`;
    clearInterval(timerInterval);
    markVicotry();
    buttonVictory();
    createVictoryChar();
  }
}
function markVicotry() {
  for (let index = 0; index < container.children.length; index++) {
    setTimeout(() => {
      var box = container.children[index];
      box.classList.remove("pressed");
      box.classList.add("victory");
    }, index * 150);
  }
  setTimeout(() => {
    victoryText.style.display = "block";
  }, container.children.length * 150);
}
function buttonVictory() {
  var buttons = document.querySelector(".difficulties");
  buttonInterval = setInterval(() => {
    for (let index = 0; index < buttons.children.length; index++) {
      setTimeout(() => {
        var button = buttons.children[index];
        button.classList.toggle("victory");
      }, index * 150);
    }
  }, 500);
}
function createVictoryChar() {
  const letterArray = ["V", "I", "C", "T", "O", "R", "Y"];
  for (let index = 0; index < letterArray.length; index++) {
    setTimeout(() => {
      victoryText.innerText += letterArray[index];
    }, index * 300);
  }
}

// function startTimer() {
//   var newDate = new Date();
//   timer.innerText =
//     "Time Passed : " + Math.floor(newDate - appRunTime) / 1000 + " seconds";
// }
