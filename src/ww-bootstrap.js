// Bootstrap the application / services here!

module.exports = () => {

    Object.defineProperty(global, '__base', {
        value: __dirname,
        writable: false
    });
    
};