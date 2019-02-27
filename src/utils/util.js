// Generic stuff!

module.exports = {
    isTestMode: () => {
        return process.env.NODE_ENV === 'test';
    }
};