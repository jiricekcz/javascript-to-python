# A javascript to python translator 
My attempt to create a translator from simple Javascript to python

Note: This only translates syntax features, not all native functions will be available.
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
## Currently translated native JavaScript functions
- *console.log()* to *print()*
- *Math.round()* to *math.round()* with the import of *math*
- *Math.ceil()* to *math.ceil()* with the import of *math*
- *Math.floor()* to *math.floor()* with the import of *math*
- *Math.E* to *math.exp(1)* with the import of *math*
- *Math.exp()* to *math.exp()* with the import of *math*
- *Math.log()* to *math.log()* with the import of *math*
## Currently custom defined JavaScript native functions
- *Math.pow()*
## Currently translated JavaScript native classes and their methods
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
## Usage example 
**node . ./myFile.js ./myFile.py**
