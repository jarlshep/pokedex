// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState, State } from "./state.js";

async function main() {
  const state: State = initState(1000 * 60 * 5); // cache interval of 5 mins
  await startREPL(state);
}

main();