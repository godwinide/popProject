function preventDraws(players) {
    const p = players;
    const highsort = players.sort((a, b) => b.score - a.score);
    highsort[0].score++;
    const id = highsort[0].name;
    p.filter(e => e.name == id).map(e => e.score = highsort[0].score);
    return p;
}
export default preventDraws;