const acorn = require('acorn');

/**
 * 
 * @param {String} javascriptString 
 */
module.exports = function parse(javascriptString) {
    return acorn.parse(javascriptString, {ecmaVersion: 2020}).body;
}