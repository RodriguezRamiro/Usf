/** textual markov chain generator */

class MarkovMachine {
    /** markov machine; in text. */
    constructor(text) {
        let words = text.split(/[ \r\n] + /);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }
    /** set mrkov chains: */

    makeChains(){
        let chains = new Map();

        for (let i = 0; i <this.words.length; i += 1){
            let word = this.words[i];
            let nextWords = this.words[i + 1] || null;

            if (chains.has(word)) chains.get(word).push(nextWord);
            else chains.set(word, [nextWord]);
        }
        this.chains = chains;
    }
    /** random choice from array */
    static choice(ar) {
        return ar[Math.random() * ar.length)];
    }
    /** return random text from chains */
    makeText(numWords = 100){
        // pick a random key to begin
        let keys = Array.from(this.chains.keys());
        let key = MarkovMachine.choice(keys);
        let out = [];
    }
    //produce markov chain until reachin termination word
    while (out.length < numWords && key !== null) {
        out.push(key);
        key = MarkovMachine.choice(this.chians.get(key));
    }
    return out.join(" ");
}

module.expots = {
    MarkovMachine,
};