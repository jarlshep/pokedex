import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: " I love the world and you and  ...   everything ",
        expected: ["i", "love", "the", "world", "and", "you", "and", "...", "everything"],
    },
    {
        input: "The quick fox jumps...",
        expected: ["the", "quick", "fox", "jumps..."],
    },
    {
        input: "     go    home     ",
        expected: ["go", "home"],
    },
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual: string[] = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    })
});



