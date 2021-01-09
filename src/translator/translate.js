const acorn = require('acorn');
const dictionary = require('./dictionary.js');
var globalImports = ["# This python file was generated by the javascript-to-python convertor.", "# Github: https://github.com/jiricekcz/javascript-to-python", "# Convertor author: https://github.com/jiricekcz"];
var usedIdentifiers = [];
module.exports = function translate(javascriptString) {
    var program = acorn.parse(javascriptString, { ecmaVersion: 2020 });
    var x = program.body.map(v => pythonify(v)).join('\n');
    var pythonString = globalImports.join("\n") + "\n" + x;
    return pythonString;
}
/**
 * 
 * @param {acorn.Node} node
 * @returns {string} 
 */
function pythonify(node, depth = 0, ...moreParams) {
    if (!translators[node.type]) {
        console.log(node);
        throw new Error("There is not defined pythonification function for this node, type: " + node.type);
    }

    return translators[node.type](node, depth, ...moreParams);
}


var translators = {
    VariableDeclaration: (node, depth = 0) => {
        return node.declarations.map(d => pythonify(d, depth)).join(getDepthSpacing(depth));
    },
    VariableDeclarator: (node, depth = 0) => {
        return `${pythonify(node.id, depth)}=${pythonify(node.init, depth)}`;
    },
    Identifier: (node) => {
        usedIdentifiers.push(node.name);
        return node.name;
    },
    Literal: (node) => {
        return node.raw;
    },
    BinaryExpression: (node, depth) => {
        return `${pythonify(node.left, depth)}${node.operator}${pythonify(node.right, depth)}`;
    },
    IfStatement: (node, depth = 0, elseIfStatement = false) => {
        var s = `${elseIfStatement ? "\nelif" : "if"} ${pythonify(node.test, depth)}:${pythonify(node.consequent, depth)}`;
        if (node.alternate) {
            if (node.alternate.type == "BlockStatement") {
                s += `\n${getDepthSpacing(depth)}else:${pythonify(node.alternate, depth)}`;
            } else if (node.alternate.type == "IfStatement") {
                s += pythonify(node.alternate, depth, true);
            } else {
                console.log(node);
                throw new Error("If alternate not supported.");
            }
        }
        return s;
    },
    BlockStatement: (node, depth) => {
        depth++;
        if (node.body.length == 0) return `\n${getDepthSpacing(depth)}pass`
        return "\n" + getDepthSpacing(depth) + node.body.map(h => pythonify(h, depth)).join("\n" + getDepthSpacing(depth));
    },
    ExpressionStatement: (node, depth) => {
        return pythonify(node.expression, depth);
    },
    UpdateExpression: (node, depth) => {
        switch (node.operator) {
            case "++":
                return `${pythonify(node.argument, depth)}+=1`;
            case "--":
                return `${pythonify(node.argument, depth)}-=1`;
            default:
                console.log(node);
                throw new Error("UpdateExpression not supported.")
        }
    },
    AssignmentExpression: (node, depth) => {
        return `${pythonify(node.left, depth)}${node.operator}${pythonify(node.right, depth)}`;
    },
    WhileStatement: (node, depth) => {
        return `while ${pythonify(node.test, depth)}:${pythonify(node.body, depth)}`;
    },
    ForStatement: (node, depth) => {
        return `${pythonify(node.init, depth)}\n${getDepthSpacing(depth)}while ${pythonify(node.test, depth)}:${pythonify(node.body, depth)}\n${getDepthSpacing(depth + 1)}${pythonify(node.update, depth)}`;
    },
    BreakStatement: (node, depth) => {
        return "break"
    },
    ContinueStatement: (node, depth) => {
        return "continue"
    },
    FunctionDeclaration: (node, depth) => {
        return `def ${pythonify(node.id, depth)}(${node.params.map(p => pythonify(p, 0)).join(",")}):${pythonify(node.body, depth)}`;
    },
    ReturnStatement: (node, depth) => {
        return `return ${pythonify(node.argument)}`;
    },
    CallExpression: (node, depth) => {
        return `${pythonify(node.callee, depth)}(${node.arguments.map(v => pythonify(v, depth)).join(",")})`;
    },
    MemberExpression: (node, depth) => {
        var member = `${pythonify(node.object, depth)}.${pythonify(node.property, depth)}`;
        if (dictionary.functionRenames.has(member)) {
            member = dictionary.functionRenames.get(member);
            if (member instanceof Array) {
                addGlobalImport(...member[1]);
                member = member[0];
            }
        }
        return member;
    },
    ClassDeclaration: (node, depth) => {
        return `class ${pythonify(node.id, depth)}${node.superClass ? `(${pythonify(node.superClass, depth)})` : ""}:${pythonify(node.body, depth)}`;
    },
    ClassBody: (node, depth) => {
        depth++;
        return `\n${getDepthSpacing(depth)}${node.body.map(v => pythonify(v, depth)).join("\n" + getDepthSpacing(depth))}`;
    },
    MethodDefinition: (node, depth) => {
        switch (node.kind) {
            case "constructor":
                return `def __init__${pythonify(node.value, depth, true)}`
            case "method":
                return `def ${pythonify(node.key, depth)}${pythonify(node.value, depth, true)}`
            default:
                console.log(node);
                throw new Error("Not supported method kind.");
        }
    },
    FunctionExpression: (node, depth, includeSelf = false) => {
        if (node.body.type == "BlockStatement") {
            return `(${includeSelf ? "self, " : ""}${node.params.map(p => pythonify(p, 0)).join(",")}):${pythonify(node.body, depth)}`;
        } else {
            return `(${includeSelf ? "self, " : ""}${node.params.map(p => pythonify(p, 0)).join(",")}): return ${pythonify(node.body, depth)}`;

        }
    },
    Super: (node, depth) => {
        return `super()`;
    },
    ThisExpression: (node, depth) => {
        return "self"
    },
    NewExpression: (node, depth) => {
        return translators.CallExpression(node, depth);
    },
    ArrowFunctionExpression: (node, depth) => {
        var id = generateRandomIdentifier();
        defineGlobalFunction(id, node.params, node.body);
        return id;
    }
}

/**
 * 
 * @param {number} depth 
 */
function getDepthSpacing(depth) {
    if (depth === undefined) throw new Error("Depth must be specified.");
    return new Array(depth + 1).join("    ");
}
function addGlobalImport(...importes) {
    for (var imp of importes) {
        if (!globalImports.includes(imp)) globalImports.push(imp);
    }
}
/**
 * 
 * @param {string} name 
 * @param {acorn.Node} params 
 * @param {Array<acorn.Node>} body 
 */
function defineGlobalFunction(name, params, body) {
    console.log("Defined global function: " + name);
    globalImports.push(`def ${name}` + translators.FunctionExpression({
        body,
        params
    }, 0));
}
function generateRandomIdentifier(length = 32) {
    var rv = "";
    for (var i = 0; i < length; i++) {
        rv += generateRandomChar();
    }
    while (usedIdentifiers.includes(rv) || rv.includes("1") || rv.includes("0")) {
        rv = "";
        for (var i = 0; i < length; i++) {
            rv += generateRandomChar();
        }
    }
    return rv;
}
function generateRandomChar() {
    var id = Math.round(12 + Math.random() * 24).toString(36);
    usedIdentifiers.push(id);
    return id;
}