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
## Currently translated native javascript functions
- *console.log()* to *print()*
## Usage example 
**node ./src/translator/ ./myFile.js ./myFile.py**
