const { get } = require("http");

module.exports = class Script {
    /**
     * 
     * @param {Array} nodes 
     */
    constructor(nodes) {
        this.nodes = nodes;
        this.newNodes = [];

        for (var node of this.nodes) {
            let n = Node.getNode(node);
            if (n) this.newNodes.push(n);
        }
    }
    toString() {
        return this.newNodes.join("\n");
    }
}
class Node {
    constructor() {

    }
    static getNode(node) {
        switch (node.type) {
            case "VariableDeclaration": {
                var dc = node.declarations[0];
                var nd = new VariableDeclaration(
                    new Identifier(dc.id),
                    new Value(dc.init)
                );
                return nd;
            }
            case "IfStatement": {
                var dc = node;
                if (dc.consequent.type == "BlockStatement") {
                    var nd = new IfStatement(
                        new Value(dc.test),
                        new BlockStatement(dc.consequent.body)
                    );
                } else {
                    var nd = new IfStatement(
                        new Value(dc.test),
                        new BlockStatement([dc.consequent])
                    );
                }
                
                return nd;
            }
            case "ExpressionStatement": {
                var dc = node.expression;
                if (dc.type == "UpdateExpression") {
                    if (dc.operator == "++") {
                        return Expression.string(`${new Identifier(dc.argument)}+=1`);
                    } else if (dc.operator == "--") {
                        return Expression.string(`${new Identifier(dc.argument)}-=1`);
                    }
                }
                var nd = new Expression(dc);
                return nd;
            }
            case "WhileStatement": {
                var dc = node;
                var nd = new WhileStatement(
                    new Value(dc.test),
                    new BlockStatement(dc.body.body)
                );
                return nd;
            }
            case "ForStatement": {
                var dc = node;
                return new ForStatement(
                    Node.getNode(node.init),
                    Node.getNode(node.test),
                    Node.getNode(node.update),
                    new BlockStatement(node.body.body)
                )
            }
            case "BinaryExpression": {
                var dc = node;
                return new Expression(dc);
            }
            case "UpdateExpression": {
                var dc = node;
                if (dc.operator == "++") {
                    return Expression.string(`${new Identifier(dc.argument)}+=1`);
                } else if (dc.operator == "--") {
                    return Expression.string(`${new Identifier(dc.argument)}-=1`);
                }
            }
            case "Identifier": {
                var dc = node;
                return new Identifier(dc);
            }
            default: throw new Error(console.log(node));
        }
    }
}
class Value extends Node {
    constructor(value) {
        super();
        if (value.type == "Literal") {
            this.value = value.raw;
            return;
        }
        if (value.type == "BinaryExpression" && ["+", "-", "*", "/", "**", "%", "==", "=", "<", ">", "<=", ">=", "==="].includes(value.operator)) {
            var a, b, c;
            if (value.left.type === "Literal") a = value.left.raw; else if (value.left.type === "Identifier") a = value.left.name; else console.log(value);
            b = value.operator;
            if (value.right.type === "Literal") c = value.right.raw; else if (value.right.type === "Identifier") c = value.right.name; else console.log(value);
            this.value = a + b + c;
            return;
        }
        throw new Error(console.log(value));
    }
    toString() { return this.value; }
}
class Identifier extends Node {
    constructor(name) {
        super();
        this.name = name.name;
    }
    toString() { return this.name; }
}
class VariableDeclaration extends Node {
    /**
     * 
     * @param {Identifier} identifier 
     * @param {Value} value 
     */
    constructor(identifier, value) {
        super();
        this.variableName = identifier;
        this.value = value;
    }
    toString() {
        return `${this.variableName} = ${this.value}`;
    }
}
class IfStatement extends Node {
    /**
     * 
     * @param {Value} expression 
     * @param {BlockStatement} consequent
     */
    constructor(expression, consequent) {
        super();
        this.expression = expression;
        this.consequent = consequent;
    }
    toString(depth = 0) {
        return `if ${this.expression}: \n${this.consequent.toString(depth + 1)}`
    }
}
class BlockStatement extends Node {
    constructor(nodes) {
        super();
        this.nodes = nodes.map(v => Node.getNode(v));
    }
    toString(depth) {
        return getBlankSpace(depth) + this.nodes.map(v => v.toString(depth)).join('\n' + getBlankSpace(depth));
    }
}
class Expression extends Node {
    constructor(expression) {
        super();
        if (!expression) return;
        this.identifier = new Identifier(expression.left);
        this.operator = expression.operator;
        if (expression.right.type == "Identifier") {
            this.value = new Identifier(expression.right);
        } else this.value = new Value(expression.right);
    }
    toString() {
        if (this.string) return this.string;
        return `${this.identifier}${this.operator}${this.value}`;
    }
    static string(string) {
        var a = new Expression();
        a.string = string;
        return a;
    }
}
class WhileStatement extends Node {
    constructor(expression, loop) {
        super();
        this.expression = expression;
        this.loop = loop;
    }
    toString(depth = 0) {
        return `while ${this.expression}: \n${this.loop.toString(depth + 1)}`
    }
}
class ForStatement extends Node {
    constructor(start, test, end, loop) {
        super();
        this.start = start;
        this.test = test;
        loop.nodes.push(end);
        this.loop = loop;
    }
    toString(depth = 0) {
        return `${this.start}\n${getBlankSpace(depth)}while ${this.test}: \n${this.loop.toString(depth + 1)}`
    }
}
function getBlankSpace(depth) {
    var rv = "";
    for (var i = 0; i < depth; i++) {
        rv += "    ";
    }
    return rv;
}
