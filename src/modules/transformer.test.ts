import { transformer } from "./transformer.ts";
import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";

Deno.test("tokenizer", () => {
  const ast = {
    type: "Program",
    body: [{
      type: "CallExpression",
      name: "add",
      params: [{
        type: "NumberLiteral",
        value: "2",
      }, {
        type: "CallExpression",
        name: "subtract",
        params: [{
          type: "NumberLiteral",
          value: "4",
        }, {
          type: "NumberLiteral",
          value: "2",
        }],
      }, {
        type: "NumberLiteral",
        value: "2",
      }],
    }],
  };

  assertEquals(transformer(ast), {
    type: "Program",
    body: [{
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "add",
        },
        arguments: [{
          type: "NumberLiteral",
          value: "2",
        }, {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "subtract",
          },
          arguments: [{
            type: "NumberLiteral",
            value: "4",
          }, {
            type: "NumberLiteral",
            value: "2",
          }],
        }, {
          type: "NumberLiteral",
          value: "2",
        }],
      },
    }],
  });
});
