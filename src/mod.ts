import { codeGenerator } from "./modules/code_generator.ts";
import { parser } from "./modules/parser.ts";
import { tokenizer } from "./modules/tokenizer.ts";
import { transformer } from "./modules/transformer.ts";

export const compiler = (code: string) => {
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);
  return output;
};
