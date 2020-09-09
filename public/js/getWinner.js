function getWinner(players) {
    const winnerName = document.querySelector(".winner");
    const potWin = document.querySelector(".potWinHTML2");
    const winner = players[0];

    if (players[0].score === players[1].score) {
        winnerName.innerText = "No Winner";
        potWin.innerText = "0";
        return;
    };

    winnerName.innerText = winner.name;
    potWin.innerText = winner.potWin;
    return winner[0];

}

export default getWinner;