handleErrors = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => console.log(error));
module.exports = {handleErrors};