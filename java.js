const sizeX = 5; // ustunlar soni
const sizeY = 3; // qatorlar soni
const totalTiles = 12; // 12 ta son
let tiles = [];

function init() {
    do {
        tiles = [];
        for (let i = 1; i <= totalTiles; i++) tiles.push(i);
        while (tiles.length < sizeX * sizeY) tiles.push(0); // bo‘sh kataklar
        shuffle();
    } while (!isSolvable());
    draw();
}

function shuffle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function isSolvable() {
    let inv = 0;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inv++;
        }
    }
    const emptyRowFromBottom = sizeY - Math.floor(tiles.indexOf(0) / sizeX);
    if (sizeX % 2 === 1) return inv % 2 === 0;
    return (emptyRowFromBottom % 2 === 0) !== (inv % 2 === 0);
}

function draw() {
    const game = document.getElementById("game");
    game.innerHTML = "";
    tiles.forEach((num, i) => {
        const div = document.createElement("div");
        div.className = "tile";
        if (num === 0) {
            div.classList.add("empty");
        } else {
            div.textContent = num;
            div.onclick = () => move(i);
        }
        game.appendChild(div);
    });
}

function move(index) {
    const empty = tiles.indexOf(0);
    const x1 = index % sizeX;
    const y1 = Math.floor(index / sizeX);
    const x2 = empty % sizeX;
    const y2 = Math.floor(empty / sizeX);

    if (Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1) {
        [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
        draw();
        checkWin();
    }
}

function checkWin() {
    for (let i = 0; i < totalTiles; i++) {
        if (tiles[i] !== i + 1) return;
    }
    alert("YUTDING 🎉");
}

// O‘yin boshlanishi
init();
