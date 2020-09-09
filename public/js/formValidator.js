import beginMaster from "./game.js";

import postBet from "./ajax/main.js";


const start = document.querySelector("#start");
const players = document.querySelector(".players");
const noPlayers = document.querySelector(".noPlayers");
const stake = document.querySelector(".stake");
const potWin = document.querySelector(".potWin");
const payWin = document.querySelector(".payWin");
const startBtn = document.querySelector(".start");
const live = document.querySelector("#live");


const startData = {
    no_players: 0,
    pay_win: 0,
    pot_win: 0,
    stake: 0,
    players: 0,
};

startBtn.addEventListener("click", e => {
    e.preventDefault();
    if (!noPlayers.value.length || !stake.value.length || !potWin.value.length || !payWin.value.length || !players.value.length) {
        alert("fill all fields");
        return;
    }

    (async function () {
        await postBet(startData.players, startData.stake, startData.pay_win, beginMaster);
        waitStart();
    })();
});

function waitStart() {
    setTimeout(beginMaster(startData.players, startData.stake, startData.pay_win), 10000);
}


function validate() {
    startData.stake = stake.value;
    startData.no_players = (players.value + " ").split(" ").length - 1;
    startData.pot_win = parseInt(stake.value) * startData.no_players;
    startData.pay_win = (parseInt(stake.value) * startData.no_players) - (((parseInt(stake.value) * startData.no_players) / 100) * 10)
    startData.players = players.value;

    potWin.value = parseInt(stake.value) * startData.no_players;
    payWin.value = startData.pay_win;
    noPlayers.value = startData.no_players;
}



players.addEventListener("input", validate);
noPlayers.addEventListener("input", validate);
stake.addEventListener("input", validate);


