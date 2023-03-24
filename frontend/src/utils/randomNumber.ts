function randomNumber(to: number, from: number) {
    return Math.floor(Math.random() * (from - to + 1)) + to;
}

export default randomNumber;
