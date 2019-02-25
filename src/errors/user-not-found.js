module.exports = class UserNotFoundError extends require('./base-error.js') {
    constructor() {
        super('User not found');
    }
}