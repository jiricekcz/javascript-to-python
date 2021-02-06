# A javascript to python translator 
My attempt to create a translator from simple Javascript to python

Note: This only translates syntax features, not all native functions will be available.

Note: Python does not nativly support async functions and all functions that would be async in JavaScript run synchronously in python, thus all async/await modifiers will be ignored while translating to python. 

Note: You can use native python functions within the JavaScript file. This can be usefull for functions like *input()*, whose function is, due to the nature of JavaScript, somewhat complicated to replicate in JavaScript.
## Currently supported JavaScript syntax features
- VariableDeclaration
- VariableDeclarator
- Identifier
- Literal
- BinaryExpression
- IfStatement
- BlockStatement
- ExpressionStatement
- UpdateExpression
- AssignmentExpression
- WhileStatement
- ForStatement
- BreakStatement
- ContinueStatement
- FunctionDeclaration
- ReturnStatement
- CallExpression
- MemberExpression
- ClassDeclaration
- ClassBody
- MethodDefinition
- FunctionExpression
- Super
- ThisExpression
- ArrowExpression
- ArrayExpression
- ArrayPattern
- SpreadElement
- ObjectExpression
- Property
- ClassExpression
- ThrowStatement
- TryStatement
- CatchClause
- ForOfStatement
- UnaryExpression
- LogicalExpression
- TemplateLiteral
- TemplateElement
## Currently translated native JavaScript functions and constants
- *Number()*
- *String()*
- *console.log()*
- *Math.round()*
- *Math.ceil()*
- *Math.floor()*
- *Math.E*
- *Math.exp()*
- *Math.log()*
- *Math.pow()*
- *Math.LN10*
- *Math.LN2*
- *Math.LOG2E*
- *Math.LOG10E*
- *Math.PI*
- *Math.SQRT1_2*
- *Math.SQRT2*
- *Math.abs()*
- *Math.acos()*
- *Math.asin()*
- *Math.atan()*
- *Math.atan2()*
- *Math.cos()*
- *Math.max()*
- *Math.min()*
- *Math.random()*
- *Math.sin()*
- *Math.sqrt()*
- *Math.tan()*
## Currently translated JavaScript native classes and their methods and operators
- *Array*
  - *length*
  - *toString()*
  - *push()*
  - *pop()*
  - *concat()*
  - *join()*
  - *reverse()*
  - *shift()*
  - *slice()*
  - *sort()* - uses the quicksort algorithm
  - *splice()*
  - *unshift()*
  - *indexOf()*
  - *lastIndexOf()*
  - *every()*
  - *some()*
  - *forEach()*
  - *reduce()*
- *Number*
  - *toString()* - NOTE: The base conversion not yet supported
  - *valueOf()* - returns either python float or python int 
  - *toFixed()*
- *String*
  - *charAt()*
  - *charCodeAt()* - NOTE: Returns the ASCII code, not unicode
  - *concat()*
  - *indexOf()*
  - *lastindexOf()*
  - *replace()*
  - *slice()*
  - *split()*
  - *substring()*
  - *toLowerCase()*
  - *toUpperCase()*
  - *trim()*
  - *valueOf()* - returns the python string
- *Error*
## Currently translated Node.js modules with the functions supported
  - *fs*
    - *readFileSync()*
## Usage example 
**node . ./myFile.js ./myFile.py**
