// get all tickers
const printBtn = document.querySelector("#onePrint");

async function postBet(players, stake, payWin, cb) {
    const response = await fetch(`https://enaland.com/cornerBet/ticket/${players}/${stake}/${payWin}/${new Date()}`);
    const bet = await response.json();
    await printBtn.setAttribute("p_id", bet._id)
    printBtn.removeAttribute("disabled");
};
export default postBet;