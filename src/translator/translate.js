const acorn = require('acorn');
const dictionary = require('./dictionary');

module.exports = function translate(javascriptString) {
    var program = acorn.parse(javascriptString, { ecmaVersion: 2020 });
    var pythonString = program.body.map(v => pythonify(v)).join('\n');
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
        return node.name;
    },
    Literal: (node) => {
        return node.raw;
    },
    BinaryExpression: (node, depth) => {
        return `${pythonify(node.left, depth)}${node.operator}${pythonify(node.right, depth)}`;
    },
    IfStatement: (node, depth = 0, elseIfStatement = false) => {
        var s = `${elseIfStatement ? "\nelif": "if"} ${pythonify(node.test, depth)}:${pythonify(node.consequent, depth)}`;
        if (node.alternate) {
            if (node.alternate.type == "BlockStatement") {
                s+=`\n${getDepthSpacing(depth)}else:${pythonify(node.alternate, depth)}`;
            } else if (node.alternate.type == "IfStatement") {
                s+=pythonify(node.alternate, depth, true);
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
        return "\n" + getDepthSpacing(depth) + node.body.map(h => pythonify(h, depth)).join( "\n" + getDepthSpacing(depth));
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
        return `def ${pythonify(node.id, depth)}(${node.params.map(p=> pythonify(p, 0)).join(",")}):${pythonify(node.body, depth)}`;
    }, 
    ReturnStatement: (node, depth) => {
        return `return ${pythonify(node.argument)}`;
    },
    CallExpression: (node, depth) => {
        var callee = pythonify(node.callee, depth);
        if (dictionary.functionRenames.has(callee)) callee = dictionary.functionRenames.get(callee);
        return `${callee}(${node.arguments.map(v => pythonify(v, depth)).join(",")})`;
    },
    MemberExpression: (node, depth) => {
        return `${pythonify(node.object, depth)}.${pythonify(node.property, depth)}`
    },
    ClassDeclaration: (node, depth) => {
        return `class ${pythonify(node.id, depth)}${node.superClass ? `(${pythonify(node.superClass, depth)})`: ""}:${pythonify(node.body, depth)}`;
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
        return `(${includeSelf ? "self, " : ""}${node.params.map(p=> pythonify(p, 0)).join(",")}):${pythonify(node.body, depth)}`;
    },
    Super: (node, depth) => {
        return `super()`;
    },
    ThisExpression: (node, depth) => {
        return "self"
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