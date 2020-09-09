// import modules
import scoreProbability from "./scoreProbability.js";
import logos from "./logos.js";

import randomizer from "./randomizer.js";
import preventDraws from "./preventDraws.js";
import marquee from "./marquee.js";
import updateHTMLOnly from "./updateHTMLOnly.js";
import getWinner from "./getWinner.js";

function beginMaster(names, stake, potWin) {
    // dom elements
    const matchTable = document.getElementsByClassName("match-table")[0];
    const time = document.querySelector(".time");
    const stakeHTML = document.querySelector(".stakeHTML");
    const potWinHTML = document.querySelector(".potWinHTML");

    // set winning and stake
    stakeHTML.innerText = stake;
    potWinHTML.innerText = potWin;

    // initials
    let gameData = {
        players: [],
        newGamesHTML: "",
        timer: 0,
        randLogos: randomizer(logos),
        week: 1
    };

    // first function
    init(potWin);
    async function init(potWin) {

        // add players to players array
        await randomizer(names.split(" ")).forEach((e, index) => {
            gameData.players.push({
                name: e,
                shortName: e.slice(0, 4),
                stake,
                potWin,
                scoreProb: scoreProbability(),
                score: 0,
                logo: `${gameData.randLogos[index]}.png`,
                week: 0,
            });
        });
        startGame();
    }


    // second function
    function startGame() {
        const playerInfo = { index: 0 };
        const s = new Audio("../audio/start.mp3");
        s.play();
        // init html
        updateHTML();
        let interv = setInterval(() => {
            if (gameData.timer <= 90) {
                time.innerHTML = gameData.timer;
                gameData.timer++;


                // check for fulltime
                if (gameData.timer <= 80) {
                    // update scores
                    if (playerInfo.index == (gameData.players.length - 1)) {
                        updateScores(playerInfo.index);
                        updateHTMLOnly(gameData.players);
                        playerInfo.index = 0;
                    }
                    else {
                        updateHTMLOnly(gameData.players);
                        updateScores(playerInfo.index);
                        playerInfo.index++;
                    }
                }

                if (gameData.timer == 83) {
                    (async function () {
                        // gameData.players = await preventDraws(gameData.players);
                        await updateScores(playerInfo.index);
                        updateHTMLOnly(gameData.players[0]);
                    })()
                }
                if (gameData.timer >= 90) {
                    time.innerHTML = gameData.timer;
                    getWinner(gameData.players);
                    marquee(gameData.players[0]);
                    clearInterval(interv);
                    //reset gamedata
                    gameData.players = [];
                    gameData.randLogos = [];
                    gameData.timer = 0;
                    gameData.newGamesHTML = "";
                    (async function () {
                        const getWeek = await fetch("https://enaland.com/cornerBet/week");
                        gameData.week = await getWeek.text;
                    })();
                    setTimeout(() => window.location.reload(), 5000);
                }
            }
        }, 800);


        // third function
        function updateScores(index) {
            const s = scoreProbability();
            if (s) {
                new Audio("./audio/goal1.mp3").play();
                // setTimeout(() => { speakOut(gameData.players[index].name); }, 500)
                gameData.players[index].score++;
                updateHTMLOnly(gameData.players[index]);
            }
        }


        // fourth function
        function updateHTML() {
            let newGamesHTML = "";
            for (let p = 0; p < gameData.players.length; p += 2) {

                newGamesHTML += `
                    <tr>
                    <th scope="row">${(p / 2) + 1}</th>
                    <td><img src="/img/${gameData.players[p].logo}" alt="logo"></td>
                    <td> <h4 class="${gameData.players[p].name} ">${gameData.players[p].name}</h4></td>
                    <td><h4 class="${gameData.players[p].name}-score ">${gameData.players[p].score}</h4></td>
                    <td>:</td>
                    <td><h4 class="${gameData.players[p + 1].name}-score">${gameData.players[p + 1].score}</h4></td>
                    <td><h4 class="${gameData.players[p + 1].name}">${gameData.players[p + 1].name}</h4></td>
                    <td><img src="/img/${gameData.players[p + 1].logo}" alt="logo">
                    </tr>       
        `;

            };

            matchTable.innerHTML = `
            <div class="container">
            <table class=".match-instance table table-striped table-dark">
            <tbody>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Logo</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
                <th scope="col"></th>
                <th scope="col">Score</th>
                <th scope="col">Name</th>
                <th scope="col">Logo</th>
            </tr>` + newGamesHTML + `
            </tbody>
            </table>
            </div> `
        }

    }

}

export default beginMaster;