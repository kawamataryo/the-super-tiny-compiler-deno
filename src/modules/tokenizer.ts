import { TOKEN } from "../constants.ts";
import { Token } from "../types.ts";

export const tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  const getChar = () => input[current];
  const consumeChar = () => input[current++];

  while (current < input.length) {
    // consume white space
    const WHITESPACE = /(\s|\r\n|\n|\r)/;
    if (WHITESPACE.test(getChar())) {
      while (WHITESPACE.test(getChar())) {
        consumeChar();
      }
      continue;
    }

    // paren
    if (getChar() === "(" || getChar() === ")") {
      tokens.push({
        type: TOKEN.PAREN,
        value: getChar(),
      });
      current++;
      continue;
    }

    // number
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(getChar())) {
      let value = "";
      while (NUMBERS.test(getChar())) {
        value += consumeChar();
      }

      tokens.push({ type: TOKEN.NUMBER, value });
      continue;
    }

    // string
    const QUOTES = /["']/;
    if (QUOTES.test(getChar())) {
      const quote = consumeChar();
      let value = "";

      while (quote !== getChar()) {
        value += consumeChar();
      }
      consumeChar();

      tokens.push({ type: TOKEN.STRING, value });
      continue;
    }

    // letters
    const LETTERS = /[a-z_-]/i;
    if (LETTERS.test(getChar())) {
      let value = "";

      while (LETTERS.test(getChar())) {
        value += consumeChar();
      }

      tokens.push({ type: TOKEN.NAME, value });
      continue;
    }

    throw new TypeError("I dont know what this character is: " + getChar());
  }

  return tokens;
};
