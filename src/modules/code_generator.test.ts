import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { NewProgram } from "../types.ts";
import { codeGenerator } from "./code_generator.ts";

Deno.test("codeGenerator", () => {
  const ast: NewProgram = {
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
        }],
      },
    }, {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "full_name",
        },
        arguments: [
          {
            type: "StringLiteral",
            value: "John",
          },
          {
            type: "StringLiteral",
            value: "Doe",
          },
        ],
      },
    }],
  };

  assertEquals(
    codeGenerator(ast),
    `add(2, subtract(4, 2));
full_name("John", "Doe");`,
  );
});
