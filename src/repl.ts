import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const trim_1: string = input.trim();
    const lowered: string = trim_1.toLowerCase();
    const arr: string[] = lowered.split(" ");
    let newArr: string[] = [];
    for (let i: number = 0; i < arr.length; i++) {
        if (arr[i] !== "") {
            newArr.push(arr[i].trim());
        }
    }
    return newArr;
}

export async function startREPL(state: State): Promise<void> {

    state.readline.prompt();

    state.readline.on("line", async (line) => {

        const input: string[] = cleanInput(line);
        if (input.length === 0) {
            state.readline.prompt();
            return;
        }
 
        const cmd = state.commands[input[0]];
        const args = input.slice(1);

        if (!cmd) {
            console.log(`Unknown command: "${input[0]}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }
        
        try {    
            await cmd.callback(state, ...args);
        } catch (e) {
            console.log((e as Error).message);
        }

        state.readline.prompt();
    });
}