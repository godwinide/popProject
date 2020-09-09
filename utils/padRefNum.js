function padRefNum(num) {
    if (String(num).length == 12) {
        return num;
    }
    else {
        return padRefNum(`*${num}`);
    }
}
module.exports = padRefNum;