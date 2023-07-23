const tilesContainer = document.querySelector(".tiles");
const colors = [
  "aqua",
  "azure",
  "brown",
  "blanchedalmond",
  "aquamarine",
  "gold",
  "indigo",
  "maroon",
];

const colorsPicklist = [...colors, ...colors];

const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let activeTile = null;
let awatingEndofMove = false;

// Building tiles

const buildTile = (clr) => {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-color", clr);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (awatingEndofMove || revealed === "true" || element === activeTile) {
      return;
    }
    element.style.backgroundColor = clr;

    if (!activeTile) {
      activeTile = element;

      return;
    }
    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === clr) {
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      activeTile = null;
      awatingEndofMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("You have won!! Refresh to play again");
      }
      return;
    }

    awatingEndofMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      awatingEndofMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
};

for (let i = 0; i < tileCount; i++) {
  let randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  colorsPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
