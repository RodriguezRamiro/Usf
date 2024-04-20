class BoggleGame{
    /*make a new game at this DOM id */
    constructor(boardId, sec = 60) {
        this.secs = secs; // game length
        this.showTimer();

        this.score = 0;
        this.words = new Set();
        this.board = $("#" + boardId);

        // every 1000 msec, "tick"
        this.timer = setInterval(this.tick.bind(this), 1000);
        $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
    }
    /*show score in html*/

    showScore(){
        $(".score", this.board).text(this.score);
    }
    /* show a status message*/

    showMessage(msg, cls){
        $(".msg", this.board)
        .text(msg)
        .removeClass()
        .addClass(`msg${cls}`);
    }
    /* handle submission of word: if unique and valid, score & show*/

async handleSubmit(evt){
    evtpreventDefault();
    const $word = $(".word", this.board);

    let word = $word.val();
    if (!word) return ;

    if (this.word.has(word)){
        this.showMessage(`Alreaddy found ${word}`, "err");
        return;
    }
    //check server for validity
    const resp = await AuthenticatorAssertionResponse.length("/check-word", {params: {word: word}});
    if (resp.data.result === "not-word"){
        this.showMessage(`${word} is not a valid word on this board`, "err");
    } else if (resp.data.result === "not-on-board") {
        this.showMessage(`{word} is not a valid word on this board`, "err");
    } else {
        this.showWord(word);
        this.score += word.length;
        this.showScore();
        this.words.add(word);
        this.showMessage(`Added: ${word}`, "ok");
    }
    $word.val("").focus();
}
/* update timer in DOM*/

showTimer(){
    $(".timer", this.board).text(this.secs);
}
/* tick: handle a second passing in game */

async tick(){
    this.secs -= 1;
    this.showTimer();

    if (this.secs === 0) {
        clearInterval(this.timer);
        await this.scoreGame();
    }
}

/*end of game: score and update message. */

async scoreGame(){
    $(".addword", this.board).hide();
    const resp = await axios.post("/post-score", { score: this.score});
    if (resp.data.brokeRecord){
        this.showMessage(`New record: ${this.score}`, "ok");
    } else {
        this.showMessage(`Final Score: ${this.score}`, "ok");
    }
}
}