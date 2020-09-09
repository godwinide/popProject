function domAnimate(name) {
    let isOn = false;
    document.querySelector(`.${name}`).style.transition = ".4s ease";
    document.querySelector(`.${name}-score`).style.transition = ".4s ease";
    let t = setInterval(() => {
        if (isOn) {
            document.querySelector(`.${name}`).style.opacity = "0";
            document.querySelector(`.${name}-score`).style.opacity = "0";
        }
        if (!isOn) {
            document.querySelector(`.${name}`).style.opacity = "1";
            document.querySelector(`.${name}-score`).style.opacity = "1";
        }
    }, 100);

    setTimeout(() => {
        // document.querySelector(`.${name}`).style.opacity = "1";
        // document.querySelector(`.${name}-score`).style.opacity = "1";
        clearInterval(t)
    }, 2000)
}

export default domAnimate