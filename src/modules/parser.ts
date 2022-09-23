import { CallExpression, Node, Program } from "./../types.ts";
import { NODE_TYPE, TOKEN } from "../constants.ts";
import { Token } from "../types.ts";

export const parser = (tokens: Token[]): Program => {
  let current = 0;

  const getToken = () => tokens[current];
  const consumeToken = () => tokens[current++];

  const walk = (): Node => {
    let token = getToken();

    if (token.type === TOKEN.NUMBER) {
      consumeToken();
      return {
        type: NODE_TYPE.NUMBER_LITERAL,
        value: token.value,
      };
    }

    if (token.type === TOKEN.STRING) {
      consumeToken();
      return {
        type: NODE_TYPE.STRING_LITERAL,
        value: token.value,
      };
    }

    if (token.type === TOKEN.PAREN && token.value === "(") {
      consumeToken();

      const node: CallExpression = {
        type: NODE_TYPE.CALL_EXPRESSION,
        name: getToken().value,
        params: [],
      };

      consumeToken();
      token = getToken();

      while (
        token.type !== TOKEN.PAREN ||
        (token.type === TOKEN.PAREN && token.value !== ")")
      ) {
        node.params.push(walk());
        token = getToken();
      }

      consumeToken();
      return node;
    }

    throw new TypeError(token.type);
  };

  const ast: Program = {
    type: NODE_TYPE.PROGRAM,
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};
