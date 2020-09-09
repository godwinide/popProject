function updateHTMLOnly(player) {
    if (player.score > 0) {
        const t = document.querySelector(`.${player.name}`);
        const s = document.querySelector(`.${player.name}-score`);

        t.classList.add("blink");
        s.classList.add("blink");
        s.innerHTML = player.score;

        setTimeout(() => {
            s.classList.remove("blink");
            t.classList.remove("blink");
        }, 1500)
    }
}

export default updateHTMLOnly;