// validate transaction form

const amountField = document.querySelector("#amountField")
const feeField = document.querySelector("#feeField");
const traField = document.querySelector("#traType");
const baField = document.querySelector("#baType");
const cardType = document.querySelector("#cardType");

// update typing names
const accName = document.querySelector("#accountName"), clientName = document.querySelector("#clientName");

accName.addEventListener("input", e => {
    clientName.value = e.target.value;
});

clientName.onfocus = () => {
    clientName.selectionStart = 0;
    clientName.selectionEnd = clientName.value.length;
}


function validateFee() {
    const tr = document.querySelector("#traType");
    const cType = document.querySelector("#cardType");
    const traFieldVal = tr[tr.options.selectedIndex].value;
    const cardType = cType[cType.options.selectedIndex].value;

    // if the transaction type is credit

    if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 11000 && traFieldVal == "Credit") {
        feeField.value = 100
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 21000 && traFieldVal == "Credit") {
        feeField.value = 200
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 40000 && traFieldVal == "Credit") {
        feeField.value = 300
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 70000 && traFieldVal == "Credit") {
        feeField.value = 400
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 70000 && traFieldVal == "Credit") {
        feeField.value = 500
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 100000 && traFieldVal == "Credit") {
        feeField.value = 500
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 150000 && traFieldVal == "Credit") {
        feeField.value = 700
    }
    else if (parseInt(amountField.value.replace(/[-,]/g, "")) <= 2000000000 && traFieldVal == "Credit") {
        feeField.value = 800
    }


    // if the transaction type is debit
    // check bank type

    if (traFieldVal == "Debit" || cardType == "Transfer" || cardType == "Cash") {
        feeField.value = 0
    }

}

amountField.addEventListener("input", validateFee);
traField.addEventListener("input", validateFee);
cardType.addEventListener("input", validateFee);


