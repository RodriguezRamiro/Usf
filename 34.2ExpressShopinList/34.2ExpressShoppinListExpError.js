/** ExpressError extends teh normal JS error so we  can easily add a stautus when we make an instance of it.
 * add status when we make an instance of it
 * the error-handling middleware will return this
 */

class ExpressError extends Error{
    constructor(message, status){
        super();
        this.message = message;
        this.status= status;
        console.error(this.stack);
    }
}

module.exports = ExpressErorr;