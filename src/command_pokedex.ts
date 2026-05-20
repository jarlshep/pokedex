import { State } from "./state.js"

export async function commandPokedex(state: State, ...args: string[]): Promise<void> {
    if (Object.keys(state.caughtPokemon).length === 0) {
        console.log("You haven't caught any pokemon yet.");
    } else {
        console.log("Your Pokedex:");
        for (const item of Object.keys(state.caughtPokemon)) {
            console.log(` - ${item}`);
        }
    }
}