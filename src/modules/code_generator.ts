import { NODE_TYPE } from "../constants.ts";
import { NewNode } from "../types.ts";

export const codeGenerator = (node: NewNode): string => {
  switch (node.type) {
    case NODE_TYPE.PROGRAM:
      return node.body.map(codeGenerator).join("\n");

    case NODE_TYPE.EXPRESSION_STATEMENT:
      return codeGenerator(node.expression) + ";";

    case NODE_TYPE.CALL_EXPRESSION:
      return (
        codeGenerator(node.callee) + "(" +
        node.arguments.map(codeGenerator).join(", ") + ")"
      );

    case NODE_TYPE.IDENTIFIER:
      return node.name;

    case NODE_TYPE.NUMBER_LITERAL:
      return node.value;

    case NODE_TYPE.STRING_LITERAL:
      return '"' + node.value + '"';

    default:
      throw new TypeError("unknown node type: ", node);
  }
};
