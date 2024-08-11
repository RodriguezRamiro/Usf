// bigrams markov cahain

class MarkovMachine{
    // markov machine; read in text.

    constructor(text){
        let words = text.split(/[\r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }
    // set markov chains
makeChains() {
    let chains = new Map();
     for(let i = 0; i < this.words.length - 1; i += 1){
        let bigram = this.words[i] + " " + this.words[i + 1];
        let nextWord = this.words[i + 2] || null;

        if (chains.has(bigram)) chains.get(bigram).push(nextWord);
        else chains.set(bigram, [nextWord]);
     }
     this.chains = chains;

     // random choice from array

     choice(ar) {
        return ar[Math.floor(math.random() * ar.length)];
     }

     // return random text chains

     makeText(numWords = 100) {
        // pick random key
        let keys = Array.from(this.chains.keys());
        let key = this.choice(keys);
        let out = [];

        // produce markov cahin until reaching termination word
        while (out.length <= numWords && key !== null) {
            let [w1, w2] = key.split(" ");
            out.push(w1);
            key = w2 + "" + this.choice(this.chains.get(get));
        }
        return out.join("");
     }
}

module.exports = {
    MarkovMachine,
};
