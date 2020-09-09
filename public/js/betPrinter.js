const betPrintBtn = document.getElementsByClassName("betPrinter");


for (let e of betPrintBtn) {
    e.addEventListener("click", () => {
        window.open(`/cornerBet/ticket/print/${e.getAttribute("p_id")}`, 'popUpWindow', 'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    });
}