export const TOKEN = {
  NUMBER: "number",
  STRING: "string",
  NAME: "name",
  PAREN: "paren",
} as const;

export const NODE_TYPE = {
  PROGRAM: "Program",
  CALL_EXPRESSION: "CallExpression",
  NUMBER_LITERAL: "NumberLiteral",
  STRING_LITERAL: "StringLiteral",
  EXPRESSION_STATEMENT: "ExpressionStatement",
  IDENTIFIER: "Identifier",
} as const;
