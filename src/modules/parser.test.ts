import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { TOKEN } from "../constants.ts";
import { parser } from "./parser.ts";

Deno.test("parser", () => {
  const tokens = [
    { type: TOKEN.PAREN, value: "(" } as const,
    { type: TOKEN.NAME, value: "add" } as const,
    { type: TOKEN.NUMBER, value: "2" } as const,
    { type: TOKEN.PAREN, value: "(" } as const,
    { type: TOKEN.NAME, value: "subtract" } as const,
    { type: TOKEN.NUMBER, value: "4" } as const,
    { type: TOKEN.NUMBER, value: "2" } as const,
    { type: TOKEN.PAREN, value: ")" } as const,
    { type: TOKEN.PAREN, value: ")" } as const,
    { type: TOKEN.PAREN, value: "(" } as const,
    { type: TOKEN.NAME, value: "fullName" } as const,
    { type: TOKEN.STRING, value: "hoge" } as const,
    { type: TOKEN.STRING, value: "foo" } as const,
    { type: TOKEN.PAREN, value: ")" } as const,
  ];

  assertEquals(parser(tokens), {
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
      }],
    }, {
      type: "CallExpression",
      name: "fullName",
      params: [
        {
          type: "StringLiteral",
          value: "hoge",
        },
        {
          type: "StringLiteral",
          value: "foo",
        },
      ],
    }],
  });
});
