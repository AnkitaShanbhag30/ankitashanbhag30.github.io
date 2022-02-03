let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(100); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.setAttribute("focus", 0);
  newimg.setAttribute("direction", 0);
  newimg.attributes.focus.value = 0;
  newimg.attributes.direction.value = 0;
  newimg.width = 100;
  // TODO: set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';
  // TODO add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.newimg.attributes.focus.value = 1 - item.newimg.attributes.focus.value;
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    item.newimg.src = pacArray[item.newimg.attributes.direction.value][item.newimg.attributes.focus.value];
  });
  setTimeout(update, 200);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (item.position.x + item.newimg.width + item.velocity.x > window.innerWidth || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -1 * item.velocity.x;
    item.newimg.attributes.direction.value = 1 - item.newimg.attributes.direction.value;
  }
  if (item.position.y + item.newimg.height + item.velocity.y > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -1 * item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
