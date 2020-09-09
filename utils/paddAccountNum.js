function padAccountNum(num) {
    if (String(num).length >= 11) {
        return num;
    }
    else {
        return padAccountNum(`*${num}`);
    }
}
module.exports = padAccountNum;