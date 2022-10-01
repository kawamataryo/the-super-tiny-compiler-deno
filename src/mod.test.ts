import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { compiler } from "./mod.ts";

Deno.test("compiler", () => {
  assertEquals(compiler("(add 2 2)"), "add(2, 2);");
  assertEquals(compiler("(subtract 4 2)"), "subtract(4, 2);");
  assertEquals(compiler("(add 2 (subtract 4 2))"), "add(2, subtract(4, 2));");
  assertEquals(
    compiler(`(add 2 (subtract 4 2))
(full_name "John" "Doe")`),
    `add(2, subtract(4, 2));
full_name("John", "Doe");`,
  );
});
