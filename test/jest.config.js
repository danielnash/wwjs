// Simply bootstrap everything and map the path variable to the "global" variable in the test scope
require('./../src/ww-bootstrap.js')();

module.exports = {
    globals: {
        __base: global.__base
    }
};