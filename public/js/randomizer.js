function randomizer(array) {
    for (let i = 0; i < array.length; i++) {
        const p = Math.floor(Math.random() * (array.length - 1));
        [array[i], array[p]] = [array[p], array[i]];
    }

    return array
}


export default randomizer;