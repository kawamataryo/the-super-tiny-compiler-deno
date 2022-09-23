import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { tokenizer } from "./tokenizer.ts";

Deno.test("tokenizer", () => {
  const code = `
    (add 2 (subtract 4 2))
    (fullName 'hoge' 'foo')
  `;

  assertEquals(tokenizer(code), [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "paren", value: "(" },
    { type: "name", value: "subtract" },
    { type: "number", value: "4" },
    { type: "number", value: "2" },
    { type: "paren", value: ")" },
    { type: "paren", value: ")" },
    { type: "paren", value: "(" },
    { type: "name", value: "fullName" },
    { type: "string", value: "hoge" },
    { type: "string", value: "foo" },
    { type: "paren", value: ")" },
  ]);
});
