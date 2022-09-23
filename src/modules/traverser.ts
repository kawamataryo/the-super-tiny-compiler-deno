import { NODE_TYPE } from "../constants.ts";
import { Node, Program, Visitor } from "../types.ts";

export const traverser = (ast: Program, visitor: Visitor) => {
  const traverseArray = (array: Node[], parent: Node) => {
    array.forEach((child) => traverseNode(child, parent));
  };

  const traverseNode = (node: Node, parent?: Node) => {
    const methods = visitor[node.type];

    if (methods && methods.enter) {
      // @ts-ignore: Type errors I can't fix
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NODE_TYPE.PROGRAM:
        traverseArray(node.body, node);
        break;
      case NODE_TYPE.CALL_EXPRESSION:
        traverseArray(node.params, node);
        break;
      case NODE_TYPE.NUMBER_LITERAL:
      case NODE_TYPE.STRING_LITERAL:
        break;

      default:
        throw new TypeError("unknown node type", node);
    }

    if (methods && methods.exit) {
      // @ts-ignore: Type errors I can't fix
      methods.exit(node, parent);
    }
  };

  traverseNode(ast);
};
