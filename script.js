//Assigns the HTML element to the global variables to the image elements
let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let door3 = document.getElementById("door3");
let startButton = document.getElementById("start");

//Variable for the bot door image path
let botDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
//Variable fot the beach door image path
let beachDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
//Variable for the space door image path
let spaceDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
//Variable for the closed door
let closedDoor =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;
let currentlyPlaying = true;

const randomChoreGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = spaceDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
};

randomChoreGenerator();

//Will add click functionality to the doors
door1.onclick = () => {
  if (closed(door1) && currentlyPlaying) {
    door1.src = openDoor1;
    play(door1);
  }
};

door2.onclick = () => {
  if (closed(door2) && currentlyPlaying) {
    door2.src = openDoor2;
    play(door2);
  }
};
door3.onclick = () => {
  if (closed(door3) && currentlyPlaying) {
    door3.src = openDoor3;
    play(door3);
  }
};
//The onclick logic for start button
startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
};

//Function checks if the door is closed by matching the image path
function closed(door) {
  if (door.src === closedDoor) {
    return true;
  } else {
    return false;
  }
}

//Function that will decrease the number of available doors as they are clicked
function play(door) {
  if (isBot(door)) {
    gameOver(" ");
  }
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  }
}

//This function executes when the number of doors is zero
function gameOver(status) {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    currentlyPlaying = false;
  } else {
    startButton.innerHTML = "Game Over! Play Again?";
    currentlyPlaying = false;
  }
}

//If match between door src path and bot path returns boolean
function isBot(door) {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

//This resets all the values and logic
function startRound() {
  door1.src = closedDoor;
  door2.src = closedDoor;
  door3.src = closedDoor;
  numClosedDoors = 3;
  startButton.innerHTML = "Good Luck!";
  currentlyPlaying = true;
  randomChoreGenerator();
}
