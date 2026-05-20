import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0 || args.length >= 2) {
        throw new Error("Which Pokemon do you want to inspect?");
    }
    const pokeName = args[0];
    const pokemon = await state.pokeAPI.fetchPokemon(pokeName);
    
    if (!state.caughtPokemon[pokemon.name]) {
        throw new Error("You haven't caught that pokemon.")
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const item of pokemon.stats) {
        console.log(`  -${item.stat.name}: ${item.base_stat}`);
    }
    console.log(`Types:`);
    for (const item of pokemon.types) {
        console.log(`  -${item.type.name}`);
    }
}