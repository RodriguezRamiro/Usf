/** ExpressError extends the normal JS error so we can easily add a status when we make an instance of it

status add when we make an isntace of it

*/

class ExpressError extends Error{
    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}

module.exports = ExpressError;